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
  // headers: Joi.object().keys({
  //   Subject: Joi.string(),
  //   To: Joi.string(),
  //   From: Joi.string(),
  //   Received: Joi.string(),
  //   'Return-path': Joi.string(),
  // }),
  // plain: Joi.string(),
  // html: Joi.string(),
  // reply_plain: Joi.string(),
  // envelope: Joi.object().keys({
  //   to: Joi.string(),
  //   // recipients: ,
  //   from: Joi.string(),
  //   helo_domain: Joi.string(),
  //   remote_ip: Joi.string(),
  //   spf: Joi.string(),
  //   tls: Joi.string(),
  // }),
});
export default schemas;
