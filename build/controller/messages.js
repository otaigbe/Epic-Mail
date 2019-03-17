"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _usefulFunc = _interopRequireDefault(require("../helper/usefulFunc"));

var _schema = _interopRequireDefault(require("../helper/schema"));

var _errorHandler = _interopRequireDefault(require("../helper/errorHandler"));

var _messages = _interopRequireDefault(require("../fixtures/messages"));

var _responseSchema = _interopRequireDefault(require("../helper/responseSchema"));

var _dbHelper = _interopRequireDefault(require("../model/dbHelper"));

var _queries = _interopRequireDefault(require("../model/queries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MessagesController =
/*#__PURE__*/
function () {
  function MessagesController() {
    _classCallCheck(this, MessagesController);
  }

  _createClass(MessagesController, null, [{
    key: "sendMail",

    /**
     * This creates a new account for a user
     * @param {Object} req - client request Object
     * @param {Object} res - Server response Object
     * @returns {Object} Success or failure message
     */
    value: function () {
      var _sendMail = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var result, message, args, dboperationResult, _args, _dboperationResult;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('entering sendmail function');
                result = _joi.default.validate(req.body, _schema.default.message);

                if (!(result.error === null)) {
                  _context.next = 31;
                  break;
                }

                console.log('joi validated');
                message = {};
                message.sender = req.body.sender;
                message.messageBody = req.body.message;
                message.subject = req.body.subject;
                message.parentmessageid = req.body.parentmessageid;
                message.receiver = req.body.receiver;
                console.log("reciver:  ".concat(message.receiver));
                console.log('initiliazed message object');

                if (!(message.receiver && message.sender)) {
                  _context.next = 23;
                  break;
                }

                message.status = 'sent';
                console.log('reached inside');
                args = [message.subject, message.messageBody, message.parentmessageid, message.status, message.sender, message.receiver];
                _context.next = 18;
                return _dbHelper.default.performTransactionalQuery(_queries.default.insertIntoMessageInboxOutbox, args);

              case 18:
                dboperationResult = _context.sent;

                if (!(dboperationResult.rowCount === 1)) {
                  _context.next = 21;
                  break;
                }

                return _context.abrupt("return", res.status(201).json(_responseSchema.default.success('POST', req, message, 'message created and sent successfully', 201)));

              case 21:
                _context.next = 31;
                break;

              case 23:
                if (!(message.sender && message.receiver === undefined)) {
                  _context.next = 31;
                  break;
                }

                message.status = 'draft';
                _args = [message.subject, message.messageBody, message.parentmessageid, message.status, message.sender, message.receiver];
                _context.next = 28;
                return _dbHelper.default.performTransactionalQuery(_queries.default.insertMessageAsDraft, _args);

              case 28:
                _dboperationResult = _context.sent;

                if (!(_dboperationResult.rowCount === 1)) {
                  _context.next = 31;
                  break;
                }

                return _context.abrupt("return", res.status(201).json(_responseSchema.default.success('POST', req, message, 'message saved successfully', 201)));

              case 31:
                _errorHandler.default.validationError(res, result);

              case 32:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function sendMail(_x, _x2) {
        return _sendMail.apply(this, arguments);
      }

      return sendMail;
    }()
  }, {
    key: "getAllReceivedEmails",
    value: function () {
      var _getAllReceivedEmails = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var dbOperationResult, receivedEmails;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _dbHelper.default.performTransactionalQuery(_queries.default.selectAllMessagesFromInbox, null);

              case 2:
                dbOperationResult = _context2.sent;
                receivedEmails = dbOperationResult.rows;
                return _context2.abrupt("return", res.status(200).json(_responseSchema.default.success('GET', req, receivedEmails, 'Showing all received emails', 200)));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getAllReceivedEmails(_x3, _x4) {
        return _getAllReceivedEmails.apply(this, arguments);
      }

      return getAllReceivedEmails;
    }()
  }, {
    key: "getAllUnreadEmails",
    value: function () {
      var _getAllUnreadEmails = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var args, dbOperationResult;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log('entering get all received emails');
                args = ['unread'];
                _context3.next = 4;
                return _dbHelper.default.performTransactionalQuery(_queries.default.selectAllUnreadMessages, args);

              case 4:
                dbOperationResult = _context3.sent;
                return _context3.abrupt("return", res.status(200).json(_responseSchema.default.success('GET', req, dbOperationResult.rows[0], 'Showing all unread emails', 200)));

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getAllUnreadEmails(_x5, _x6) {
        return _getAllUnreadEmails.apply(this, arguments);
      }

      return getAllUnreadEmails;
    }()
  }, {
    key: "getAllSentEmails",
    value: function () {
      var _getAllSentEmails = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var dbOperationResult;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _dbHelper.default.performTransactionalQuery(_queries.default.selectAllSentEmails, null);

              case 2:
                dbOperationResult = _context4.sent;
                return _context4.abrupt("return", res.status(200).json(_responseSchema.default.success('GET', req, dbOperationResult.rows[0], 'Showing all sent emails', 200)));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getAllSentEmails(_x7, _x8) {
        return _getAllSentEmails.apply(this, arguments);
      }

      return getAllSentEmails;
    }()
  }, {
    key: "getMessageById",
    value: function () {
      var _getMessageById = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var args, dbOperationResult;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                args = [req.params.messageId];
                _context5.next = 3;
                return _dbHelper.default.performTransactionalQuery(_queries.default.selectEmailById, args);

              case 3:
                dbOperationResult = _context5.sent;

                if (!(dbOperationResult.rowCount === 1)) {
                  _context5.next = 6;
                  break;
                }

                return _context5.abrupt("return", res.status(200).json(_responseSchema.default.success('GET', req, dbOperationResult.rows[0], "Showing message with id of ".concat(req.params.messageId), 200)));

              case 6:
                return _context5.abrupt("return", res.status(404).json(_responseSchema.default.failure("Couldn't find message with id ".concat(req.params.messageId), null, 404)));

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function getMessageById(_x9, _x10) {
        return _getMessageById.apply(this, arguments);
      }

      return getMessageById;
    }()
  }, {
    key: "deleteMessageById",
    value: function () {
      var _deleteMessageById = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(req, res) {
        var args, dbOperationResult;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                args = [req.params.messageId];
                _context6.next = 3;
                return _dbHelper.default.performTransactionalQuery(_queries.default.deleteQueryById, args);

              case 3:
                dbOperationResult = _context6.sent;

                if (!(dbOperationResult.rowCount === 1)) {
                  _context6.next = 6;
                  break;
                }

                return _context6.abrupt("return", res.status(200).json(_responseSchema.default.success('DELETE', null, null, "Showing message with id of ".concat(req.params.messageId), 200)));

              case 6:
                if (!(dbOperationResult.rowCount === 0)) {
                  _context6.next = 8;
                  break;
                }

                return _context6.abrupt("return", res.status(404).json(_responseSchema.default.failure("Couldn't find message with id ".concat(req.params.messageId), null, 404)));

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function deleteMessageById(_x11, _x12) {
        return _deleteMessageById.apply(this, arguments);
      }

      return deleteMessageById;
    }()
  }]);

  return MessagesController;
}();

exports.default = MessagesController;