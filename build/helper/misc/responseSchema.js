"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var response = {};

response.success = function (method, req, resource, message, code) {
  return {
    status: code,
    data: {
      message: message,
      'request-type': method,
      url: req.originalUrl,
      resource: resource
    }
  };
};

response.failure = function (message, errorObj, code) {
  return {
    status: code,
    error: {
      message: message,
      error: errorObj
    }
  };
};

var _default = response;
exports.default = _default;