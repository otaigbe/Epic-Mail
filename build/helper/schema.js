"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schemas = {};
schemas.userSchema = _joi.default.object({
  username: _joi.default.string().min(2).required(),
  firstname: _joi.default.string().min(2).required(),
  lastname: _joi.default.string().min(2).required(),
  password: _joi.default.string().alphanum().min(4).max(50).required(),
  alternateemail: _joi.default.string().min(5).required()
});
schemas.signinSchema = _joi.default.object({
  email: _joi.default.string().email().required(),
  password: _joi.default.string().alphanum().min(4).max(50).required()
});
schemas.message = _joi.default.object({
  parentmessageid: _joi.default.number().integer().max(1000000),
  subject: _joi.default.string().min(4).trim().required(),
  message: _joi.default.string().min(5).trim().required(),
  receiver: _joi.default.string().email().max(256)
});
schemas.groupMessage = _joi.default.object({
  subject: _joi.default.string().min(4).trim().required(),
  message: _joi.default.string().min(4).trim().required()
});
schemas.createGroup = _joi.default.object({
  groupname: _joi.default.string().alphanum().min(4).max(30).required()
});
schemas.rename = _joi.default.object({
  groupname: _joi.default.string().alphanum().min(4).max(30).trim().required()
});
schemas.newpass = _joi.default.object({
  password: _joi.default.string().alphanum().min(4).max(50).required(),
  confirmpassword: _joi.default.string().alphanum().min(4).max(50).required()
});
schemas.addToGroup = _joi.default.object({
  useremail: _joi.default.string().email({
    minDomainAtoms: 2
  }).max(256).trim().required()
});
schemas.resetSchema = _joi.default.object({
  email: _joi.default.string().email({
    minDomainAtoms: 2
  }).max(256).trim().required()
});
var _default = schemas;
exports.default = _default;