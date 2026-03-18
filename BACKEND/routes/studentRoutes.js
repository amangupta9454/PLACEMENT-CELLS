import express from 'express';
import { getProfile, updateProfile, uploadResume } from '../controllers/studentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { ROLES } from '../config/constants.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// All routes here require student authorization
router.use(protect);
router.use(authorizeRoles(ROLES.STUDENT));

router.get('/profile', getProfile);
router.put('/update', updateProfile);
router.post('/upload-resume', upload.single('resume'), uploadResume);

export default router;
