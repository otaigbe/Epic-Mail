"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _messages = _interopRequireDefault(require("../controller/messages"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/', _auth.default, _messages.default.sendMail);
router.get('/', _auth.default, _messages.default.getAllReceivedEmails);
router.get('/unread', _auth.default, _messages.default.getAllUnreadEmails);
router.get('/sent', _auth.default, _messages.default.getAllSentEmails);
router.get('/:messageId', _auth.default, _messages.default.getMessageById);
router.delete('/:messageId', _auth.default, _messages.default.deleteMessageById);
var _default = router;
exports.default = _default;