import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    bannerURL: {
      type: [Object],
      trim: true,
      required: true,
    },
    authorName: {
      type: String,
      trim: true,
      required: true,
    },
    categories: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const blogModel = mongoose.model("Library", blogSchema);

export default blogModel;
