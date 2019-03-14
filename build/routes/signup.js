"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _signup = _interopRequireDefault(require("../controller/signup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import signupImpl from '../impl/auth/signup';
// import signupController from '../controller/auth';
var router = _express.default.Router(); // router.post('/', signupImpl.signup);


router.post('/', _signup.default.signup);
var _default = router;
exports.default = _default;