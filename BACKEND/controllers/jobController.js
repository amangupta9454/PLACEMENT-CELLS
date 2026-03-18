import asyncHandler from '../utils/asyncHandler.js';
import Job from '../models/Job.js';

// @desc    Get all jobs (with optional filters)
// @route   GET /api/jobs
// @access  Private (Student)
export const getJobs = asyncHandler(async (req, res) => {
  const { keyword, branch } = req.query;

  const query = { visibility: 'Published' };

  if (keyword) {
    query.$or = [
      { companyName: { $regex: keyword, $options: 'i' } },
      { role: { $regex: keyword, $options: 'i' } },
    ];
  }

  if (branch) {
    query['eligibility.branch'] = branch;
  }

  const jobs = await Job.find(query).sort({ createdAt: -1 });
  res.json(jobs);
});

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Private (Student)
export const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (job) {
    res.json(job);
  } else {
    res.status(404);
    throw new Error('Job not found');
  }
});
