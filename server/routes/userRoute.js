// get a single user by id
import express from 'express';
import * as userController from '../controllers/userController.js';
import { protect } from '../controllers/authController.js';

const router = express.Router();


//--------------------PROTECTED ROUTE--------------------
router.get('/me', protect, userController.getMe);

export default router;
