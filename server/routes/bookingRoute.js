import express from 'express';
import * as bookingController from '../controllers/bookingController.js';
import { restrictTo, protect } from '../controllers/authController.js';

const router = express.Router();

router
  .route('/')
  .get(protect,bookingController.getMyBooking)
  .post(protect, restrictTo('member'), bookingController.bookingClass);

router.patch('/:id/cancel',protect,bookingController.cancelBooking)
export default router;
