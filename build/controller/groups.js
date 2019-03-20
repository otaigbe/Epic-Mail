"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _usefulFunc = _interopRequireDefault(require("../helper/usefulFunc"));

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

var GroupsController =
/*#__PURE__*/
function () {
  function GroupsController() {
    _classCallCheck(this, GroupsController);
  }

  _createClass(GroupsController, null, [{
    key: "createGroup",

    /**
     * This creates a new account for a user
     * @param {Object} req - client request Object
     * @param {Object} res - Server response Object
     * @returns {Object} Success or failure message
     */
    value: function () {
      var _createGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var result, group, args, dbOperationResult1, dbOperationResult;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                result = _joi.default.validate(req.body, _schema.default.createGroup);

                if (!(result.error === null)) {
                  _context.next = 15;
                  break;
                }

                group = {};
                group.groupName = req.body.groupname;
                group.creator = req.user.email;
                args = [group.groupName, group.creator];
                _context.next = 8;
                return _dbHelper.default.performTransactionalQuery(_queries.default.checkIfUserAlreadyHasGroupWithGroupName, args);

              case 8:
                dbOperationResult1 = _context.sent;

                if (!(dbOperationResult1.rowCount > 0)) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("return", res.status(400).json(_responseSchema.default.groupFailure("You Already have a group with name ".concat(group.groupName, "! Chooose a different group name"), 400)));

              case 11:
                _context.next = 13;
                return _dbHelper.default.performTransactionalQuery(_queries.default.createGroup, args);

              case 13:
                dbOperationResult = _context.sent;
                return _context.abrupt("return", res.status(201).json(_responseSchema.default.groupSuccess(group, "Group with id ".concat(dbOperationResult.rows[0].groupid, " has been created!"), 200)));

              case 15:
                _errorHandler.default.validationError(res, result);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createGroup(_x, _x2) {
        return _createGroup.apply(this, arguments);
      }

      return createGroup;
    }()
  }, {
    key: "deleteGroupById",
    value: function () {
      var _deleteGroupById = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var args, dbOperationResult, dbOperationResult2;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                args = [req.params.groupId, req.user.email];
                _context2.next = 3;
                return _dbHelper.default.performTransactionalQuery(_queries.default.checkIfUserOwnsTheGroupAboutToBeDeleted, args);

              case 3:
                dbOperationResult = _context2.sent;

                if (!(dbOperationResult.rowCount === 1)) {
                  _context2.next = 9;
                  break;
                }

                _context2.next = 7;
                return _dbHelper.default.performTransactionalQuery(_queries.default.deleteGroupById, args);

              case 7:
                dbOperationResult2 = _context2.sent;
                return _context2.abrupt("return", res.status(200).json(_responseSchema.default.groupSuccess(null, "Deleted group with id of ".concat(req.params.groupId), 200)));

              case 9:
                if (!(dbOperationResult.rowCount === 0)) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt("return", res.status(404).json(_responseSchema.default.groupFailure("Couldn't find group with id ".concat(req.params.groupId, " belonging to you"), 404)));

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function deleteGroupById(_x3, _x4) {
        return _deleteGroupById.apply(this, arguments);
      }

      return deleteGroupById;
    }()
  }, {
    key: "getAllGroups",
    value: function () {
      var _getAllGroups = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var args, dbOperationResult;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                args = [req.user.email];
                _context3.next = 3;
                return _dbHelper.default.performTransactionalQuery(_queries.default.selectAllGroupsCreatedByAUser, args);

              case 3:
                dbOperationResult = _context3.sent;
                return _context3.abrupt("return", res.status(200).json(_responseSchema.default.groupSuccess(dbOperationResult.rows, 'Showing all groups created by User ---', 200)));

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getAllGroups(_x5, _x6) {
        return _getAllGroups.apply(this, arguments);
      }

      return getAllGroups;
    }()
  }, {
    key: "renameAGroup",
    value: function () {
      var _renameAGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var result, args, args1, args2, dbOperationResult, dbOperationResult1, dbOperationResult2;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                result = _joi.default.validate(req.body, _schema.default.rename);

                if (!(result.error === null)) {
                  _context4.next = 23;
                  break;
                }

                args = [req.params.groupId, 'otaigbe@epicmail.com'];
                args1 = [req.body.groupname, 'otaigbe@epicmail.com'];
                args2 = [req.body.groupname, req.params.groupId, 'otaigbe@epicmail.com'];
                _context4.next = 7;
                return _dbHelper.default.performTransactionalQuery(_queries.default.checkIfUserOwnsTheGroupAboutToBeDeleted, args);

              case 7:
                dbOperationResult = _context4.sent;

                if (!(dbOperationResult.rowCount === 1)) {
                  _context4.next = 21;
                  break;
                }

                _context4.next = 11;
                return _dbHelper.default.performTransactionalQuery(_queries.default.checkIfUserAlreadyHasGroupWithGroupName, args1);

              case 11:
                dbOperationResult1 = _context4.sent;

                if (!(dbOperationResult1.rowCount > 0)) {
                  _context4.next = 14;
                  break;
                }

                return _context4.abrupt("return", res.status(400).json(_responseSchema.default.groupFailure("You Already have a group with name ".concat(req.body.groupname, "! Chooose a different group name"), 400)));

              case 14:
                if (!(dbOperationResult1.rowCount === 0)) {
                  _context4.next = 19;
                  break;
                }

                _context4.next = 17;
                return _dbHelper.default.performTransactionalQuery(_queries.default.renameGroup, args2);

              case 17:
                dbOperationResult2 = _context4.sent;
                return _context4.abrupt("return", res.status(200).json(_responseSchema.default.groupSuccess(null, "Group with id ".concat(req.params.groupId, " has been renamed to ").concat(req.body.groupname, "!"), 200)));

              case 19:
                _context4.next = 23;
                break;

              case 21:
                if (!(dbOperationResult.rowCount === 0)) {
                  _context4.next = 23;
                  break;
                }

                return _context4.abrupt("return", res.status(404).json(_responseSchema.default.groupFailure("Group with id ".concat(req.params.groupId, " doesnt exist for the creator"), 404)));

              case 23:
                _errorHandler.default.validationError(res, result);

              case 24:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function renameAGroup(_x7, _x8) {
        return _renameAGroup.apply(this, arguments);
      }

      return renameAGroup;
    }()
  }, {
    key: "addUserToGroup",
    value: function () {
      var _addUserToGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var result, args, dbOperationResult, args2, dbOperationResult3, dbOperationResult2;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                result = _joi.default.validate(req.body, _schema.default.addToGroup);

                if (!(result.error === null)) {
                  _context5.next = 21;
                  break;
                }

                args = [req.params.groupId, req.user.email];
                _context5.next = 5;
                return _dbHelper.default.performTransactionalQuery(_queries.default.checkIfUserOwnsTheGroupAboutToBeDeleted, args);

              case 5:
                dbOperationResult = _context5.sent;

                if (!(dbOperationResult.rowCount === 1)) {
                  _context5.next = 17;
                  break;
                }

                args2 = [req.params.groupId, req.body.userToBeAdded];
                _context5.next = 10;
                return _dbHelper.default.performTransactionalQuery(_queries.default.CheckIfUserIsAlreadyAMember, args2);

              case 10:
                dbOperationResult3 = _context5.sent;

                if (!(dbOperationResult3.rowCount > 0)) {
                  _context5.next = 13;
                  break;
                }

                return _context5.abrupt("return", res.status(200).json(_responseSchema.default.groupSuccess(null, 'You are already a member of the Group!', 200)));

              case 13:
                _context5.next = 15;
                return _dbHelper.default.performTransactionalQuery(_queries.default.insertNewMembersIntoGroup, args2);

              case 15:
                dbOperationResult2 = _context5.sent;
                return _context5.abrupt("return", res.status(201).json(_responseSchema.default.groupSuccess(null, 'User added to Group!', 201)));

              case 17:
                if (!(dbOperationResult.rowCount === 0)) {
                  _context5.next = 19;
                  break;
                }

                return _context5.abrupt("return", res.status(404).json(_responseSchema.default.groupFailure("Non existent Group with id ".concat(req.params.groupId, " for this user!"), 404)));

              case 19:
                _context5.next = 22;
                break;

              case 21:
                _errorHandler.default.validationError(res, result);

              case 22:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function addUserToGroup(_x9, _x10) {
        return _addUserToGroup.apply(this, arguments);
      }

      return addUserToGroup;
    }()
  }, {
    key: "deleteUserFromParticularGroup",
    value: function () {
      var _deleteUserFromParticularGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(req, res) {
        var epicmail, args, dbOperationResult3, dbOperationResult;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                epicmail = _usefulFunc.default.generateFullEmailAddress(req.params.email);
                args = [req.params.groupId, epicmail];
                _context6.next = 4;
                return _dbHelper.default.performTransactionalQuery(_queries.default.CheckIfUserIsAlreadyAMember, args);

              case 4:
                dbOperationResult3 = _context6.sent;

                if (!(dbOperationResult3.rowCount > 0)) {
                  _context6.next = 10;
                  break;
                }

                _context6.next = 8;
                return _dbHelper.default.performTransactionalQuery(_queries.default.deleteUserFromASpecificGroup, args);

              case 8:
                dbOperationResult = _context6.sent;
                return _context6.abrupt("return", res.status(200).json(_responseSchema.default.groupSuccess(null, "user with email ".concat(req.params.email, " deleted from group"), 200)));

              case 10:
                if (!(dbOperationResult3.rowCount === 0)) {
                  _context6.next = 12;
                  break;
                }

                return _context6.abrupt("return", res.status(404).json(_responseSchema.default.groupFailure("You are not a member of Group with id ".concat(req.params.groupId, "! Nothing to delete"), 404)));

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function deleteUserFromParticularGroup(_x11, _x12) {
        return _deleteUserFromParticularGroup.apply(this, arguments);
      }

      return deleteUserFromParticularGroup;
    }()
    /* istanbul ignore next */

  }, {
    key: "sendMailToAllMembersInAGroup",
    value: function () {
      var _sendMailToAllMembersInAGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(req, res) {
        var result, message, args, dbOperationResult, preparedSqlStatement, dbOperationResult1;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                result = _joi.default.validate(req.body, _schema.default.addToGroup);

                if (!(result.error === null)) {
                  _context7.next = 16;
                  break;
                }

                message = {};
                message.sender = req.user.email;
                message.messageBody = req.body.message;
                message.subject = req.body.subject;
                message.parentmessageid = req.body.parentmessageid; // message.receiver = req.body.receiver;

                args = [req.params.groupId, req.user.email];
                _context7.next = 10;
                return _dbHelper.default.performTransactionalQuery(_queries.default.selectAllMembersOfAPraticularGroup, args);

              case 10:
                dbOperationResult = _context7.sent;
                preparedSqlStatement = _usefulFunc.default.buildSqlStatement(message, dbOperationResult.rows[0]);
                _context7.next = 14;
                return _dbHelper.default.performTransactionalQuery(preparedSqlStatement, null);

              case 14:
                dbOperationResult1 = _context7.sent;
                return _context7.abrupt("return", res.status(200).json(_responseSchema.default.groupSuccess(null, 'message sent successfully to everyone in the group', 200)));

              case 16:
                _errorHandler.default.validationError(res, result);

              case 17:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function sendMailToAllMembersInAGroup(_x13, _x14) {
        return _sendMailToAllMembersInAGroup.apply(this, arguments);
      }

      return sendMailToAllMembersInAGroup;
    }()
  }]);

  return GroupsController;
}();

exports.default = GroupsController;