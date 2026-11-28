import express from 'express';
import * as enquiryController from '../controllers/enquiryController.js';
import { restrictTo, protect } from '../controllers/authController.js';

const router = express.Router();

router.route('/').post(enquiryController.postEnquiry);

export default router;
