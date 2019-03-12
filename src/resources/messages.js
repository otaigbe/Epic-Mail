import express from 'express';
import multer from 'multer';
import messagesImpl from '../impl/messages';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const uploads = multer({ storage });

const router = express.Router();

router.post('/', messagesImpl.sendMail);

// router.post('/cloudmail', uploads.any(), messagesImpl.testingCloudMail);

// router.get('/cloudmail', messagesImpl.getAllSentEmailsFromCloudMailServer);

router.get('/', messagesImpl.getAllReceivedEmails);

router.get('/unread', messagesImpl.getAllUnreadEmails);

router.get('/sent', messagesImpl.getAllSentEmails);

router.get('/:messageId', messagesImpl.getMessageById);

router.delete('/:messageId', messagesImpl.deleteMessageById);


export default router;
