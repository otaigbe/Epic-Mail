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

messagesImpl.getAllReceivedEmails = function (req, res) {
  _messages.default.getAllReceivedEmails(req, res);
};

messagesImpl.getAllUnreadEmails = function (req, res) {
  _messages.default.getAllUnreadEmails(req, res);
};

messagesImpl.getAllSentEmails = function (req, res) {
  _messages.default.getAllSentEmails(req, res);
};

messagesImpl.getMessageById = function (req, res) {
  _messages.default.getMessageById(req, res);
};

messagesImpl.deleteMessageById = function (req, res) {
  _messages.default.deleteMessageById(req, res);
};

messagesImpl.testingCloudMail = function (req, res) {
  _messages.default.testingCloudMail(req, res);
};

messagesImpl.getAllSentEmailsFromCloudMailServer = function (req, res) {
  _messages.default.getAllSentEmailsFromCloudMailServer(req, res);
};

var _default = messagesImpl;
exports.default = _default;