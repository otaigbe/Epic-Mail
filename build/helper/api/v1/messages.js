"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _usefulFunc = _interopRequireDefault(require("../../misc/usefulFunc"));

var _schema = _interopRequireDefault(require("../../misc/schema"));

var _errorHandler = _interopRequireDefault(require("../../errorHandler/errorHandler"));

var _messages = _interopRequireDefault(require("../../../fixtures/messages"));

var _responseSchema = _interopRequireDefault(require("../../misc/responseSchema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prefer-destructuring */
var messages = {};

messages.sendMail = function (req, res) {
  var result = _joi.default.validate(req.body, _schema.default.message);

  if (result.error === null) {
    var message = {};
    message.to = req.body.to;
    message.cc = req.body.cc;
    message.messageBody = req.body.message;
    message.subject = req.body.subject;
    message.createdOn = Date.now();
    message.id = _usefulFunc.default.generateId();
    message.parentMessageId = req.body.parentMessageId;
    message.from = req.body.from;

    var id = _usefulFunc.default.insertMessageIntoStorage(_messages.default, message);

    if (!id) {
      return res.status(501).json(_responseSchema.default.failure('Something went wrong!Couldn\'t save message', null, 501));
    }

    if (message.from) {
      message.status = 'unread';
      message.type = 'received';
    } else if (message.to) {
      message.type = 'sent';
    } // console.log(message);


    return res.status(201).json(_responseSchema.default.success('POST', req, message, 'message created and saved successfully', 201));
  }

  _errorHandler.default.validationError(res, result);
};

messages.getAllReceivedEmails = function (req, res) {
  var receivedEmails = [];

  for (var i = 0; i < _messages.default.length; i++) {
    if (_messages.default[i].type === 'received') {
      receivedEmails.push(_messages.default[i]);
    }
  }

  return res.status(200).json(_responseSchema.default.success('GET', req, receivedEmails, "Showing all ".concat(receivedEmails.length, " received emails"), 200));
};

messages.getAllUnreadEmails = function (req, res) {
  var unreadEmails = [];

  for (var i = 0; i < _messages.default.length; i++) {
    if (_messages.default[i].status === 'unread') {
      unreadEmails.push(_messages.default[i]);
    }
  }

  return res.status(200).json(_responseSchema.default.success('GET', req, unreadEmails, "Showing all ".concat(unreadEmails.length, " unread emails"), 200));
};

var _default = messages;
exports.default = _default;