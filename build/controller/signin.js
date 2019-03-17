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

var SigninController =
/*#__PURE__*/
function () {
  function SigninController() {
    _classCallCheck(this, SigninController);
  }

  _createClass(SigninController, null, [{
    key: "signin",

    /**
     * This creates a new account for a user
     * @param {Object} req - client request Object
     * @param {Object} res - Server response Object
     * @returns {Object} Success or failure message
     */
    value: function () {
      var _signin = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var result, args, dbOperationResult, validPassword;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                result = _joi.default.validate(req.body, _schema.default.signinSchema);

                if (!(result.error === null)) {
                  _context.next = 15;
                  break;
                }

                // const found = usefulFunc.searchForUsernameAndPassword(req.body);
                args = [req.body.email];
                _context.next = 5;
                return _dbHelper.default.performTransactionalQuery(_queries.default.searchForEmail, args);

              case 5:
                dbOperationResult = _context.sent;

                if (!(dbOperationResult.rowCount === 1)) {
                  _context.next = 13;
                  break;
                }

                _context.next = 9;
                return _bcrypt.default.compare(req.body.password, dbOperationResult.rows[0].password);

              case 9:
                validPassword = _context.sent;

                if (validPassword) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return", res.status(400).json(_responseSchema.default.failure('Invalid username or password.', null, 400)));

              case 12:
                return _context.abrupt("return", res.status(200).json(_responseSchema.default.success('POST', req, null, "Welcome ".concat(dbOperationResult.rows[0].username), 200)));

              case 13:
                _context.next = 16;
                break;

              case 15:
                _errorHandler.default.validationError(res, result);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function signin(_x, _x2) {
        return _signin.apply(this, arguments);
      }

      return signin;
    }()
  }]);

  return SigninController;
}();

exports.default = SigninController;