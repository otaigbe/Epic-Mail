import express from 'express';
import signinController from '../controller/signin';

const router = express.Router();

router.post('/', signinController.signin);

export default router;
