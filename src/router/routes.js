import express from 'express';
import user from '../resources/users';
import auth from '../resources/auth/auth';

const router = express.Router();


router.use('/auth', auth);

router.use('/users/mails', user);



export default router;
