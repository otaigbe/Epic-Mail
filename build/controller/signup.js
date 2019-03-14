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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SignupController =
/*#__PURE__*/
function () {
  function SignupController() {
    _classCallCheck(this, SignupController);
  }

  _createClass(SignupController, null, [{
    key: "signup",

    /**
     * This creates a new account for a user
     * @param {Object} req - client request Object
     * @param {Object} res - Server response Object
     * @returns {Object} Success or failure message
     */
    value: function () {
      var _signup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var result, password, salt, hashedPassword, userId, userObj, existentUsername, id;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                result = _joi.default.validate(req.body, _schema.default.userSchema);

                if (!(result.error === null)) {
                  _context.next = 23;
                  break;
                }

                password = req.body.password;
                _context.next = 5;
                return _bcrypt.default.genSalt(10);

              case 5:
                salt = _context.sent;
                _context.next = 8;
                return _bcrypt.default.hash(password, salt);

              case 8:
                hashedPassword = _context.sent;
                userId = _usefulFunc.default.generateId();
                userObj = {};
                userObj.id = userId;
                userObj.email = _usefulFunc.default.generateFullEmailAddress(req.body.username);
                userObj.firstName = req.body.firstName;
                userObj.lastName = req.body.lastName;
                userObj.password = hashedPassword;
                userObj.username = req.body.username;
                userObj.alternateEmail = req.body.alternateEmail;
                existentUsername = _usefulFunc.default.searchForAlreadyExistingUsername(userObj);

                if (existentUsername) {
                  _context.next = 22;
                  break;
                }

                id = _usefulFunc.default.insertIntoStorage(userObj);
                return _context.abrupt("return", res.status(201).json(_responseSchema.default.success('POST', req, userObj, "Account created!Welcome ".concat(req.body.username), 201)));

              case 22:
                return _context.abrupt("return", res.status(409).json(_responseSchema.default.failure('chosen username/email already exists, choose a unique username.', null, 409)));

              case 23:
                _errorHandler.default.validationError(res, result);

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function signup(_x, _x2) {
        return _signup.apply(this, arguments);
      }

      return signup;
    }()
  }]);

  return SignupController;
}();

exports.default = SignupController;