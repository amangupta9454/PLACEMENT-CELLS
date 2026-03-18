import express from 'express';
import { createFeedback, getAdminFeedbacks } from '../controllers/feedbackController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { ROLES } from '../config/constants.js';

const router = express.Router();

router.post('/', protect, authorizeRoles(ROLES.STUDENT), createFeedback);
router.get('/admin', protect, authorizeRoles(ROLES.TPO), getAdminFeedbacks);

export default router;
