import express from 'express';
import messagesController from '../controller/messages';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/', auth, messagesController.sendMail);
router.get('/', auth, messagesController.getAllReceivedEmails);
router.get('/unread', auth, messagesController.getAllUnreadEmails);
router.get('/sent', auth, messagesController.getAllSentEmails);
router.get('/:messageId', auth, messagesController.getMessageById);
router.delete('/:messageId', auth, messagesController.deleteMessageById);


export default router;
