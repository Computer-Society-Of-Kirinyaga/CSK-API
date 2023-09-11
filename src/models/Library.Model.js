import mongoose from 'mongoose';

const librarySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        description: {
            type: String,
            trim: true
        },
        tags: {
            type: [String],
            trim: true,
        },
        file: {
            type: String,
            trim: true
        },
        isDisabled: {
            type: Boolean,
            default: false
        },
    }, { timestamps: true }
);

const LibraryModel = mongoose.model('Library', librarySchema);

export default LibraryModel;
