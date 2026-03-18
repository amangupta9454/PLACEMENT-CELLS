import asyncHandler from '../utils/asyncHandler.js';
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import Student from '../models/Student.js';
import ActivityLog from '../models/ActivityLog.js';
import sendEmail from '../utils/sendEmail.js';
import { applicationConfirmationTemplate } from '../utils/emailTemplates.js';
import upload from '../middleware/uploadMiddleware.js';
import cloudinary from '../config/cloudinary.js';

// Helper: Upload buffer to Cloudinary as raw PDF
const uploadResumeBuffer = (buffer, originalname) => {
  return new Promise((resolve, reject) => {
    const safeName = (originalname || 'resume').replace(/[^a-zA-Z0-9._-]/g, '_').replace(/\.pdf$/i, '');
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'placement_resumes',
        resource_type: 'raw',
        public_id: `${safeName}_${Date.now()}.pdf`,
        type: 'upload',
        access_mode: 'public',
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    stream.end(buffer);
  });
};

// @desc    Apply for a job (with full application form data + optional resume upload)
// @route   POST /api/applications/apply  (multipart/form-data)
// @access  Private (Student)
export const applyForJob = asyncHandler(async (req, res) => {
  const studentId = req.user._id;
  const {
    jobId,
    applicantName,
    applicantEmail,
    mobile,
    course,
    branch,
    year,
    linkedinLink,
    githubLink,
    portfolioLink,
    otherLink,
    skills,       // JSON string (array of {skill, proficiency})
    projects,     // JSON string (array of project objects)
    coverLetter,
  } = req.body;

  const job = await Job.findById(jobId);
  if (!job) { res.status(404); throw new Error('Job not found'); }

  const student = await Student.findById(studentId);

  // Check deadline
  if (new Date() > new Date(job.deadline)) {
    res.status(400); throw new Error('Deadline for this job has passed');
  }

  // Check if blacklisted
  if (student.isBlacklisted) {
    res.status(403); throw new Error(`You are blacklisted from applying: ${student.blacklistReason}`);
  }

  // Check if already applied
  const existingApplication = await Application.findOne({ student: studentId, job: jobId });
  if (existingApplication) {
    res.status(400); throw new Error('You have already applied for this job');
  }

  // Handle resume: use uploaded file, or fall back to student's stored resume
  let resumeUrl = student.resumeUrl || '';
  if (req.file) {
    try {
      const result = await uploadResumeBuffer(req.file.buffer, req.file.originalname);
      resumeUrl = result.secure_url;
    } catch (err) {
      console.error('Resume upload during application failed:', err);
      // fallback to stored resume if upload fails
    }
  }

  if (!resumeUrl) {
    res.status(400);
    throw new Error('Please upload your resume. No resume found on your profile either.');
  }

  // Parse JSON fields from form data
  let parsedSkills = [];
  let parsedProjects = [];
  try { parsedSkills = skills ? JSON.parse(skills) : []; } catch { parsedSkills = []; }
  try { parsedProjects = projects ? JSON.parse(projects) : []; } catch { parsedProjects = []; }

  // Limit projects to 3
  parsedProjects = parsedProjects.slice(0, 3);

  const application = new Application({
    student: studentId,
    job: jobId,
    applicantName: applicantName || student.name,
    applicantEmail: applicantEmail || student.email,
    mobile: mobile || '',
    course: course || '',
    branch: branch || student.branch || '',
    year: year || '',
    linkedinLink: linkedinLink || '',
    githubLink: githubLink || '',
    portfolioLink: portfolioLink || '',
    otherLink: otherLink || '',
    skills: parsedSkills,
    projects: parsedProjects,
    resumeUrl,
    coverLetter: coverLetter || '',
  });

  const createdApplication = await application.save();

  await ActivityLog.create({
    userId: studentId,
    action: 'Applied',
    details: `Applied for ${job.role} at ${job.companyName}`,
    module: 'Application'
  });

  // Send confirmation email (non-blocking)
  try {
    await sendEmail({
      email: applicantEmail || student.email,
      subject: `✅ Application Submitted — ${job.companyName} (${job.role})`,
      message: `Hi ${applicantName || student.name}, your application to ${job.companyName} for ${job.role} has been received.`,
      html: applicationConfirmationTemplate({ applicantName: applicantName || student.name, name: student.name }, job),
    });
  } catch (emailErr) {
    console.error('Failed to send application confirmation email:', emailErr.message);
  }

  res.status(201).json(createdApplication);
});

// @desc    Get my applications
// @route   GET /api/applications/my-applications
// @access  Private (Student)
export const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ student: req.user._id })
    .populate('job', 'companyName role package stipend ctc location deadline jobType workMode')
    .sort({ createdAt: -1 });

  res.json(applications);
});

// @desc    Withdraw an application
// @route   PATCH /api/applications/withdraw/:id
// @access  Private (Student)
export const withdrawApplication = asyncHandler(async (req, res) => {
  const application = await Application.findOne({ _id: req.params.id, student: req.user._id }).populate('job');
  
  if (!application) {
    res.status(404); throw new Error('Application not found');
  }

  // Business logic: Cannot withdraw if deadline matched or after shortlisting
  if (application.status !== 'Applied') {
    res.status(400); throw new Error(`Cannot withdraw application because current status is ${application.status}`);
  }

  if (new Date() > new Date(application.job.deadline)) {
    res.status(400); throw new Error('Cannot withdraw application after the job deadline');
  }

  application.status = 'Withdrawn';
  const updatedApplication = await application.save();

  await ActivityLog.create({
    userId: req.user._id,
    action: 'Withdrawn',
    details: `Withdrew application for ${application.job.role} at ${application.job.companyName}`,
    module: 'Application'
  });

  res.json(updatedApplication);
});
