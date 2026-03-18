import express from 'express';
import { applyForJob, getMyApplications, withdrawApplication } from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { ROLES } from '../config/constants.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Application routes are accessible by students
router.use(protect);
router.use(authorizeRoles(ROLES.STUDENT));

// Apply accepts multipart/form-data (resume optional — falls back to profile resume)
router.post('/apply', upload.single('resume'), applyForJob);
router.get('/my-applications', getMyApplications);
router.patch('/withdraw/:id', withdrawApplication);

export default router;
