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
  parentmessageid: Joi.number().integer(),
  subject: Joi.string().required(),
  message: Joi.string().required(),
  receiver: Joi.string().email().max(256),
  sender: Joi.string().email().max(256).required(),
});

schemas.group = Joi.object({
  groupname: Joi.string().alphanum().min(4).max(30).required(),
  creator: Joi.string().required(),
});

export default schemas;
