import express from 'express';
import groupsController from '../controller/groups';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/', auth, groupsController.createGroup);
router.delete('/:groupId', auth, groupsController.deleteGroupById);
router.get('/', auth, groupsController.getAllGroups);
router.patch('/:groupId/name', auth, groupsController.renameAGroup);
router.post('/:groupId/users', auth, groupsController.addUserToGroup);
router.delete('/:groupId/users/:userId', auth, groupsController.deleteUserFromParticularGroup);
router.post('/:groupId/messages', auth, groupsController.sendMailToAllMembersInAGroup);

export default router;
