import express from 'express';
import auth from './auth';
import messages from './messages';
import groups from './groups';

const router = express.Router();


router.use('/auth', auth);
router.use('/messages', messages);
router.use('/groups', groups);

export default router;
