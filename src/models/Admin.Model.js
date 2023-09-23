import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
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
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    phoneNo: {
      type: String,
      trim: true,
      required: true,
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
    userType: {
      type: String,
      enum: ["admin", "superAdmin", "disabledUser"],
      default: "admin",
    },
    socialMedia: {
      LinkedIn: {
        type: String,
        trim: true,
      },
      Twitter: {
        type: String,
        trim: true,
      },
      Github: {
        type: String,
        trim: true,
      },
    },
  },
  { timestamps: true }
);

const AdminModel = mongoose.model("Admin", adminSchema);

export default AdminModel;
