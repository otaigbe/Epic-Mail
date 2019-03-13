import express from 'express';
import messagesImpl from '../impl/messages';

const router = express.Router();

router.post('/', messagesImpl.sendMail);
router.get('/', messagesImpl.getAllReceivedEmails);


export default router;
