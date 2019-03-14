"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// const errorHandler = {};
// /* istanbul ignore next */
// errorHandler.validationError = (res, result) => res.status(422).json({
//   status: 400,
//   error: {
//     message: 'Something wrong with input!',
//     errorObj: result.error,
//   },
// });
// export default errorHandler;
var ErrorHandler =
/*#__PURE__*/
function () {
  function ErrorHandler() {
    _classCallCheck(this, ErrorHandler);
  }

  _createClass(ErrorHandler, null, [{
    key: "validationError",
    value: function validationError(res, result) {
      return res.status(400).json({
        status: 400,
        error: {
          message: 'Something wrong with input!',
          errorObj: result.error
        }
      });
    }
  }]);

  return ErrorHandler;
}();

exports.default = ErrorHandler;