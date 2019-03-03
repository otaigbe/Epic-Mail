import Joi from 'joi';

const schemas = {};

schemas.userSchema = Joi.object({
  username: Joi.string().min(5).required(),
  firstName: Joi.string().min(5).required(),
  lastName: Joi.string().min(5).required(),
  password: Joi.string().min(5).required(),
  alternateEmail: Joi.string().min(5).required(),
});

schemas.signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

schemas.message = Joi.object({
  parentMessageId: Joi.number(),
  subject: Joi.string().required(),
  message: Joi.string().required(),
  to: Joi.string(),
  cc: Joi.string(),
  from: Joi.string(),
});
export default schemas;
