import Joi from "joi";

export const adminRegisterValidator = (admin) => {
  const adminValidationSchema = Joi.object({
    fullName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    userName: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(4).required(),
    confirmPassword: Joi.ref("password"),
    course: Joi.string().min(3).max(30).required(),
    yearOfStudy: Joi.string().min(1).max(30).required(),
    phoneNo: Joi.string().required(),
    techStack: Joi.array().items(Joi.string()).required(),
    socialMedia: Joi.object({
      LinkedIn: Joi.string().trim(),
      Twitter: Joi.string().trim(),
      Github: Joi.string().trim(),
  }),
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
