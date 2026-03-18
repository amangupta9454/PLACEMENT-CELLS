import express from 'express';
import {
  getStudents,
  updateStudentStatus,
  getJobs,
  createJob,
  updateJob,
  deleteJob,
  getApplications,
  updateApplicationStatus,
  importJobsFromExcel,
  blacklistStudent,
  unblacklistStudent,
} from '../controllers/tpoController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { ROLES } from '../config/constants.js';
import excelUpload from '../middleware/excelUploadMiddleware.js';

const router = express.Router();

// All routes here require TPO authorization
router.use(protect);
router.use(authorizeRoles(ROLES.TPO));

// Student Management
router.route('/students').get(getStudents);
router.route('/students/:id').put(updateStudentStatus);
router.route('/students/:id/blacklist').patch(blacklistStudent);
router.route('/students/:id/unblacklist').patch(unblacklistStudent);

// Job Management
router.route('/jobs').get(getJobs).post(createJob);
router.post('/jobs/import-excel', excelUpload.single('excel'), importJobsFromExcel);
router.route('/jobs/:id').put(updateJob).delete(deleteJob);

// Application Management
router.route('/applications').get(getApplications);
router.route('/applications/:id').put(updateApplicationStatus);

export default router;
