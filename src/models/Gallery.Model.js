import mongoose from "mongoose";

const librarySchema = new mongoose.Schema(
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
      type: [Strings],
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

const LibraryModel = mongoose.model("Library", librarySchema);

export default LibraryModel;
