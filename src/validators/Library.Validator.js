import Joi from 'joi';

export const libraryRegisterValidator = (library) => {
    const libraryValidationSchema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        tags: Joi.array().items(Joi.string()),
        fileURL: Joi.string(),
        uploadedBy: Joi.string().required(),
    });
    return libraryValidationSchema.validate(library);
};


