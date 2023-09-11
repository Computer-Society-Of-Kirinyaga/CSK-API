import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        userName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        phoneNo: {
            type: String,
            required: true,
            trim: true,
        },
        course: {
            type: String,
            required: true,
            trim: true,
        },
        yearOfStudy: {
            type: Number,
            required: true,
            trim: true,
        },
        techStack: {
            type: [String],
            required: true,
            trim: true,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        isUser: {
            type: Boolean,
            default: true,
        },
    }, { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
