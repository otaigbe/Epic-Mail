import express from 'express';
import groupsController from '../controller/groups';

const router = express.Router();

router.post('/', groupsController.createGroup);
router.delete('/:groupId', groupsController.deleteGroupById);
router.get('/', groupsController.getAllGroups);
router.patch('/:groupId/name', groupsController.renameAGroup);
router.post('/:groupId/users', groupsController.addUserToGroup);

export default router;
