import express from 'express';
import { getAnalytics, getStudentAnalytics } from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { ROLES } from '../config/constants.js';

const router = express.Router();

// TPO Analytics Route
router.get('/', protect, authorizeRoles(ROLES.TPO), getAnalytics);

// Student Analytics Route
router.get('/student', protect, authorizeRoles(ROLES.STUDENT), getStudentAnalytics);

export default router;
