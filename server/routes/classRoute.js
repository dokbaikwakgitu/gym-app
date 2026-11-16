import express from 'express';
import * as classController from '../controllers/classController.js';

const router = express.Router();

//--------------------public route--------------------
router.route('/').get(classController.getAllClasses);

export default router;
