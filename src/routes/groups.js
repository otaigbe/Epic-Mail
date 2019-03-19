import express from 'express';
import groupsController from '../controller/groups';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/', groupsController.createGroup);
router.delete('/:groupId', groupsController.deleteGroupById);
router.get('/', groupsController.getAllGroups);
router.patch('/:groupId/name', groupsController.renameAGroup);
router.post('/:groupId/users', groupsController.addUserToGroup);
router.delete('/:groupId/users/:email', groupsController.deleteUserFromParticularGroup);

export default router;
