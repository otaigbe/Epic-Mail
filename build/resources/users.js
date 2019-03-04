"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("../impl/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/', _users.default.sendEmail); // router.put('/:id', userImpl.modifyRequest);

router.get('/:userId', _users.default.getAllReceivedEmailsForAParticularUser); // router.get('/:id', usersImpl.getAllUnreadEmailsForAParticularUser);
// router.get('/:id', usersImpl.getAllEmailsSentByAParticularUser);
// router.get('/:userId/:emailId', usersImpl.getEmailForASpecificUser);
// router.delete('/:mailsArray', usersImpl.deleteEmail);

var _default = router;
exports.default = _default;