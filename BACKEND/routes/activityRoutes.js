import express from 'express';
import { getActivityTimeline } from '../controllers/activityController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:userId', protect, getActivityTimeline);

export default router;
