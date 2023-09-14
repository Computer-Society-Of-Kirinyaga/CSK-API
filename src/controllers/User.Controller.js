import bcrypt from 'bcrypt';
import cryptoRandomString from 'crypto-random-string';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../helperFunctions/HelperFunctions.js';
import { userRegisterValidator, userResetValidator } from '../validators/User.Validator.js';
import UserModel from '../models/User.Model.js';
import { handleValidationError, handleUserExists, handleUserNotFound, tryCatchWrapper, handleWrongCredentials, handleInvalidUser } from '../factory/Factory.js';


export const createUser = async (req, res) => {
    const handler = async (req, res) => {
        const { error } = userRegisterValidator(req.body);
        if (error) {
            handleValidationError(error, res);
            return;
        }

        const { fullName, email, userName, password, phoneNo, course, yearOfStudy, techStack } = req.body;

        const existingUser = await UserModel.findOne({ $or: [{ userName: userName }, { email: email }] });

        if (existingUser) {
            handleUserExists(res);
            return;
        }

        if (await UserModel.create({ fullName, email, userName, password, phoneNo, course, yearOfStudy, techStack, userType: 'user' })) {
            res.status(201).json(req.body);
        }

    };

    tryCatchWrapper(handler, req, res);
};

export const getUsers = async (req, res) => {
    const handler = async (req, res) => {
        const usersResponse = await UserModel.find();
        usersResponse.length > 0 ? res.status(200).json(usersResponse) : res.status(404).json({ message: 'No users found' });
    };
    tryCatchWrapper(handler, req, res);
};

export const getUser = async (req, res) => {
    const handler = async (req, res) => {
        const { id } = req.params;
        const user = await UserModel.findById(id);
        if (condition) {
            const { password, ...userWithoutPassword } = user._doc;
            res.status(200).json(userWithoutPassword)
        } else handleUserNotFound(res);
    };
    tryCatchWrapper(handler, req, res);
};

export const updateUser = async (req, res) => {
    const handler = async (req, res) => {
        const { id } = req.params;
        const { fullName, userName, email, password, course, yearOfStudy, techStack } = req.body;
        const user = await UserModel.findById(id);
        if (!user) {
            handleUserNotFound(res);
            return;
        }
        // Update only the available user properties
        email && (user.email = email);
        fullName && (user.fullName = fullName);
        userName && (user.userName = userName);
        password && (user.password = password);
        course && (user.course = course);
        yearOfStudy && (user.yearOfStudy = yearOfStudy);
        techStack && (user.techStack = techStack);
        await user.save();
        res.status(200).json(user);
    };
    tryCatchWrapper(handler, req, res);
};

export const deleteUser = async (req, res) => {
    const handler = async (req, res) => {
        const { id } = req.params;
        const user = await UserModel.findByIdAndDelete(id);
        user ? res.status(200).json({ message: "User deleted successfully" }) : handleUserNotFound(res);
    };

    tryCatchWrapper(handler, req, res);
};

export const loginUser = async (req, res) => {
    const handler = async (req, res) => {
        const { userName, password } = req.body;
        const user = await UserModel.findOne({ userName: userName, password: password });
        if (user) {
            if (user.userType === 'disabledUser') {
                handleInvalidUser(res);
                return;
            }
            const token = `JWT ${jwt.sign({ userName: userName, email: user.email, userType: user.userType, id: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' })}`;
            // return all user details except password
            const { password, ...userWithoutPassword } = user._doc;
            res.status(200).json({ token: token, user: userWithoutPassword });
        } else handleWrongCredentials(res);
    };

    tryCatchWrapper(handler, req, res);
}

export const resetUserLoginCredentials = async (req, res) => {
    // match the above phoneNo and email with the one in the database then send an email to the user email with the password. if no match, send an error message
    const { error } = userResetValidator(req.body);
    if (error) {
        handleValidationError(error, res);
        return;
    }
    const { phoneNo, email } = req.body;
    const user = await UserModel.findOne({ phoneNo: phoneNo, email: email });
    if (user) {
        const randomPassword = cryptoRandomString({ length: 5, type: 'alphanumeric' }); // Generate random password
        const hashedPassword = bcrypt.hashSync(randomPassword, bcrypt.genSaltSync(10)); // Hash random password
        user.password = hashedPassword;
        await user.save();  // Update  user with new hashed password   
        const response = await sendEmail(email, 'Password Reset', `Your password is  ${randomPassword}, please keep it safe and use it to login.`); // Send email to user with new un-hashedPassword
        if (response) res.status(200).json({ message: response });
    } else handleUserNotFound(res);
}

