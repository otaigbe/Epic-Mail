"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _users = _interopRequireDefault(require("../fixtures/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UsefulFunctions =
/*#__PURE__*/
function () {
  function UsefulFunctions() {
    _classCallCheck(this, UsefulFunctions);
  }

  _createClass(UsefulFunctions, null, [{
    key: "generateId",
    value: function generateId() {
      var randNumber = Math.random() * 1000;
      return Math.floor(randNumber);
    }
  }, {
    key: "generateFullEmailAddress",
    value: function generateFullEmailAddress(username) {
      return "".concat(username, "@epicmail.com");
    }
  }, {
    key: "insertIntoStorage",
    value: function insertIntoStorage(obj) {
      _users.default.push(obj);

      return obj.id;
    }
  }, {
    key: "insertMessageIntoStorage",
    value: function insertMessageIntoStorage(storage, obj) {
      storage.push(obj);
      return obj.id;
    }
  }, {
    key: "searchForAlreadyExistingUsername",
    value: function searchForAlreadyExistingUsername(obj) {
      return _users.default.find(function (element) {
        if (element.email === obj.email) {
          return obj.email;
        }
      });
    }
  }, {
    key: "searchForUsernameAndPassword",
    value: function searchForUsernameAndPassword(obj) {
      return _users.default.find(function (element) {
        return element.email === obj.email;
      });
    }
  }, {
    key: "searchAndAddToArrayType",
    value: function searchAndAddToArrayType(array, storage, type) {
      for (var i = 0; i < storage.length; i++) {
        if (storage[i].type === type) {
          array.push(storage[i]);
        }
      }

      return array;
    }
  }, {
    key: "searchForMessageById",
    value: function searchForMessageById(storage, messageId) {
      return storage.find(function (element) {
        if (element.id === messageId) {
          return element;
        }
      });
    }
  }, {
    key: "searchForMessageByIdIndex",
    value: function searchForMessageByIdIndex(storage, messageId) {
      return storage.findIndex(function (element) {
        if (element.id === messageId) {
          return element;
        }
      });
    }
  }]);

  return UsefulFunctions;
}();

exports.default = UsefulFunctions;