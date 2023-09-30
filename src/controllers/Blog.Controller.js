import { handleMissingParamsError, handleValidationError, handleSuccess, tryCatchWrapper, } from "../factory/Factory.js";

export const createBlog = async (req, res) => {
    res.status(201).json("createBlog");
};
export const getBlogs = async (req, res) => {
    res.status(201).json("getBlog");
};
export const getBlog = async (req, res) => {
    res.status(201).json("getBlog");
};
export const updateBlog = async (req, res) => {
    res.status(201).json("updateBlog");
};
export const deleteBlog = async (req, res) => {
    res.status(201).json("deleteBlog");
};


