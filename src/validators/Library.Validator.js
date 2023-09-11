import Joi from 'joi';

export const libraryRegisterValidator = (library) => {
    const libraryValidationSchema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        tags: Joi.array().items(Joi.string()),
        file: Joi.string(),
        isDisabled: Joi.boolean(),
    });
    return libraryValidationSchema.validate(library);
};


