import express from 'express';
import auth from '../routes/auth/auth';


const router = express.Router();


router.use('/auth', auth);


export default router;
