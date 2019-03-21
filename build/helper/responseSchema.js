"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* istanbul ignore file */
var Response =
/*#__PURE__*/
function () {
  function Response() {
    _classCallCheck(this, Response);
  }

  _createClass(Response, null, [{
    key: "success",

    /**
    * @constructor
    * @param {object} token - The resource just created.
    * @param {string} message - The success message.
    * @param {string} code - The http status code returned.
    */
    value: function success(token, message, code) {
      return {
        status: code,
        message: message,
        data: {
          token: token
        }
      };
    }
  }, {
    key: "successWithEmail",
    value: function successWithEmail(token, message, code, email) {
      return {
        status: code,
        message: message,
        data: token
      };
    }
  }, {
    key: "messageSuccess",
    value: function messageSuccess(resource, code) {
      return {
        status: code,
        data: [{
          resource: resource
        }]
      };
    }
  }, {
    key: "groupSuccess",
    value: function groupSuccess(resource, message, code) {
      return {
        status: code,
        data: {
          resource: resource,
          message: message
        }
      };
    }
  }, {
    key: "responseWithResource",
    value: function responseWithResource(resource, message, code) {
      return {
        status: code,
        message: message,
        data: resource
      };
    }
  }, {
    key: "responseWithOutResource",
    value: function responseWithOutResource(message, code) {
      return {
        status: code,
        message: message
      };
    }
  }, {
    key: "groupsAll",
    value: function groupsAll(resource, message, code) {
      return {
        status: code,
        message: message,
        data: resource
      };
    }
    /**
    * @constructor
    * @param {string} message - The failure message.
    * @param {object} errorObj - The error object
    * @param {integer} code - The http status code returned.
    */

  }, {
    key: "failure",
    value: function failure(message, code) {
      return {
        status: code,
        error: {
          message: message
        }
      };
    }
  }, {
    key: "groupFailure",
    value: function groupFailure(message, code) {
      return {
        status: code,
        error: {
          message: message
        }
      };
    }
  }]);

  return Response;
}();

exports.default = Response;