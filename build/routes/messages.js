"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _messages = _interopRequireDefault(require("../impl/messages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/', _messages.default.sendMail);
router.get('/', _messages.default.getAllReceivedEmails);
router.get('/unread', _messages.default.getAllUnreadEmails);
var _default = router;
exports.default = _default;