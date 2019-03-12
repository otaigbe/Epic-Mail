import express from 'express';
import messagesImpl from '../impl/messages';

const router = express.Router();

router.post('/', messagesImpl.sendMail);


export default router;
