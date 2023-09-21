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

//upload one file to firebase storage and return a link to view the file
router.post("/", upload.single("filename"), async (req, res) => {
    try {
        const dateTime = giveCurrentDateTime();
        const storageRef = ref(
            storage,
            `libraryFiles/${req.file.originalname}_${randomString}_${dateTime}`
        );
        const metadata = { contentType: req.file.mimetype };
        const snapshot = await uploadBytesResumable(
            storageRef,
            file.buffer,
            metadata
        ); // Upload the file in the bucket storage
        const viewURL = await getDownloadURL(snapshot.ref); // Grab the public URL
        return res.status(200).send({
            message: "libraryFile uploaded to Firebase Storage",
            viewURL: viewURL,
            name: file.originalname,
        });
    } catch (error) {
        return res.status(500).send("Error uploading libraryFile:", error);
    }
});

//upload multiple files[5]
router.post("/many", upload.array("filename", 5), async (req, res) => {
    res.status(200).send("testing");
    try {
        const dateTime = giveCurrentDateTime();
        const uploadPromises = [];
        req.files.forEach((file) => {
            // Loop through each uploaded file and upload it to Firebase Storage
            const randomString =
                Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15);
            const storageRef = ref(
                storage,
                `libraryFiles/${file.originalname}_${randomString}_${dateTime}`
            );
            const metadata = { contentType: file.mimetype }; // Create file metadata including the content type
            const uploadPromise = uploadBytesResumable(
                storageRef,
                file.buffer,
                metadata
            ).then(async (snapshot) => {
                const downloadURL = await getDownloadURL(snapshot.ref);
                return {
                    name: file.originalname,
                    downloadURL: downloadURL,
                };
            });
            uploadPromises.push(uploadPromise);
        });
        const uploadedFiles = await Promise.all(uploadPromises); // Wait for all file uploads to complete
        return res.status(200).send({
            message: "libraryFiles uploaded to Firebase Storage",
            files: uploadedFiles,
        });
    } catch (error) {
        return res.status(500).send("Error uploading libraryFile:", error);
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
    const storageRef = ref(storage, `libraryFiles/${name}`);

    deleteObject(storageRef)
        .then(() => {
            return res.status(200).send({
                message: "libraryFile deleted from Firebase Storage",
                name: name,
            });
        })
        .catch((error) => {
            if (error.code === "storage/object-not-found") {
                return res.status(404).send(`libraryFile "${name}" does not exist.`);
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
        return res.status(400).send("No file names provided url params");
    let names = JSON.parse(req.params.filesArray);
    const deletePromises = [];
    names.forEach((name) => {
        const storageRef = ref(storage, `libraryFiles/${name}`);
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
                        .send(`Error deleting "${name}" from Firebase Storage`);
            });
        deletePromises.push(deletePromise);
    });
    const deletedFiles = await Promise.all(deletePromises);
    return res.status(200).send({
        message: "libraryFiles deleted from Firebase Storage",
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
