import express from "express";
import { initializeApp } from "firebase/app";
import config from "../config/Firebase.Config.js";
import multer from "multer";
import cryptoRandomString from "crypto-random-string";
import {
  deleteObject,
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const randomString = cryptoRandomString({ length: 10, type: "url-safe" }); // Generate a random string to ensure unique file names
const router = express.Router();
initializeApp(config.firebaseConfig); // Initialize a firebase application
const storage = getStorage(); // Initialize Cloud Storage and get a reference to the service
const upload = multer({ storage: multer.memoryStorage() }); // Setting up multer as a middleware to grab photo uploads

//upload one file and return an object of viewURL, name,msg
router.post("/", upload.single("filename"), async (req, res) => {
  try {
    const dateTime = giveCurrentDateTime();
    const file = req.file;
    const storageRef = ref(
      storage,
      `eventFiles/${file.originalname}_${randomString}_${dateTime}`
    );
    const metadata = { contentType: file.mimetype }; // Create file metadata including the content type
    const snapshot = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata
    ); // Upload the file in the bucket storage
    const viewURL = await getDownloadURL(snapshot.ref); // Grab the public URL
    return res.status(200).send({
      message: "eventFile uploaded to Firebase Storage",
      viewURL: viewURL,
      name: file.originalname,
    });
  } catch (error) {
    return res.status(500).send("Error uploading file:", error);
  }
});

//upload multiple files[5] and return an object with array of viewURLs[{name,viewURL}] & msg
router.post("/many", upload.array("filename", 5), async (req, res) => {
  try {
    const dateTime = giveCurrentDateTime();
    const uploadPromises = [];
    const viewURLs = [];

    req.files &&
      req.files.forEach((file) => {
        // append the file extension to the original file name
        let newFileName = file.originalname;
        if (file.originalname.indexOf(".") !== -1) {
          const fileExtension = file.originalname.split(".").pop();
          newFileName = file.originalname.replace(
            `.${fileExtension}`,
            `_${randomString}_${dateTime}.${fileExtension}`
          );
        } else {
          newFileName = `${file.originalname}_${randomString}_${dateTime}`;
        }
        const storageRef = ref(storage, `eventFiles/${newFileName}`);
        const metadata = { contentType: file.mimetype }; // Create file metadata including the content type
        const uploadPromise = uploadBytesResumable(
          storageRef,
          file.buffer,
          metadata
        ) // Upload the file in the bucket storage
          .then(async (snapshot) => {
            const viewURL = await getDownloadURL(snapshot.ref); // Grab the public URL
            viewURLs.push({ name: newFileName, viewURL: viewURL });
            return viewURL;
          })
          .catch((error) => {
            return res.status(500).send("Error uploading file:", error);
          });
        uploadPromises.push(uploadPromise);
      });
    await Promise.all(uploadPromises);
    return res.status(200).send({
      message: "eventFiles uploaded to Firebase Storage",
      viewURLs: viewURLs,
    });
  } catch (error) {
    return res.status(500).send("Error uploading file:", error);
  }
});
// delete file
router.delete("/:name", async (req, res) => {
  if (
    req.params.name == '[""]' ||
    !req.params.name ||
    req.params.name == null ||
    req.params.name == undefined
  )
    return res.status(400).send("No file names provided url params");
  const { name } = req.params;
  if (!name) return res.status(400).send("No file name provided");
  const storageRef = ref(storage, `eventFiles/${name}`);
  deleteObject(storageRef)
    .then(() => {
      return res.status(200).send({
        message: `eventFile "${name}" successfully deleted.`,
        name: name,
      });
    })
    .catch((error) => {
      if (error.code === "storage/object-not-found") {
        return res.status(404).send(`eventFile "${name}" does not exist.`);
      } else
        return res
          .status(500)
          .send(`Error deleting "${name}" from Firebase Storage`);
    });
});

// delete multiple files
router.delete("/many/:filesArray", async (req, res) => {
  if (
    req.params.filesArray == '[""]' ||
    !req.params.filesArray ||
    req.params.filesArray == null ||
    req.params.filesArray == undefined
  )
    return res.status(400).send("No file names provided in the url params");
  let names = JSON.parse(req.params.filesArray);
  const deletePromises = [];
  names.forEach((name) => {
    const storageRef = ref(storage, `eventFiles/${name}`);
    const deletePromise = deleteObject(storageRef)
      .then(() => {
        return name;
      })
      .catch((error) => {
        if (error.code === "storage/object-not-found") {
          return name;
        } else
          return res
            .status(500)
            .send("Error deleting file from Firebase Storage" + error);
      });

    deletePromises.push(deletePromise);
  });
  const deletedFiles = await Promise.all(deletePromises);
  return res.status(200).send({
    message: "eventFiles deleted from Firebase Storage",
    files: deletedFiles,
  });
});

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
};

export default router;
