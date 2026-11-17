import express from 'express';
import * as classController from '../controllers/classController.js';
import { restrictTo, protect } from '../controllers/authController.js';

const router = express.Router();

router
  .route('/:id')
  .get(protect, classController.getClass)
  .patch(protect, restrictTo('admin'), classController.updateClass)
  .delete(protect, restrictTo('admin'), classController.deleteClass);

router
  .route('/')
  .get(classController.getAllClasses)
  .post(protect, restrictTo('admin'), classController.createClass);

export default router;
