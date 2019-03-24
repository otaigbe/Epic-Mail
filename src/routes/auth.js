import express from 'express';
import signup from './signup';
import signin from './signin';
import reset from './reset';

const router = express.Router();

router.use('/signup', signup);
router.use('/signin', signin);
router.use('/reset', reset);

export default router;
