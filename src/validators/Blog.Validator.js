import Joi from "joi";

export const blogRegisterValidator = (blog) => {
  const blogValidationSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    bannerURL: Joi.string().required(),
    description: Joi.string().required(),
    authorName: Joi.string().required(),
    categories: Joi.array().items(Joi.string()).required(),
    tags: Joi.array().items(Joi.string()).required(),
  });
  return blogValidationSchema.validate(blog);
};


