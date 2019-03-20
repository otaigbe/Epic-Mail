import express from 'express';
import resetController from '../controller/reset';

const router = express.Router();

router.post('/', resetController.reset);

export default router;
