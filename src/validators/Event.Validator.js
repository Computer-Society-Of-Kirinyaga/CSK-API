import Joi from 'joi';

export const eventRegisterValidator = (event) => {
    const eventValidationSchema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        location: Joi.string(),
        posterURL: Joi.string(),
        date: Joi.date(),
        startTime: Joi.string(),
        endTime: Joi.string(),
        eventType: Joi.string().valid('online', 'physical', 'hybrid').required(),
        isDisabled: Joi.boolean(),
    });
    return eventValidationSchema.validate(event);
};


