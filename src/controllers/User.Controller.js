import { userRegisterValidator } from '../validators/User.Validator.js';
import UserModel from '../models/User.Model.js';
export const createUser = async (req, res) => {
    // Validate request body against the userValidationSchema
    const { error } = userRegisterValidator(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    } else {
        try {
            const { fullName, email, userName, password, phoneNo, course, yearOfStudy, techStack, isDisabled, isUser } = req.body;
            // Check if user exists
            const existingUser = await UserModel.findOne({
                $or: [{ userName: userName }, { email: email }],
            });
            if (existingUser) {
                res.status(401).json({ error: 'User already exists choose a unique username or email' });
            } else {
                // Create the user if validation passes
                const user = await UserModel.create({ fullName, email, userName, password, phoneNo, course, yearOfStudy, techStack, isDisabled, isUser });
                res.status(201).json(req.body);
            }
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while creating the user' + error });
        }
    }
}
export const getUsers = async (req, res) => {
    try {
        const usersResponse = await UserModel.find();
        //check if users exist       
        usersResponse.length > 0 ? res.status(200).json(usersResponse) : res.status(404).json({ message: 'No users found' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id);
        user ? res.status(200).json(user) : res.status(404).json({ message: 'User not found' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, userName, email, password, course, yearOfStudy, techStack } = req.body;
        const user = await UserModel.findById(id);
        !user && res.status(404).json({ message: "User not found" });

        // [PATCH] update only the available user properties
        email ? user.email = email : user.email = user.email;
        fullName ? user.fullName = fullName : user.fullName = user.fullName;
        userName ? user.userName = userName : user.userName = user.userName;
        password ? user.password = password : user.password = user.password;
        course ? user.course = course : user.course = user.course;
        yearOfStudy ? user.yearOfStudy = yearOfStudy : user.yearOfStudy = user.yearOfStudy;
        techStack ? user.techStack = techStack : user.techStack = user.techStack;

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findByIdAndDelete(id);
        user ? res.status(200).json({ message: "User deleted successfully" }) : res.status(404).json({ message: "User not found" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}