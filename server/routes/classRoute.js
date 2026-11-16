import express from 'express';
import * as classController from '../controllers/classController.js';
import { restrictTo, protect } from '../controllers/authController.js';

const router = express.Router();

//--------------------restricted route--------------------

//--------------------public route--------------------
router
  .route('/')
  .get(classController.getAllClasses)
  .post(protect, restrictTo('admin'), classController.createClass);

export default router;
