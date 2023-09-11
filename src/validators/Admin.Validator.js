import Joi from 'joi';

export const adminRegisterValidator = (admin) => {
    const adminValidationSchema = Joi.object({
        fullName: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        userName: Joi.string().min(3).max(30).required(),
        password: Joi.string().min(4).required(),
        confirmPassword: Joi.ref('password'),
        phoneNo: Joi.string().required(),
        isVerified: Joi.boolean(),
        isDisabled: Joi.boolean(),
        isSuperAdmin: Joi.boolean(),
        isNormalAdmin: Joi.boolean(),
        techStack: Joi.array().items(Joi.string()).required(),
    });
    return adminValidationSchema.validate(admin);
};

export const adminLoginValidator = (admin) => {
    const adminLoginValidationSchema = Joi.object({
        userName: Joi.string().required(),
        password: Joi.string().min(4).required(),
    });
    return adminLoginValidationSchema.validate(admin);
};

