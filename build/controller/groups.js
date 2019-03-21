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

var GroupsController =
/*#__PURE__*/
function () {
  function GroupsController() {
    _classCallCheck(this, GroupsController);
  }

  _createClass(GroupsController, null, [{
    key: "createGroup",

    /**
     * This creates a group for a user.
     * @param {Object} req - client request Object
     * @param {Object} res - Server response Object
     * @returns {JSON} - containing the status message and any addition data required if any
     */
    value: function () {
      var _createGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var result, group, args, dbOperationResult1, args1, dbOperationResult;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                result = _joi.default.validate(req.body, _schema.default.createGroup);

                if (!(result.error === null)) {
                  _context.next = 17;
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

                return _context.abrupt("return", res.status(409).json(_responseSchema.default.responseWithOutResource("You Already have a group with name ".concat(group.groupName, "! Chooose a different group name"), 'Conflict')));

              case 11:
                args1 = [group.groupName, group.creator, Number(req.user.id)];
                _context.next = 14;
                return _dbHelper.default.performTransactionalQuery(_queries.default.createGroup, args1);

              case 14:
                dbOperationResult = _context.sent;
                group.id = dbOperationResult.rows[0].groupid;
                return _context.abrupt("return", res.status(201).json(_responseSchema.default.responseWithResource(group, "Group ".concat(group.groupName, " has been created!"), 'Success')));

              case 17:
                _errorHandler.default.validationError(res, result);

              case 18:
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
    /**
     * This deletes a group created by a particular user. A user can only delete a group he created
     * @param {Object} req - client request Object
     * @param {Object} res - Server response Object
     * @returns {JSON} - containing the status message and any addition data required if any
     */

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
                if (!(isNaN(req.params.groupId) === true)) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json(_responseSchema.default.responseWithOutResource('Please Insert only numbers', 'Bad Request')));

              case 2:
                args = [req.params.groupId, req.user.email];
                _context2.next = 5;
                return _dbHelper.default.performTransactionalQuery(_queries.default.checkIfUserOwnsTheGroupAboutToBeDeleted, args);

              case 5:
                dbOperationResult = _context2.sent;

                if (!(dbOperationResult.rowCount === 1)) {
                  _context2.next = 11;
                  break;
                }

                _context2.next = 9;
                return _dbHelper.default.performTransactionalQuery(_queries.default.deleteGroupById, args);

              case 9:
                dbOperationResult2 = _context2.sent;
                return _context2.abrupt("return", res.status(200).json(_responseSchema.default.responseWithOutResource('Deletion Successful', 'Success')));

              case 11:
                if (!(dbOperationResult.rowCount === 0)) {
                  _context2.next = 13;
                  break;
                }

                return _context2.abrupt("return", res.status(404).json(_responseSchema.default.responseWithOutResource('Couldn\'t Delete the group you requested', 'Unsuccessful Operation')));

              case 13:
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
    /**
     * This gets all groups created by a particular user
     * @param {Object} req - client request Object
     * @param {Object} res - Server response Object
     * @returns {JSON} - containing the status message and any addition data required if any
     */

  }, {
    key: "getAllGroups",
    value: function () {
      var _getAllGroups = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var args, dbOperationResult, groups;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                args = [req.user.email];
                _context3.next = 3;
                return _dbHelper.default.performTransactionalQuery(_queries.default.selectAllGroupsCreatedByAUser, args);

              case 3:
                dbOperationResult = _context3.sent;
                groups = dbOperationResult.rows;
                /* istanbul ignore next */

                if (!(dbOperationResult.rows.length === 0)) {
                  _context3.next = 8;
                  break;
                }

                groups = 'You have not created any groups yet';
                return _context3.abrupt("return", res.status(200).json(_responseSchema.default.responseWithOutResource(groups, 'Success')));

              case 8:
                return _context3.abrupt("return", res.status(200).json(_responseSchema.default.responseWithResource(groups, "Showing all groups created by ".concat(req.user.email), 'Success')));

              case 9:
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
    /**
     * This renames a group
     * @param {Object} req - client request Object
     * @param {Object} res - Server response Object
     * @returns {JSON} - containing the status message and any addition data required if any
     */

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
                if (!(isNaN(req.params.groupId) === true)) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return", res.status(400).json(_responseSchema.default.responseWithOutResource('Please Insert only numbers', 'Bad Request')));

              case 2:
                result = _joi.default.validate(req.body, _schema.default.rename);

                if (!(result.error === null)) {
                  _context4.next = 25;
                  break;
                }

                args = [req.params.groupId, req.user.email];
                args1 = [req.body.groupname, req.user.email];
                args2 = [req.body.groupname, req.params.groupId, req.user.email];
                _context4.next = 9;
                return _dbHelper.default.performTransactionalQuery(_queries.default.checkIfUserOwnsTheGroupAboutToBeDeleted, args);

              case 9:
                dbOperationResult = _context4.sent;

                if (!(dbOperationResult.rowCount === 1)) {
                  _context4.next = 23;
                  break;
                }

                _context4.next = 13;
                return _dbHelper.default.performTransactionalQuery(_queries.default.checkIfUserAlreadyHasGroupWithGroupName, args1);

              case 13:
                dbOperationResult1 = _context4.sent;

                if (!(dbOperationResult1.rowCount > 0)) {
                  _context4.next = 16;
                  break;
                }

                return _context4.abrupt("return", res.status(409).json(_responseSchema.default.responseWithOutResource("You Already have a group with name ".concat(req.body.groupname, "! Chooose a different group name"), 'Conflict')));

              case 16:
                if (!(dbOperationResult1.rowCount === 0)) {
                  _context4.next = 21;
                  break;
                }

                _context4.next = 19;
                return _dbHelper.default.performTransactionalQuery(_queries.default.renameGroup, args2);

              case 19:
                dbOperationResult2 = _context4.sent;
                return _context4.abrupt("return", res.status(200).json({
                  status: 'Success',
                  message: "Group with id ".concat(req.params.groupId, " has been renamed to ").concat(req.body.groupname, "!")
                }));

              case 21:
                _context4.next = 25;
                break;

              case 23:
                if (!(dbOperationResult.rowCount === 0)) {
                  _context4.next = 25;
                  break;
                }

                return _context4.abrupt("return", res.status(404).json(_responseSchema.default.responseWithOutResource('Can\'t find the group you were looking for', 'Not Found')));

              case 25:
                _errorHandler.default.validationError(res, result);

              case 26:
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
    /**
     * This adds a user to a group
     * @param {Object} req - client request Object
     * @param {Object} res - Server response Object
     * @returns {JSON} - containing the status message and any addition data required if any
     */

  }, {
    key: "addUserToGroup",
    value: function () {
      var _addUserToGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var result, args, dbOperationResult, args2, dbOperationResult3, args3, dbOperationResult2;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(isNaN(req.params.groupId) === true)) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return", res.status(400).json(_responseSchema.default.responseWithOutResource('Please Insert only numbers', 'Bad Request')));

              case 2:
                if (req.body.useremail.includes('@epicmail.com')) {
                  _context5.next = 4;
                  break;
                }

                return _context5.abrupt("return", res.status(400).json(_responseSchema.default.responseWithOutResource('Please Insert a valid email', 'Bad Request')));

              case 4:
                result = _joi.default.validate(req.body, _schema.default.addToGroup);

                if (!(result.error === null)) {
                  _context5.next = 28;
                  break;
                }

                if (!(req.body.useremail === req.user.email)) {
                  _context5.next = 8;
                  break;
                }

                return _context5.abrupt("return", res.status(400).json({
                  status: 'Bad Request',
                  message: 'You cannot add yourself to a group you own!'
                }));

              case 8:
                args = [req.params.groupId, req.user.email];
                _context5.next = 11;
                return _dbHelper.default.performTransactionalQuery(_queries.default.checkIfUserOwnsTheGroupAboutToBeDeleted, args);

              case 11:
                dbOperationResult = _context5.sent;

                if (!(dbOperationResult.rowCount === 1)) {
                  _context5.next = 24;
                  break;
                }

                args2 = [req.params.groupId, req.body.useremail];
                _context5.next = 16;
                return _dbHelper.default.performTransactionalQuery(_queries.default.CheckIfUserIsAlreadyAMember, args2);

              case 16:
                dbOperationResult3 = _context5.sent;

                if (!(dbOperationResult3.rowCount > 0)) {
                  _context5.next = 19;
                  break;
                }

                return _context5.abrupt("return", res.status(200).json({
                  status: 'conflict',
                  message: 'You are already a member of the Group!'
                }));

              case 19:
                args3 = [req.params.groupId, req.body.useremail];
                _context5.next = 22;
                return _dbHelper.default.performTransactionalQuery(_queries.default.insertNewMembersIntoGroup, args3);

              case 22:
                dbOperationResult2 = _context5.sent;
                return _context5.abrupt("return", res.status(200).json({
                  status: 'Success',
                  message: 'User added to Group!'
                }));

              case 24:
                if (!(dbOperationResult.rowCount === 0)) {
                  _context5.next = 26;
                  break;
                }

                return _context5.abrupt("return", res.status(404).json(_responseSchema.default.responseWithOutResource('The Group wasn\'t found!', 'Not found')));

              case 26:
                _context5.next = 29;
                break;

              case 28:
                _errorHandler.default.validationError(res, result);

              case 29:
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
    /**
     * This deletes a particular user from  a particular group
     * @param {Object} req - client request Object
     * @param {Object} res - Server response Object
     * @returns {JSON} - containing the status message and any addition data required if any
     */

  }, {
    key: "deleteUserFromParticularGroup",
    value: function () {
      var _deleteUserFromParticularGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(req, res) {
        var args, dbOperationResult3, dbOperationResult;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(isNaN(req.params.groupId) === true || isNaN(req.params.userId) === true)) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return", res.status(400).json(_responseSchema.default.responseWithOutResource('Please Insert only numbers', 'Bad Request')));

              case 2:
                args = [req.params.groupId, Number(req.params.userId)];
                _context6.next = 5;
                return _dbHelper.default.performTransactionalQuery(_queries.default.CheckIfUserIsAlreadyAMemberDel, args);

              case 5:
                dbOperationResult3 = _context6.sent;

                if (!(dbOperationResult3.rowCount > 0)) {
                  _context6.next = 11;
                  break;
                }

                _context6.next = 9;
                return _dbHelper.default.performTransactionalQuery(_queries.default.deleteUserFromASpecificGroup, args);

              case 9:
                dbOperationResult = _context6.sent;
                return _context6.abrupt("return", res.status(200).json({
                  status: 'Success',
                  data: {
                    message: 'user deleted from group'
                  }
                }));

              case 11:
                if (!(dbOperationResult3.rowCount === 0)) {
                  _context6.next = 13;
                  break;
                }

                return _context6.abrupt("return", res.status(404).json(_responseSchema.default.groupFailure('You are not a member of Group', 'Not found')));

              case 13:
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
    /**
     * This sends a mail to all members in a group
     * @param {Object} req - client request Object
     * @param {Object} res - Server response Object
     * @returns {JSON} - containing the status message and any addition data required if any
     */

  }, {
    key: "sendMailToAllMembersInAGroup",
    value: function () {
      var _sendMailToAllMembersInAGroup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(req, res) {
        var result, message, args, dbOperationResult;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!(isNaN(req.params.groupId) === true)) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt("return", res.status(400).json(_responseSchema.default.responseWithOutResource('Please Insert only numbers', 'Bad Request')));

              case 2:
                result = _joi.default.validate(req.body, _schema.default.groupMessage);

                if (!(result.error === null)) {
                  _context8.next = 17;
                  break;
                }

                message = {};
                message.sender = req.user.email;
                message.messageBody = req.body.message;
                message.subject = req.body.subject;
                message.parentmessageid = req.body.parentmessageid;
                args = [req.params.groupId];
                _context8.next = 12;
                return _dbHelper.default.performTransactionalQuery(_queries.default.selectAllMembersOfAPraticularGroup, args);

              case 12:
                dbOperationResult = _context8.sent;

                if (!(dbOperationResult.rowCount === 0)) {
                  _context8.next = 15;
                  break;
                }

                return _context8.abrupt("return", res.status(404).json({
                  status: 'failure',
                  error: {
                    message: 'Group non existent or has no members'
                  }
                }));

              case 15:
                dbOperationResult.rows.map(
                /*#__PURE__*/
                function () {
                  var _ref = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee7(element) {
                    var args2, dboperationResult;
                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            message.status = 'sent';
                            args2 = [message.subject, message.messageBody, message.parentmessageid, message.status, req.user.email, element.memberemail, Number(req.user.id)];
                            _context7.next = 4;
                            return _dbHelper.default.performTransactionalQuery(_queries.default.insertIntoMessageInboxOutbox, args2);

                          case 4:
                            dboperationResult = _context7.sent;

                          case 5:
                          case "end":
                            return _context7.stop();
                        }
                      }
                    }, _callee7);
                  }));

                  return function (_x15) {
                    return _ref.apply(this, arguments);
                  };
                }());
                return _context8.abrupt("return", res.status(201).json({
                  status: 'success',
                  message: 'Successfully sent the mails to all members in the group',
                  data: message
                }));

              case 17:
                _errorHandler.default.validationError(res, result);

              case 18:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
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