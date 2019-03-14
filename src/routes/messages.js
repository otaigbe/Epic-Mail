import express from 'express';
import messagesController from '../controller/messages';

const router = express.Router();

router.post('/', messagesController.sendMail);
router.get('/', messagesController.getAllReceivedEmails);
router.get('/unread', messagesController.getAllUnreadEmails);
router.get('/sent', messagesController.getAllSentEmails);
router.get('/:messageId', messagesController.getMessageById);
router.delete('/:messageId', messagesController.deleteMessageById);


export default router;
