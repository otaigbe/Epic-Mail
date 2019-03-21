import express from 'express';
import resetController from '../controller/reset';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/', resetController.reset);
router.post('/confirmreset', resetController.confirmReset);

export default router;
