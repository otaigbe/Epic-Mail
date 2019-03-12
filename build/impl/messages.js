"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _messages = _interopRequireDefault(require("../helper/api/v1/messages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var messagesImpl = {};

messagesImpl.sendMail = function (req, res) {
  _messages.default.sendMail(req, res);
};

var _default = messagesImpl;
exports.default = _default;