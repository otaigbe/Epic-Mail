import Joi from 'joi';

const schemas = {};

schemas.userSchema = Joi.object({
  username: Joi.string().min(2).required(),
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
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


schemas.groupMessage = Joi.object({
  subject: Joi.string().min(4).trim().required(),
  message: Joi.string().min(4).trim().required(),
});

schemas.createGroup = Joi.object({
  groupname: Joi.string().alphanum().min(4).max(30)
    .required(),
});

schemas.rename = Joi.object({
  groupname: Joi.string().alphanum().min(4).max(30)
    .trim()
    .required(),
});

schemas.newpass = Joi.object({
  password: Joi.string().alphanum().min(4).max(50)
    .required(),
  confirmpassword: Joi.string().alphanum().min(4).max(50)
    .required(),
});

schemas.addToGroup = Joi.object({
  useremail: Joi.string().email({ minDomainAtoms: 2 }).max(256).trim()
    .required(),
});

schemas.resetSchema = Joi.object({
  email: Joi.string().email({ minDomainAtoms: 2 }).max(256).trim()
    .required(),
});
export default schemas;
