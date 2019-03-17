import express from 'express';
import groupsController from '../controller/groups';

const router = express.Router();

router.post('/', groupsController.createGroup);


export default router;
