import express from 'express';
import { getJobs, getJobById } from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { ROLES } from '../config/constants.js';

const router = express.Router();

// Jobs are accessible by students
router.use(protect);
router.use(authorizeRoles(ROLES.STUDENT));

router.get('/', getJobs);
router.get('/:id', getJobById);

export default router;
