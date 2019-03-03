import express from 'express';
import user from '../resources/users';
import auth from '../resources/auth/auth';
import messages from '../resources/messages';

const router = express.Router();


router.use('/auth', auth);
router.use('/messages', messages);
router.use('/users', user);

export default router;
