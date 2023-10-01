import { galleryUploadValidator } from "../validators/Gallery.Validator.js";
import GalleryModel from "../models/Gallery.Model.js";
import { handleMissingParamsError, handleValidationError, handleSuccess, tryCatchWrapper, handleGalleryNameExists, handleGalleryNotFound, } from "../factory/Factory.js";

export const createGallery = async (req, res) => {
    const handler = async (req, res) => {
        const { error } = galleryUploadValidator(req.body);
        if (error) {
            handleValidationError(error, res);
            return;
        }
        const { name, description, imagesURL, uploadedBy } = req.body;
        if (!name && !description && !imagesURL && !uploadedBy
        ) {
            handleValidationError(
                { details: [{ message: "At least one property must be updated" }] },
                res
            );
            return;
        }
        const existingGalleryName = await GalleryModel.findOne({ name: name });
        if (existingGalleryName) {
            handleGalleryNameExists(res);
            return;
        }
        const gallery = await GalleryModel.create({ name, description, imagesURL, uploadedBy });
        res.status(201).json(req.body);
    };
    tryCatchWrapper(handler, req, res);
};

export const getGalleries = async (req, res) => {
    const handler = async (req, res) => {
        const gallerysResponse = await GalleryModel.find();
        gallerysResponse.length > 0
            ? res.status(200).json(gallerysResponse)
            : res.status(404).json({ message: "No Gallerys found" });
    };
    tryCatchWrapper(handler, req, res);
};

export const getGallery = async (req, res) => {
    const handler = async (req, res) => {
        const { id } = req.params;
        if (!id) {
            handleMissingParamsError(res);
            return;
        }
        const gallery = await GalleryModel.findById(id);
        gallery ? res.status(200).json(gallery) : handleGalleryNotFound(res);
    };

    tryCatchWrapper(handler, req, res);
};

export const updateGallery = async (req, res) => {
    const handler = async (req, res) => {
        const { id } = req.params;
        if (!id) {
            handleMissingParamsError(res);
            return;
        }
        const { name, description, imagesURL, uploadedBy } = req.body;
        if (!name && !description && !imagesURL && !uploadedBy) {
            handleValidationError(
                { details: [{ message: "At least one property must be updated" }] },
                res
            );
            return;
        }
        const gallery = await GalleryModel.findById(id);
        if (!gallery) {
            handleGalleryNotFound(res);
            return;
        }
        // Update only the available event properties
        name && (gallery.name = name);
        description && (gallery.description = description);
        imagesURL && (gallery.imagesURL = imagesURL);
        uploadedBy && (gallery.uploadedBy = uploadedBy);

        await gallery.save();
        res.status(200).json(gallery);
    };
    tryCatchWrapper(handler, req, res);
};

export const deleteGallery = async (req, res) => {
    const handler = async (req, res) => {
        const { id } = req.params;
        if (!id) {
            handleMissingParamsError(res);
            return;
        }
        const gallery = await GalleryModel.findByIdAndDelete(id);
        gallery
            ? res.status(200).json({ message: "Gallery deleted successfully" })
            : handleGalleryNotFound(res);
    };
    tryCatchWrapper(handler, req, res);
};




