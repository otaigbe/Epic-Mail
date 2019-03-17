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
  parentmessageid: _joi.default.number().integer(),
  subject: _joi.default.string().required(),
  message: _joi.default.string().required(),
  receiver: _joi.default.string().email().max(256),
  sender: _joi.default.string().email().max(256).required()
});
var _default = schemas;
exports.default = _default;