import express from 'express';
import auth from '../routes/auth/auth';
import messages from '../routes/messages';


const router = express.Router();


router.use('/auth', auth);
router.use('/messages', messages);


export default router;
