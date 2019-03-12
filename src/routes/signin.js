import express from 'express';
import signinImpl from '../impl/auth/signin';

const router = express.Router();

router.post('/', signinImpl.signin);

export default router;
