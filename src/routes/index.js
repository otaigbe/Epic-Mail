import express from 'express';
import auth from './auth';
import messages from './messages';


const router = express.Router();


router.use('/auth', auth);
router.use('/messages', messages);


export default router;
