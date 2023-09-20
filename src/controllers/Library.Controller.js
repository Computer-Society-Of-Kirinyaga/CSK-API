import { libraryRegisterValidator } from "../validators/Library.Validator.js";
import LibraryModel from "../models/Library.Model.js";
import {
    handleMissingParamsError,
    handleValidationError,
    handleLibraryExists,
    handleLibraryNotFound,
    tryCatchWrapper,
} from "../factory/Factory.js";

export const createLibrary = async (req, res) => {
    const handler = async (req, res) => {
        const { error } = libraryRegisterValidator(req.body);
        if (error) {
            handleValidationError(error, res);
            return;
        }
        const { name, description, tags, fileURL, uploadedBy } = req.body;
        const existingEvent = await LibraryModel.findOne({
            name: name,
            uploadedBy: uploadedBy,
        });
        if (existingEvent) {
            handleLibraryExists(res);
            return;
        }
        const FileRes = await LibraryModel.create({
            name,
            description,
            tags,
            fileURL,
            uploadedBy,
        });
        res.status(201).json(FileRes);
    };
    tryCatchWrapper(handler, req, res);
};
export const getLibraries = async (req, res) => {
    const handler = async (req, res) => {
        const libraryFileResponse = await LibraryModel.find();
        libraryFileResponse.length > 0
            ? res.status(200).json(libraryFileResponse)
            : handleLibraryNotFound(res);
    };
    tryCatchWrapper(handler, req, res);
};
export const getLibrary = async (req, res) => {
    const handler = async (req, res) => {
        const { id } = req.params;
        if (!id) {
            handleMissingParamsError(res);
            return;
        }
        const libraryFileResponse = await LibraryModel.findById(id);
        libraryFileResponse
            ? res.status(200).json(libraryFileResponse)
            : handleLibraryNotFound(res);
    };

    tryCatchWrapper(handler, req, res);
};
export const updateLibrary = async (req, res) => {
    const handler = async (req, res) => {
        const { id } = req.params;
        if (!id) {
            handleMissingParamsError(res);
            return;
        }
        const { name, description, tags, fileURL, uploadedBy, isDisabled } =
            req.body;
        if (
            !name &&
            !description &&
            !tags &&
            !fileURL &&
            !uploadedBy &&
            !isDisabled
        ) {
            handleValidationError(
                { details: [{ message: "At least one property must be updated" }] },
                res
            );
            return;
        }
        const libraryFileResponse = await LibraryModel.findById(id);
        if (!libraryFileResponse) {
            handleLibraryNotFound(res);
            return;
        }
        // Update only the available libraryFileResponse properties
        name && (libraryFileResponse.name = name);
        description && (libraryFileResponse.description = description);
        tags && (libraryFileResponse.tags = tags);
        fileURL && (libraryFileResponse.fileURL = fileURL);
        uploadedBy && (libraryFileResponse.uploadedBy = uploadedBy);
        endTime && (libraryFileResponse.endTime = endTime);
        isDisabled && (libraryFileResponse.isDisabled = isDisabled);
        await libraryFileResponse.save();
        res.status(200).json(libraryFileResponse);
    };
    tryCatchWrapper(handler, req, res);
};
export const deleteLibrary = async (req, res) => {
    const handler = async (req, res) => {
        const { id } = req.params;
        if (!id) {
            handleMissingParamsError(res);
            return;
        }
        const libraryFileResponse = await LibraryModel.findByIdAndDelete(id);
        libraryFileResponse
            ? res
                .status(200)
                .json({ message: "libraryFileResponse deleted successfully" })
            : handleLibraryNotFound(res);
    };
    tryCatchWrapper(handler, req, res);
};
