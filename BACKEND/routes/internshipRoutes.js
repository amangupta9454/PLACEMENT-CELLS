import express from 'express';
import {
  getInternships,
  createInternship,
  updateInternship,
  deleteInternship,
} from '../controllers/internshipController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getInternships)
  .post(protect, createInternship);

router.route('/:id')
  .put(protect, updateInternship)
  .delete(protect, deleteInternship);

export default router;
