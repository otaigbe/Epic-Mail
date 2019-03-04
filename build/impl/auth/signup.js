"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _auth = _interopRequireDefault(require("../../helper/api/v1/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signupImpl = {};

signupImpl.signup = function (req, res) {
  _auth.default.signup(req, res);
};

var _default = signupImpl;
exports.default = _default;