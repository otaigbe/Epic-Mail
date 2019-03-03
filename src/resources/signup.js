import express from 'express';
import signupImpl from '../impl/auth/signup';

const router = express.Router();

router.post('/', signupImpl.signup);

export default router;
