import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import UserModel from "../models/User.Model.js";
import { userRegisterValidator } from "../validators/User.Validator.js";
import rawUserData from "./JsonFiles/user_data.json" assert { type: "json" };

const userDataFilePath = "./JsonFiles/user_data.json";
// Check if the file exists

export const ingestUserData = async (req, res) => {
  //   if ()) {
  //     // File exists, so import it
  //     let userData = rawUserData;
  //     console.log("File exists and has been imported.");
  //   } else {
  //     console.error("File does not exist.");
  //     // Handle the case where the file doesn't exist, e.g., provide a default dataset or return an error response.
  //   }

  if (fs.existsSync(userDataFilePath)) {
    userData = rawUserData;
    console.log("File exists and has been imported.");
    // try {
    //   // Create an array to store the user data to be inserted
    //   const usersToInsert = [];
    //   if (!userData) {
    //     return res.status(400).json({
    //       success: false,
    //       message: "user_data.json is not ready : No user data was found.",
    //     });
    //   }
    //   // Check if each user with a unique email and username already exists
    //   for (const searchUserData of userData) {
    //     const existingUser = await UserModel.findOne({
    //       $or: [
    //         { email: searchUserData.email },
    //         { userName: searchUserData.userName },
    //       ],
    //     });

    //     if (!existingUser) {
    //       // Hash the password before adding the user to the list to be inserted
    //       const hashedPassword = bcrypt.hashSync(userData.password, 10);
    //       const userToAdd = { ...userData, password: hashedPassword };
    //       usersToInsert.push(userToAdd);
    //     }
    //   }

    //   // Insert user data into the database for new users
    //   const result = await UserModel.insertMany(usersToInsert);

    //   // Count the number of inserted and skipped records
    //   const insertedCount = result.length;
    //   const skippedCount = userData.length - insertedCount;

    //   // Return response
    //   if (insertedCount > 0) {
    //     let message = `Inserted ${insertedCount} user(s) into the database.`;
    //     if (skippedCount > 0) {
    //       message += ` Skipped ${skippedCount} user(s) with duplicate email or username.`;
    //     }

    //     return res.status(200).json({
    //       success: true,
    //       message,
    //     });
    //   } else {
    //     return res.status(200).json({
    //       success: true,
    //       message: "No modifications were made to the database.",
    //     });
    //   }
    // } catch (error) {
    //   return res.status(500).json({
    //     success: false,
    //     message: error.message,
    //   });
    // }
  } else {
    return res.status(400).json({
      success: false,
      message: "user_data.json is not ready : No user data was found.",
    });
  }
};
