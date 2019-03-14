"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _signup = _interopRequireDefault(require("./signup"));

var _signin = _interopRequireDefault(require("./signin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.use('/signup', _signup.default);
router.use('/signin', _signin.default);
var _default = router;
exports.default = _default;