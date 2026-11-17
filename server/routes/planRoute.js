import express from 'express';
import * as planController from '../controllers/planController.js';
import { restrictTo, protect } from '../controllers/authController.js';

const router = express.Router();

router.route('/').post(protect, restrictTo('admin'), planController.createPlan);

export default router;
