import express from 'express';
import Auth from '../middleware/auth';
import signinController from '../controller/signin';
import signupController from '../controller/signup';
import messagesController from '../controller/messages';
import groupsController from '../controller/groups';
import resetController from '../controller/reset';

const router = express.Router();

router.post('/auth/signin', signinController.signin);
router.post('/auth/signup', signupController.signup);
router.post('/auth/reset', resetController.reset);
router.post('/auth/confirmreset', resetController.confirmReset);

router.get('/messages/draft', Auth.auth, messagesController.getAllDraftMessages);
router.post('/messages', Auth.auth, messagesController.sendMail);
router.get('/messages', Auth.auth, messagesController.getAllReceivedEmails);
router.get('/messages/unread', Auth.auth, messagesController.getAllUnreadEmails);
router.get('/messages/sent', Auth.auth, messagesController.getAllSentEmails);
router.get('/messages/:messageId', Auth.auth, messagesController.getMessageById);
router.delete('/messages/:messageId', Auth.auth, messagesController.deleteMessageById);
router.post('/messages/draft', Auth.auth, messagesController.createDraftMessage);
router.get('/messages/draft/:messageId', Auth.auth, messagesController.getDraftMessageById);

router.post('/groups/', Auth.auth, groupsController.createGroup);
router.delete('/groups/:groupId', Auth.auth, groupsController.deleteGroupById);
router.get('/groups/', Auth.auth, groupsController.getAllGroups);
router.patch('/groups/:groupId/name', Auth.auth, groupsController.renameAGroup);
router.post('/groups/:groupId/users', Auth.auth, groupsController.addUserToGroup);
router.delete('/groups/:groupId/users/:userId', Auth.auth, groupsController.deleteUserFromParticularGroup);
router.post('/groups/:groupId/messages', Auth.auth, groupsController.sendMailToAllMembersInAGroup);
router.get('/groups/:groupId/members', Auth.auth, groupsController.getAllMembersOfAGroup);

export default router;
