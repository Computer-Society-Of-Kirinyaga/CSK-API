import Joi from 'joi';

export const libraryRegisterValidator = (library) => {
    const libraryValidationSchema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        tags: Joi.array().items(Joi.string()),
        fileURL: Joi.array().items({
            name: Joi.string().required(),
            type: Joi.string().required(),
            downloadURL: Joi.string().required(),
        }),
        uploadedBy: Joi.string().required(),
    });
    return libraryValidationSchema.validate(library);
};


