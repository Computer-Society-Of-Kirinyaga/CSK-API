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
      type: String,
      required: true,
      trim: true,
    },
    techStack: {
      type: [String],
      required: true,
      trim: true,
    },
    userType: {
      type: String,
      enum: ["user", "disabledUser"],
      default: "user",
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

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
