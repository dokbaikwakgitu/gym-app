import express from 'express';
import * as bookingController from '../controllers/bookingController.js';
import { restrictTo, protect } from '../controllers/authController.js';

const router = express.Router();

router
  .route('/')
  .post(protect, restrictTo('member'), bookingController.bookingClass);

export default router;
