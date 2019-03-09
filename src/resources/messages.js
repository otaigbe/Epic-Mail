import express from 'express';
import messagesImpl from '../impl/messages';

const router = express.Router();

router.post('/', messagesImpl.sendMail);

router.post('/cloudmail', messagesImpl.testingCloudMail);

router.get('/cloudmail', messagesImpl.getAllSentEmailsFromCloudMailServer);

router.get('/', messagesImpl.getAllReceivedEmails);

router.get('/unread', messagesImpl.getAllUnreadEmails);

router.get('/sent', messagesImpl.getAllSentEmails);

router.get('/:messageId', messagesImpl.getMessageById);

router.delete('/:messageId', messagesImpl.deleteMessageById);


export default router;
