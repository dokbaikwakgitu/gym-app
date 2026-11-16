// get a single user by id
import express from 'express';
import * as userController from '../controllers/userController.js';
import { protect, restrictTo } from '../controllers/authController.js';

const router = express.Router();

//--------------------PROTECTED ROUTE--------------------
router.get('/me', protect, userController.getMe);

router.route('/:id').get(protect, restrictTo('admin'), userController.getUser);

export default router;
