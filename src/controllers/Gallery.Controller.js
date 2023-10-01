import {
  handleMissingParamsError,
  handleValidationError,
  handleSuccess,
  tryCatchWrapper,
} from "../factory/Factory.js";

export const createGallery = async (req, res) => {
  res.status(201).json("create");
};
export const getGalleries = async (req, res) => {
  res.status(201).json("get");
};
export const getGallery = async (req, res) => {
  res.status(201).json("get");
};
export const updateGallery = async (req, res) => {
  res.status(201).json("update");
};
export const deleteGallery = async (req, res) => {
  res.status(201).json("delete");
};
