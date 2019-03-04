"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _users = _interopRequireDefault(require("../../fixtures/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customFunctions = {};

customFunctions.generateId = function () {
  var randNumber = Math.random() * 1000;
  return Math.floor(randNumber);
};

customFunctions.generateFullEmailAddress = function (username) {
  return "".concat(username, "@epicmail.com");
};

customFunctions.insertIntoStorage = function (obj) {
  _users.default.push(obj);

  return obj.id;
};

customFunctions.insertMessageIntoStorage = function (storage, obj) {
  storage.push(obj);
  return obj.id;
};

customFunctions.searchForAlreadyExistingUsername = function (obj) {
  return _users.default.find(function (element) {
    console.log(element.email);
    console.log(obj.email);

    if (element.email === obj.email) {
      return obj.email;
    }
  });
};

customFunctions.searchForUsernameAndPassword = function (obj) {
  return _users.default.find(function (element) {
    return element.email === obj.email;
  });
};

customFunctions.sendMail = function () {};

customFunctions.searchAndAddToArrayType = function (array, storage, type) {
  for (var i = 0; i < storage.length; i++) {
    if (storage[i].type === type) {
      array.push(storage[i]);
    }
  }

  return array;
};

customFunctions.searchForMessageById = function (storage, messageId) {
  return storage.find(function (element) {
    if (element.id === messageId) {
      return element;
    }
  });
};

customFunctions.searchForMessageByIdIndex = function (storage, messageId) {
  return storage.findIndex(function (element) {
    if (element.id === messageId) {
      return element;
    }
  });
};

var _default = customFunctions;
exports.default = _default;