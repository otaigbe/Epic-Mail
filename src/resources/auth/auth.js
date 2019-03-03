import express from 'express';
import signup from '../signup';
import signin from '../signin';

const router = express.Router();

router.use('/signup', signup);
router.use('/signin', signin);

export default router;