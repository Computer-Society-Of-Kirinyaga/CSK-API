import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cryptoRandomString from 'crypto-random-string';
import { sendEmail } from '../helperFunctions/HelperFunctions.js';
import { adminRegisterValidator, adminLoginValidator } from '../validators/Admin.Validator.js';
import { userResetValidator } from '../validators/User.Validator.js';
import AdminModel from '../models/Admin.Model.js';
import { handleValidationError, handleUserExists, handleUserNotFound, tryCatchWrapper, handleWrongCredentials, handleInvalidUser } from '../factory/Factory.js';


export const createAdmin = async (req, res) => {
    const handler = async (req, res) => {
        const { error } = adminRegisterValidator(req.body);
        if (error) {
            handleValidationError(error, res);
            return;
        }
        const { fullName, email, userName, password, phoneNo, course, yearOfStudy, techStack } = req.body;

        const existingUser = await AdminModel.findOne({ $or: [{ userName: userName }, { email: email }] });

        if (existingUser) {
            handleUserExists(res);
            return;
        }
        let hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        if (await AdminModel.create({ fullName, email, userName, password: hashedPassword, phoneNo, course, yearOfStudy, techStack, userType: 'admin' })) {
            res.status(201).json(req.body);
        }
    };

    tryCatchWrapper(handler, req, res);
};

export const getAdmins = async (req, res) => {
    const handler = async (req, res) => {
        const adminResponse = await AdminModel.find();
        adminResponse.length > 0 ? res.status(200).json(adminResponse) : res.status(404).json({ message: 'No users found' });
    };
    tryCatchWrapper(handler, req, res);
};

export const getAdmin = async (req, res) => {
    const handler = async (req, res) => {
        const { id } = req.params;
        const user = await AdminModel.findById(id);
        if (user) {
            const { password, ...userWithoutPassword } = user._doc;
            res.status(200).json(userWithoutPassword);
        } else handleUserNotFound(res);
    };
    tryCatchWrapper(handler, req, res);
};

export const updateAdmin = async (req, res) => {
    const handler = async (req, res) => {
        const { id } = req.params;
        const { fullName, userName, email, password, course, yearOfStudy, techStack } = req.body;
        const user = await AdminModel.findById(id);
        if (!user) {
            handleUserNotFound(res);
            return;
        }
        let hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        // Update only the available user properties
        email && (user.email = email);
        fullName && (user.fullName = fullName);
        userName && (user.userName = userName);
        password && (user.password = hashedPassword);
        course && (user.course = course);
        yearOfStudy && (user.yearOfStudy = yearOfStudy);
        techStack && (user.techStack = techStack);
        await user.save();
        const { password: userPassword, ...userWithoutPassword } = user._doc;
        res.status(200).json(userWithoutPassword);
    };

    tryCatchWrapper(handler, req, res);
};

export const deleteAdmin = async (req, res) => {
    const handler = async (req, res) => {
        const { id } = req.params;
        const user = await AdminModel.findByIdAndDelete(id);
        user ? res.status(200).json({ message: "User deleted successfully" }) : handleUserNotFound(res);
    };

    tryCatchWrapper(handler, req, res);
};

export const loginAdmin = async (req, res) => {
    const handler = async (req, res) => {
        const { userName, password } = req.body;
        const user = await AdminModel.findOne({ userName: userName });
        if (user) {
            if (user.userType === 'disabledUser') {
                handleInvalidUser(res);
                return;
            }
            if (user.userType === 'admin') {
                const isPasswordValid = bcrypt.compareSync(password, user.password);
                if (!isPasswordValid) {
                    handleWrongCredentials(res);
                    return;
                } else {
                    const token = `JWT ${jwt.sign({ userName: userName, email: user.email, userType: user.userType, id: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' })}`;
                    // return all user details except password
                    const { password, ...userWithoutPassword } = user._doc;
                    res.status(200).json({ token: token, user: userWithoutPassword });
                    return;
                }
            } else {
                handleWrongCredentials(res);
                return;
            }
        } else {
            handleWrongCredentials(res);
            return;
        }

        // else handleWrongCredentials(res);
    };

    tryCatchWrapper(handler, req, res);
}

export const resetAdminLoginCredentials = async (req, res) => {
    // match the above phoneNo and email with the one in the database then send an email to the user email with the password. if no match, send an error message
    const { error } = userResetValidator(req.body);
    if (error) {
        handleValidationError(error, res);
        return;
    }
    const { phoneNo, email } = req.body;
    const user = await AdminModel.findOne({ phoneNo: phoneNo, email: email });
    if (user) {
        const randomPassword = cryptoRandomString({ length: 5, type: 'alphanumeric' }); // Generate random password
        const hashedPassword = bcrypt.hashSync(randomPassword, bcrypt.genSaltSync(10)); // Hash random password
        user.password = hashedPassword;
        await user.save(); // Update  user with new hashed password  
        const response = await sendEmail(email, 'Password Reset', `Your password is  ${randomPassword}, please keep it safe and use it to login.`); // Send email to user with new un-hashedPassword
        if (response) res.status(200).json({ message: response });
    } else handleUserNotFound(res);
}

