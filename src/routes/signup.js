import express from 'express';
// import signupImpl from '../impl/auth/signup';
// import signupController from '../controller/auth';
import signupController from '../controller/signup';

const router = express.Router();

// router.post('/', signupImpl.signup);
router.post('/', signupController.signup);

export default router;
