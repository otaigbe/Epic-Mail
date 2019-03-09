"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schemas = {};
schemas.userSchema = _joi.default.object({
  username: _joi.default.string().min(5).required(),
  firstName: _joi.default.string().min(5).required(),
  lastName: _joi.default.string().min(5).required(),
  password: _joi.default.string().min(5).required(),
  alternateEmail: _joi.default.string().min(5).required()
});
schemas.signinSchema = _joi.default.object({
  email: _joi.default.string().email().required(),
  password: _joi.default.string().required()
});
schemas.message = _joi.default.object({
  parentMessageId: _joi.default.number(),
  subject: _joi.default.string().required(),
  message: _joi.default.string().required(),
  to: _joi.default.string(),
  cc: _joi.default.string(),
  from: _joi.default.string() // headers: Joi.object().keys({
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
var _default = schemas;
exports.default = _default;