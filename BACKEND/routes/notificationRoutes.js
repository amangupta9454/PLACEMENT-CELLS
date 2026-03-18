import express from 'express';
import { createNotification, getNotifications, markAsRead } from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { ROLES } from '../config/constants.js';

const router = express.Router();

router.post('/create', protect, authorizeRoles(ROLES.TPO), createNotification);
router.get('/', protect, getNotifications);
router.patch('/read/:id', protect, markAsRead);

export default router;
