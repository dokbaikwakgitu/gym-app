import express from 'express';
import * as locationContoller from '../controllers/locationController.js';
import { restrictTo, protect } from '../controllers/authController.js';

const router = express.Router();

router
  .route('/')
  .post(protect, restrictTo('admin'), locationContoller.createLocation);

export default router;
