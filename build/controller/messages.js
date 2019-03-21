"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _schema = _interopRequireDefault(require("../helper/schema"));

var _errorHandler = _interopRequireDefault(require("../helper/errorHandler"));

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
     * This sends a message created by a user or saves it as draft
     * @param {Object} req - client request Object
     * @param {Object} res - Server response Object
     * @returns {JSON} - containing the status message and any addition data required if any
     */
    value: function () {
      var _sendMail = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var result, message, args2, dboperationResult2, args, dboperationResult, _args, _dboperationResult;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(req.body.receiver && !req.body.receiver.includes('@epicmail.com'))) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  message: 'Your receiver address is in valid'
                }));

              case 2:
                result = _joi.default.validate(req.body, _schema.default.message);

                if (!(result.error === null)) {
                  _context.next = 36;
                  break;
                }

                message = {};
                message.messageBody = req.body.message;
                message.subject = req.body.subject;
                message.parentmessageid = req.body.parentmessageid;
                message.receiver = req.body.receiver;
                /* istanbul ignore next */

                if (!(message.receiver && message.receiver !== req.user.email)) {
                  _context.next = 27;
                  break;
                }

                args2 = [req.body.receiver];
                _context.next = 13;
                return _dbHelper.default.performTransactionalQuery(_queries.default.checkIfEmailExists, args2);

              case 13:
                dboperationResult2 = _context.sent;

                if (!(dboperationResult2.rowCount === 0)) {
                  _context.next = 16;
                  break;
                }

                return _context.abrupt("return", res.status(404).json(_responseSchema.default.responseWithOutResource('Receiver does not exists', 'Not Found')));

              case 16:
                message.status = 'sent';
                args = [message.subject, message.messageBody, message.parentmessageid, message.status, req.user.email, message.receiver, Number(req.user.id)];
                _context.next = 20;
                return _dbHelper.default.performTransactionalQuery(_queries.default.insertIntoMessageInboxOutbox, args);

              case 20:
                dboperationResult = _context.sent;

                if (!(dboperationResult.rowCount === 1)) {
                  _context.next = 25;
                  break;
                }

                message.sender = req.user.email;
                message.id = dboperationResult.rows[0].messageid;
                return _context.abrupt("return", res.status(201).json(_responseSchema.default.responseWithResource(message, 'Message sent successfully', 'Success')));

              case 25:
                _context.next = 36;
                break;

              case 27:
                if (!(message.receiver === undefined || message.receiver === req.user.email)) {
                  _context.next = 36;
                  break;
                }

                message.status = 'draft';
                _args = [message.subject, message.messageBody, message.parentmessageid, message.status, message.sender, message.receiver];
                _context.next = 32;
                return _dbHelper.default.performTransactionalQuery(_queries.default.insertMessageAsDraft, _args);

              case 32:
                _dboperationResult = _context.sent;

                if (!(_dboperationResult.rowCount === 1)) {
                  _context.next = 36;
                  break;
                }

                message.id = _dboperationResult.rows[0].messageid;
                return _context.abrupt("return", res.status(201).json(_responseSchema.default.responseWithResource(message, 'Message saved as draft', 'Success')));

              case 36:
                _errorHandler.default.validationError(res, result);

              case 37:
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
    /**
     * This fetches all received emails
     * @param {Object} req - client request Object
     * @param {Object} res - Server response Object
     * @returns {JSON} - containing the status message and any addition data required if any
     */

  }, {
    key: "getAllReceivedEmails",
    value: function () {
      var _getAllReceivedEmails = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var user, args, dbOperationResult, received;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                user = req.user;
                args = [req.user.email];
                _context2.next = 4;
                return _dbHelper.default.performTransactionalQuery(_queries.default.selectAllMessagesFromInboxBelongingToAParticularUser, args);

              case 4:
                dbOperationResult = _context2.sent;
                received = dbOperationResult.rows;
                /* istanbul ignore next */

                if (!(dbOperationResult.rows.length === 0)) {
                  _context2.next = 9;
                  break;
                }

                received = 'You have no received emails currently';
                return _context2.abrupt("return", res.status(200).json(_responseSchema.default.responseWithOutResource(received, 'Success')));

              case 9:
                return _context2.abrupt("return", res.status(200).json(_responseSchema.default.responseWithResource(received, 'Received Emails', 'Success')));

              case 10:
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
    /**
     * This gets all unread messages for a particular user
     * @param {Object} req - client request Object
     * @param {Object} res - Server response Object
     * @returns {JSON} - containing the status message and any addition data required if any
     */

  }, {
    key: "getAllUnreadEmails",
    value: function () {
      var _getAllUnreadEmails = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var args, dbOperationResult, unread;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                args = [req.user.email, 'unread'];
                _context3.next = 3;
                return _dbHelper.default.performTransactionalQuery(_queries.default.selectAllUnreadMessagesForAParticularUser, args);

              case 3:
                dbOperationResult = _context3.sent;
                unread = dbOperationResult.rows;
                /* istanbul ignore next */

                if (!(dbOperationResult.rows.length === 0)) {
                  _context3.next = 8;
                  break;
                }

                unread = 'You have no unread emails currently';
                return _context3.abrupt("return", res.status(200).json(_responseSchema.default.responseWithResource(unread, 'Success')));

              case 8:
                return _context3.abrupt("return", res.status(200).json(_responseSchema.default.responseWithResource(unread, 'Unread Messages', 'Success')));

              case 9:
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
    /**
     * This gets all sent messages sent by a user
     * @param {Object} req - client request Object
     * @param {Object} res - Server response Object
     * @returns {JSON} - containing the status message and any addition data required if any
     */

  }, {
    key: "getAllSentEmails",
    value: function () {
      var _getAllSentEmails = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var args, dbOperationResult, sent;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                args = [req.user.email];
                _context4.next = 3;
                return _dbHelper.default.performTransactionalQuery(_queries.default.selectAllSentEmailsForAParticularUser, args);

              case 3:
                dbOperationResult = _context4.sent;
                sent = dbOperationResult.rows;
                /* istanbul ignore next */

                if (!(dbOperationResult.rows.length === 0)) {
                  _context4.next = 8;
                  break;
                }

                sent = 'You have no sent emails currently';
                return _context4.abrupt("return", res.status(200).json(_responseSchema.default.responseWithResource(sent, 'Success')));

              case 8:
                return _context4.abrupt("return", res.status(200).json(_responseSchema.default.responseWithResource(sent, 'Sent Messages', 'Success')));

              case 9:
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
    /**
     * This fetches a message by id
     * @param {Object} req - client request Object
     * @param {Object} res - Server response Object
     * @returns {JSON} - containing the status message and any addition data required if any
     */

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
                if (!(isNaN(req.params.messageId) === true)) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return", res.status(400).json(_responseSchema.default.responseWithOutResource('Please Insert only numbers', 'Bad Request')));

              case 2:
                args = [req.params.messageId, req.user.email];
                _context5.next = 5;
                return _dbHelper.default.performTransactionalQuery(_queries.default.selectEmailByIdForParticularUser, args);

              case 5:
                dbOperationResult = _context5.sent;

                if (!(dbOperationResult.rowCount === 1)) {
                  _context5.next = 8;
                  break;
                }

                return _context5.abrupt("return", res.status(200).json(_responseSchema.default.responseWithResource(dbOperationResult.rows[0], 'Message Found', 'Success')));

              case 8:
                return _context5.abrupt("return", res.status(404).json(_responseSchema.default.responseWithOutResource('Could not find the message you were looking for', 'failure')));

              case 9:
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
    /**
     * This deletes a message by id
     * @param {Object} req - client request Object
     * @param {Object} res - Server response Object
     * @returns {JSON} - containing the status message and any addition data required if any
     */

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
                if (!(isNaN(req.params.messageId) === true)) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return", res.status(400).json(_responseSchema.default.responseWithOutResource('Please Insert only numbers', 'Bad Request')));

              case 2:
                args = [req.params.messageId, req.user.email];
                _context6.next = 5;
                return _dbHelper.default.performTransactionalQuery(_queries.default.deleteQueryByIdForParticularUser, args);

              case 5:
                dbOperationResult = _context6.sent;

                if (!(dbOperationResult.rowCount === 1)) {
                  _context6.next = 10;
                  break;
                }

                return _context6.abrupt("return", res.status(200).json({
                  status: 'Sucess',
                  message: 'The message was deleted successfully'
                }));

              case 10:
                return _context6.abrupt("return", res.status(404).json(_responseSchema.default.responseWithOutResource('Could not delete the message', 'Not Found')));

              case 11:
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