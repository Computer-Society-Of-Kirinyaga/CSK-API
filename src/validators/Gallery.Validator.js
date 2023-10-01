import Joi from "joi";

export const galleryUploadValidator = (gallery) => {
    const galleryUploadValidationSchema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        imagesURL: Joi.array().items(Joi.string()),
        uploadedBy: Joi.string().required(),
    });
    return galleryUploadValidationSchema.validate(gallery);
};
