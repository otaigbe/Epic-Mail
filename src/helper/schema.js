import Joi from 'joi';

const schemas = {};

schemas.userSchema = Joi.object({
  username: Joi.string().trim().min(2).required(),
  firstname: Joi.string().min(2).trim().required(),
  lastname: Joi.string().trim().min(2).required(),
  password: Joi.string().alphanum().min(4).trim()
    .max(50)
    .required(),
  alternateemail: Joi.string().email().min(5).trim()
    .required(),
});

schemas.signinSchema = Joi.object({
  email: Joi.string().email().regex(/epicmail\.com$/).min(13)
    .trim()
    .required(),
  password: Joi.string().alphanum().trim().min(4)
    .max(50)
    .required(),
});

schemas.message = Joi.object({
  parentmessageid: Joi.number().integer().max(1000000),
  subject: Joi.string().min(4).trim().required(),
  message: Joi.string().min(5).trim().required(),
  receiver: Joi.string().email().regex(/epicmail\.com$/).min(13)
    .trim(),
});


schemas.groupMessage = Joi.object({
  subject: Joi.string().min(4).trim().required(),
  message: Joi.string().min(4).trim().required(),
});

schemas.createGroup = Joi.object({
  groupname: Joi.string().trim().alphanum().min(4).max(30)
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
  useremail: Joi.string().email().regex(/epicmail\.com$/).max(256)
    .trim()
    .required(),
});

schemas.resetSchema = Joi.object({
  email: Joi.string().email().regex(/epicmail\.com$/).max(256)
    .trim()
    .required(),
});

schemas.messageId = Joi.object({
  messageId: Joi.number().positive().integer().required(),
});


schemas.draft = Joi.object({
  subject: Joi.string().min(4).trim().required(),
  message: Joi.string().min(5).trim().required(),
  receiver: Joi.string().email().regex(/epicmail\.com$/).min(13)
    .trim(),
});

schemas.groupId = Joi.object({
  groupId: Joi.number().positive().integer().required(),
});

schemas.deleteUserFromGroup = Joi.object({
  groupId: Joi.number().positive().integer().required(),
  userId: Joi.number().positive().integer().required(),
});
export default schemas;
