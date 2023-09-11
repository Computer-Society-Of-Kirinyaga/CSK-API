import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        techStack: {
            type: [String],
            required: true,
            trim: true,
        },
        userName: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        password: {
            type: String,
            trim: true,
            required: true
        },
        phoneNo: {
            type: String,
            trim: true,
            required: true
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        isDisabled: {
            type: Boolean,
            default: false
        },
        isSuperAdmin: {
            type: Boolean,
            default: false
        },
        isNormalAdmin: {
            type: Boolean,
            default: true
        },
    }, { timestamps: true }
);

const AdminModel = mongoose.model("Admin", adminSchema);

export default AdminModel;
