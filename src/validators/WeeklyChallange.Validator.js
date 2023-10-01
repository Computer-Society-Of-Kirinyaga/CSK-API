import Joi from "joi";

export const responseValidator = (response) => {
    const responseSchema = Joi.object({
        response: Joi.string().min(3).max(30).required(),
        respondedBy: Joi.string().required(),
        comment: Joi.string().min(3).required(),
        rateResponse: Joi.number().integer().required(),

    });
    return responseSchema.validate(response, { abortEarly: false });
};

export const weeklyChallengeValidator = (response) => {
    const weeklyChallengeSchema = Joi.object({
        topic: Joi.string().required(),
        string: Joi.string().required(),
        uploadedBy: Joi.string().required(),
        techStack: Joi.string().required(),
    });
    return weeklyChallengeSchema.validate(response);
};

