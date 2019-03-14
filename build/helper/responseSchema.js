"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Response =
/*#__PURE__*/
function () {
  function Response() {
    _classCallCheck(this, Response);
  }

  _createClass(Response, null, [{
    key: "success",

    /**
    * Represents a book.
    * @constructor
    * @param {string} method - The http method.
    * @param {object} req - The request object.
    * @param {object} resource - The resource just created.
    * @param {string} message - The success message.
    * @param {integer} code - The http status code returned.
    */
    value: function success(method, req, resource, message, code) {
      return {
        status: code,
        data: {
          message: message,
          'request-type': method,
          url: req.originalUrl,
          resource: resource
        }
      };
    }
    /**
    * Represents a book.
    * @constructor
    * @param {string} message - The failure message.
    * @param {object} errorObj - The error object
    * @param {integer} code - The http status code returned.
    */

  }, {
    key: "failure",
    value: function failure(message, errorObj, code) {
      return {
        status: code,
        error: {
          message: message,
          error: errorObj
        }
      };
    }
  }]);

  return Response;
}();

exports.default = Response;