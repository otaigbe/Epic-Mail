"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-else-return */
var auth = function auth(req, res, next) {
  var token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({
      status: 'Unauthoutrized',
      message: 'No access token provided!'
    });
  }

  if (token) {
    try {
      var decoded = _jsonwebtoken.default.verify(token, process.env.SECRETKEY);

      req.user = decoded;
      next();
    } catch (error) {
      return res.status(400).send({
        status: 'Bad Request',
        message: 'Invalid Token!'
      });
    }
  }
};

var _default = auth;
exports.default = _default;