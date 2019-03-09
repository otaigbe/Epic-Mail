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
router.post('/cloudmail', _messages.default.testingCloudMail);
router.get('/cloudmail', _messages.default.getAllSentEmailsFromCloudMailServer);
router.get('/', _messages.default.getAllReceivedEmails);
router.get('/unread', _messages.default.getAllUnreadEmails);
router.get('/sent', _messages.default.getAllSentEmails);
router.get('/:messageId', _messages.default.getMessageById);
router.delete('/:messageId', _messages.default.deleteMessageById);
var _default = router;
exports.default = _default;