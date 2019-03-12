"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _auth = _interopRequireDefault(require("../../helper/api/v1/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signinImpl = {};

signinImpl.signin = function (req, res) {
  _auth.default.signin(req, res);
};

var _default = signinImpl;
exports.default = _default;