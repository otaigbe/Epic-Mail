"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

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
                console.log(req.body);
                result = _joi.default.validate(req.body, _schema.default.group);

                if (!(result.error === null)) {
                  _context.next = 19;
                  break;
                }

                console.log('joi validated');
                group = {};
                group.groupName = req.body.groupname;
                group.creator = req.body.creator;
                args = [group.groupName, group.creator];
                _context.next = 10;
                return _dbHelper.default.performTransactionalQuery(_queries.default.checkIfUserAlreadyHasGroupWithGroupName, args);

              case 10:
                dbOperationResult1 = _context.sent;

                if (!(dbOperationResult1.rowCount > 0)) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt("return", res.status(201).json(_responseSchema.default.groupFailure("You Already have a group with name ".concat(group.groupName, "! Chooose a different group name"), 400)));

              case 13:
                _context.next = 15;
                return _dbHelper.default.performTransactionalQuery(_queries.default.createGroup, args);

              case 15:
                dbOperationResult = _context.sent;
                return _context.abrupt("return", res.status(201).json(_responseSchema.default.groupSuccess(group, 'Group created!', 200)));

              case 19:
                _errorHandler.default.validationError(res, result);

              case 20:
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
  }]);

  return GroupsController;
}();

exports.default = GroupsController;