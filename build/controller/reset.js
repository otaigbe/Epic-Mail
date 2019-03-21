"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _schema = _interopRequireDefault(require("../helper/schema"));

var _errorHandler = _interopRequireDefault(require("../helper/errorHandler"));

var _responseSchema = _interopRequireDefault(require("../helper/responseSchema"));

var _dbHelper = _interopRequireDefault(require("../model/dbHelper"));

var _queries = _interopRequireDefault(require("../model/queries"));

var _mail = _interopRequireDefault(require("../helper/mail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ResetController =
/*#__PURE__*/
function () {
  function ResetController() {
    _classCallCheck(this, ResetController);
  }

  _createClass(ResetController, null, [{
    key: "reset",

    /**
     * This sends the mail with the link for password resetting
     * @param {Object} req - client request Object
     * @param {Object} res - Server response Object
     * @returns {JSON} Success or failure message including additional data
     */
    value: function () {
      var _reset = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var result, args, dbOperationResult, alternate, user, token, url, mailObj, options, mailResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                result = _joi.default.validate(req.body, _schema.default.resetSchema);

                if (!(result.error === null)) {
                  _context.next = 21;
                  break;
                }

                args = [req.body.email];
                _context.next = 5;
                return _dbHelper.default.performTransactionalQuery(_queries.default.searchForUser, args);

              case 5:
                dbOperationResult = _context.sent;

                if (!(dbOperationResult.rowCount > 0)) {
                  _context.next = 20;
                  break;
                }

                alternate = dbOperationResult.rows[0].alternateemail;
                user = {};
                user.id = dbOperationResult.rows[0].userid;
                user.username = dbOperationResult.rows[0].username;
                user.email = dbOperationResult.rows[0].email;
                token = _jsonwebtoken.default.sign(user, process.env.SECRETKEY);
                url = "https://otaigbe.github.io/Epic-Mail/UI/passwordReset.html?token=".concat(token);
                mailObj = _nodemailer.default.createTransport(_mail.default.transportOptions());
                options = _mail.default.mailOptions(url, alternate);
                _context.next = 18;
                return mailObj.sendMail(options);

              case 18:
                mailResponse = _context.sent;
                return _context.abrupt("return", res.status(200).json({
                  status: 200,
                  data: mailResponse.info,
                  message: 'Mail sent successfully'
                }));

              case 20:
                return _context.abrupt("return", res.status(404).json(_responseSchema.default.failure('User was not found', 404)));

              case 21:
                _errorHandler.default.validationError(res, result);

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function reset(_x, _x2) {
        return _reset.apply(this, arguments);
      }

      return reset;
    }()
  }, {
    key: "confirmReset",
    value: function () {
      var _confirmReset = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var result, token, decoded, args, dbOperationResult;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                result = _joi.default.validate(req.body, _schema.default.newpass);

                if (!(result.error === null)) {
                  _context2.next = 20;
                  break;
                }

                if (!(req.body.password !== req.body.confirmpassword)) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return", res.json({
                  message: 'verify your password'
                }));

              case 4:
                token = req.header('token');
                _context2.prev = 5;
                decoded = _jsonwebtoken.default.verify(token, process.env.SECRETKEY);
                args = [req.body.password, decoded.email, decoded.id];
                _context2.next = 10;
                return _dbHelper.default.performTransactionalQuery(_queries.default.updatePassword, args);

              case 10:
                dbOperationResult = _context2.sent;

                if (!(dbOperationResult.rowCount === 1)) {
                  _context2.next = 13;
                  break;
                }

                return _context2.abrupt("return", res.status(200).json({
                  status: 'Success',
                  data: {
                    message: 'password updated successfully'
                  }
                }));

              case 13:
                _context2.next = 18;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](5);
                return _context2.abrupt("return", res.status(400).json({
                  message: 'Invalid Token'
                }));

              case 18:
                _context2.next = 21;
                break;

              case 20:
                _errorHandler.default.validationError(res, result);

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[5, 15]]);
      }));

      function confirmReset(_x3, _x4) {
        return _confirmReset.apply(this, arguments);
      }

      return confirmReset;
    }()
  }]);

  return ResetController;
}();

exports.default = ResetController;