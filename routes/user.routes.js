import express from 'express';
import { userController } from '../controllers/user.controllers.js';

const router = express.Router();

router.get('/', userController.findAll.bind(userController));
router.get('/:id', userController.findById.bind(userController));
router.post('/', userController.create.bind(userController));
router.put('/:id', userController.updateById.bind(userController));
router.delete('/:id', userController.deleteById.bind(userController));

export default router;