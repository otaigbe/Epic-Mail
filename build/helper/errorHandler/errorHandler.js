"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var errorHandler = {};
/* istanbul ignore next */

errorHandler.validationError = function (res, result) {
  return res.status(422).json({
    status: 422,
    error: {
      message: 'Something wrong with input!',
      errorObj: result.error
    }
  });
};

var _default = errorHandler;
exports.default = _default;