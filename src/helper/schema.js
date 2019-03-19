import Joi from 'joi';

const schemas = {};

schemas.userSchema = Joi.object({
  username: Joi.string().min(5).required(),
  firstName: Joi.string().min(5).required(),
  lastName: Joi.string().min(5).required(),
  password: Joi.string().alphanum().min(4).max(50)
    .required(),
  alternateEmail: Joi.string().min(5).required(),
});

schemas.signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(4).max(50)
    .required(),
});

schemas.message = Joi.object({
  parentmessageid: Joi.number().integer().max(1000000),
  subject: Joi.string().min(4).trim().required(),
  message: Joi.string().min(5).trim().required(),
  receiver: Joi.string().email().max(256),
});

schemas.group = Joi.object({
  groupname: Joi.string().alphanum().min(4).max(30)
    .required(),
  creator: Joi.string().required(),
});

schemas.rename = Joi.object({
  groupname: Joi.string().alphanum().min(4).max(30)
    .trim()
    .required(),
});

schemas.addToGroup = Joi.object({
  userToBeAdded: Joi.string().email().max(256).required(),

});
export default schemas;
