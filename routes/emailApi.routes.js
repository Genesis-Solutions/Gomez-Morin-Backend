import express from 'express';
import sendNotification  from '../controllers/api.controllers.js';

const router = express.Router();

router.post('/', sendNotification);

export default router;