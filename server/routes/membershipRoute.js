import express from 'express';
import * as membershipController from '../controllers/membershipController.js';
import { restrictTo, protect } from '../controllers/authController.js';

const router = express.Router();

router
  .route('/')
  .post(protect, restrictTo('member'), membershipController.buyPlan);//self-purchase route

export default router;
