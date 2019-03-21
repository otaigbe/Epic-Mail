"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _groups = _interopRequireDefault(require("../controller/groups"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/', _auth.default, _groups.default.createGroup);
router.delete('/:groupId', _auth.default, _groups.default.deleteGroupById);
router.get('/', _auth.default, _groups.default.getAllGroups);
router.patch('/:groupId/name', _auth.default, _groups.default.renameAGroup);
router.post('/:groupId/users', _auth.default, _groups.default.addUserToGroup);
router.delete('/:groupId/users/:userId', _auth.default, _groups.default.deleteUserFromParticularGroup);
router.post('/:groupId/messages', _auth.default, _groups.default.sendMailToAllMembersInAGroup);
var _default = router;
exports.default = _default;