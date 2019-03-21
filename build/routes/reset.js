"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _reset = _interopRequireDefault(require("../controller/reset"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/', _reset.default.reset);
router.post('/confirmreset', _reset.default.confirmReset);
var _default = router;
exports.default = _default;