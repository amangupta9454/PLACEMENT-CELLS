import express from 'express';
import {
  getAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
} from '../controllers/announcementController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { ROLES } from '../config/constants.js';

const router = express.Router();

router.use(protect);

// Both Students and TPO can get announcements
router.get('/', getAnnouncements);

// Only TPO can create/delete
router.post('/', authorizeRoles(ROLES.TPO), createAnnouncement);
router.delete('/:id', authorizeRoles(ROLES.TPO), deleteAnnouncement);

export default router;
