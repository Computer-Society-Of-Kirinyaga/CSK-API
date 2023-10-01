import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imagesURL: {
      type: [String],
      trim: true,
      required: true,
    },
    uploadedBy: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

const GalleryModel = mongoose.model("Gallery", gallerySchema);

export default GalleryModel;
