import Joi from 'joi';

export const userRegisterValidator = (user) => {
    const userValidationSchema = Joi.object({
        fullName: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        userName: Joi.string().min(3).max(30).required(),
        password: Joi.string().min(4).required(),
        confirmPassword: Joi.ref('password'),
        phoneNo: Joi.string().required(),
        course: Joi.string().required(),
        yearOfStudy: Joi.number().integer().required(),
        techStack: Joi.array().items(Joi.string()).required(),
        isDisabled: Joi.boolean(),
        isUser: Joi.boolean(),
    });
    return userValidationSchema.validate(user);
};

export const userLoginValidator = (user) => {
    const userLoginValidationSchema = Joi.object({
        userName: Joi.string().required(),
        password: Joi.string().min(4).required(),
    });
    return userLoginValidationSchema.validate(user);
};

