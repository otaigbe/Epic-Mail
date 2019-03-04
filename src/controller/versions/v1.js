import express from 'express';
import routes from '../../router/routes';

const router = express.Router();

router.use('/api/v1', routes);
export default router;