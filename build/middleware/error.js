"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(err, res) {
  res.status(501).json({
    message: 'Something went wrong!',
    error: err.message
  });
}