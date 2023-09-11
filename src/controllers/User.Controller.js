import { userRegisterValidator } from '../validators/User.Validator.js';
import UserModel from '../models/User.Model.js';
import { handleValidationError, handleUserExists, handleUserNotFound, tryCatchWrapper } from '../factory/Factory.js';


export const createUser = async (req, res) => {
    const handler = async (req, res) => {
        const { error } = userRegisterValidator(req.body);
        if (error) {
            handleValidationError(error, res);
            return;
        }

        const { fullName, email, userName, password, phoneNo, course, yearOfStudy, techStack, isDisabled, isUser } = req.body;

        const existingUser = await UserModel.findOne({ $or: [{ userName: userName }, { email: email }] });

        if (existingUser) {
            handleUserExists(res);
            return;
        }

        const user = await UserModel.create({ fullName, email, userName, password, phoneNo, course, yearOfStudy, techStack, isDisabled, isUser });

        res.status(201).json(req.body);
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
        user ? res.status(200).json(user) : handleUserNotFound(res);
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
