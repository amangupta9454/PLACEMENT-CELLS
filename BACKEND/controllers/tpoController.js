import asyncHandler from '../utils/asyncHandler.js';
import Student from '../models/Student.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import ActivityLog from '../models/ActivityLog.js';
import sendEmail from '../utils/sendEmail.js';
import { jobAlertEmailTemplate, applicationEmailTemplate } from '../utils/emailTemplates.js';
import * as XLSX from 'xlsx';

// @desc    Get all students
// @route   GET /api/tpo/students
// @access  Private (TPO)
export const getStudents = asyncHandler(async (req, res) => {
  const students = await Student.find({}).select('-password');
  res.json(students);
});

// @desc    Update student status / verify manually
// @route   PUT /api/tpo/students/:id
// @access  Private (TPO)
export const updateStudentStatus = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (student) {
    student.isVerified = req.body.isVerified !== undefined ? req.body.isVerified : student.isVerified;
    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } else {
    res.status(404); throw new Error('Student not found');
  }
});

// @desc    Blacklist a student
// @route   PATCH /api/tpo/students/:id/blacklist
// @access  Private (TPO)
export const blacklistStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (student) {
    student.isBlacklisted = true;
    student.blacklistReason = req.body.reason || 'Violation of placement policies';
    student.blacklistExpiry = req.body.expiry ? new Date(req.body.expiry) : null;
    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } else {
    res.status(404); throw new Error('Student not found');
  }
});

// @desc    Unblacklist a student
// @route   PATCH /api/tpo/students/:id/unblacklist
// @access  Private (TPO)
export const unblacklistStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (student) {
    student.isBlacklisted = false;
    student.blacklistReason = '';
    student.blacklistExpiry = null;
    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } else {
    res.status(404); throw new Error('Student not found');
  }
});

// ── Helper: send job alert emails to all verified students ─────────────────────
const sendJobAlertEmails = async (job) => {
  try {
    const students = await Student.find({ isVerified: true }).select('name email').lean();
    const emailPromises = students.map((student) =>
      sendEmail({
        email: student.email,
        subject: `🚀 New Placement Drive: ${job.companyName} — ${job.role}`,
        message: `Hi ${student.name}, a new job has been posted at ${job.companyName} for the role of ${job.role}.`,
        html: jobAlertEmailTemplate(job, student),
      }).catch((err) => {
        console.error(`Failed to send job alert to ${student.email}:`, err.message);
      })
    );
    Promise.allSettled(emailPromises).then((results) => {
      const sent = results.filter(r => r.status === 'fulfilled').length;
      console.log(`📧 Job alert: ${sent}/${students.length} emails sent for '${job.companyName} — ${job.role}'`);
    });
  } catch (err) {
    console.error('Error fetching students for job alert emails:', err.message);
  }
};

// ── Helper: build job payload from request body ────────────────────────────────
const buildJobPayload = (body) => ({
  companyName: body.companyName,
  companyWebsite: body.companyWebsite || '',
  aboutCompany: body.aboutCompany || '',
  industryType: body.industryType || '',
  companyLocation: body.companyLocation || '',
  role: body.role,
  jobType: body.jobType || 'Full-Time',
  workMode: body.workMode || 'On-site',
  openings: body.openings || 1,
  location: body.location,
  package: body.ctc || body.stipend || body.package || '',
  stipend: body.stipend || '',
  ctc: body.ctc || '',
  perks: body.perks || '',
  requiredSkills: Array.isArray(body.requiredSkills)
    ? body.requiredSkills
    : (body.requiredSkills ? body.requiredSkills.split(',').map(s => s.trim()) : []),
  preferredSkills: Array.isArray(body.preferredSkills)
    ? body.preferredSkills
    : (body.preferredSkills ? body.preferredSkills.split(',').map(s => s.trim()) : []),
  programmingLanguages: Array.isArray(body.programmingLanguages)
    ? body.programmingLanguages
    : (body.programmingLanguages ? body.programmingLanguages.split(',').map(s => s.trim()) : []),
  tools: Array.isArray(body.tools)
    ? body.tools
    : (body.tools ? body.tools.split(',').map(s => s.trim()) : []),
  eligibility: {
    cgpa: parseFloat(body.eligibility?.cgpa || body.cgpa || 0),
    branch: Array.isArray(body.eligibility?.branch)
      ? body.eligibility.branch
      : (body.eligibility?.branch ? body.eligibility.branch.split(',').map(b => b.trim()) : []),
    passingYear: Array.isArray(body.eligibility?.passingYear)
      ? body.eligibility.passingYear
      : (body.eligibility?.passingYear ? body.eligibility.passingYear.split(',').map(y => y.trim()) : []),
  },
  description: body.description,
  roleOverview: body.roleOverview || '',
  responsibilities: Array.isArray(body.responsibilities)
    ? body.responsibilities
    : (body.responsibilities ? body.responsibilities.split('\n').filter(Boolean) : []),
  qualifications: Array.isArray(body.qualifications)
    ? body.qualifications
    : (body.qualifications ? body.qualifications.split('\n').filter(Boolean) : []),
  additionalInfo: body.additionalInfo || '',
  selectionRounds: Array.isArray(body.selectionRounds) ? body.selectionRounds : [],
  applicationStartDate: body.applicationStartDate ? new Date(body.applicationStartDate) : undefined,
  deadline: new Date(body.deadline || body.applicationDeadline),
  testDates: body.testDates || '',
  interviewDates: body.interviewDates || '',
  applicationMode: body.applicationMode || 'Internal Portal',
  applicationLink: body.applicationLink || '',
  visibility: body.visibility || 'Published',
  tags: Array.isArray(body.tags)
    ? body.tags
    : (body.tags ? body.tags.split(',').map(t => t.trim()) : []),
});

// @desc    Get all jobs
// @route   GET /api/tpo/jobs
// @access  Private (TPO)
export const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({}).sort({ createdAt: -1 });
  res.json(jobs);
});

// @desc    Create a job
// @route   POST /api/tpo/jobs
// @access  Private (TPO)
export const createJob = asyncHandler(async (req, res) => {
  const payload = buildJobPayload(req.body);
  const job = new Job(payload);
  const createdJob = await job.save();

  // Send job alert emails (non-blocking) only if published
  if (createdJob.visibility === 'Published') {
    sendJobAlertEmails(createdJob);
  }

  res.status(201).json(createdJob);
});

// @desc    Update a job
// @route   PUT /api/tpo/jobs/:id
// @access  Private (TPO)
export const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) { res.status(404); throw new Error('Job not found'); }

  const payload = buildJobPayload({ ...job.toObject(), ...req.body });
  Object.assign(job, payload);
  const updatedJob = await job.save();
  res.json(updatedJob);
});

// @desc    Delete a job
// @route   DELETE /api/tpo/jobs/:id
// @access  Private (TPO)
export const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);
  if (job) {
    await Application.deleteMany({ job: req.params.id });
    res.json({ message: 'Job removed' });
  } else {
    res.status(404); throw new Error('Job not found');
  }
});

// @desc    Get all applications
// @route   GET /api/tpo/applications
// @access  Private (TPO)
export const getApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({})
    .populate('student', 'name email branch cgpa resumeUrl')
    .populate('job', 'companyName role location deadline')
    .sort({ createdAt: -1 });
  res.json(applications);
});

// @desc    Update application status and notify student via email
// @route   PUT /api/tpo/applications/:id
// @access  Private (TPO)
export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const application = await Application.findById(req.params.id)
    .populate('student', 'name email')
    .populate('job', 'companyName role');

  if (!application) { res.status(404); throw new Error('Application not found'); }

  application.status = status;
  const updatedApplication = await application.save();

  await ActivityLog.create({
    userId: application.student?._id || application.student,
    action: `Status Updated: ${status}`,
    details: `Your application status for ${application.job.role} at ${application.job.companyName} was updated to ${status}.`,
    module: 'Application'
  });

  // Send status update email to student (non-blocking)
  try {
    const studentEmail = application.applicantEmail || application.student?.email;
    const studentName = application.applicantName || application.student?.name;
    if (studentEmail) {
      await sendEmail({
        email: studentEmail,
        subject: `📩 Application Update: ${application.job.companyName} — ${status}`,
        message: `Hi ${studentName}, your application status for ${application.job.role} at ${application.job.companyName} has been updated to: ${status}.`,
        html: applicationEmailTemplate(studentName, application.job.companyName, application.job.role, status),
      });
    }
  } catch (emailErr) {
    console.error('Failed to send status update email:', emailErr.message);
  }

  res.json(updatedApplication);
});

// @desc    Import jobs from Excel file
// @route   POST /api/tpo/jobs/import-excel
// @access  Private (TPO)
export const importJobsFromExcel = asyncHandler(async (req, res) => {
  if (!req.file) { res.status(400); throw new Error('No Excel file uploaded'); }

  const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });

  if (!rows.length) { res.status(400); throw new Error('Excel file is empty or has no data rows'); }

  const createdJobs = [];
  const errors = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    try {
      // Map Excel columns to Job fields (flexible column names)
      const payload = buildJobPayload({
        companyName: row['Company Name'] || row['companyName'] || '',
        companyWebsite: row['Company Website'] || row['companyWebsite'] || '',
        aboutCompany: row['About Company'] || row['aboutCompany'] || '',
        industryType: row['Industry Type'] || row['industryType'] || '',
        companyLocation: row['Company Location'] || row['companyLocation'] || '',
        role: row['Job Title'] || row['Role'] || row['role'] || '',
        jobType: row['Job Type'] || row['jobType'] || 'Full-Time',
        workMode: row['Work Mode'] || row['workMode'] || 'On-site',
        openings: parseInt(row['Openings'] || row['openings'] || '1', 10),
        location: row['Job Location'] || row['Location'] || row['location'] || '',
        stipend: row['Stipend'] || row['stipend'] || '',
        ctc: row['CTC'] || row['ctc'] || '',
        package: row['Package'] || row['package'] || row['CTC'] || row['Stipend'] || '',
        perks: row['Perks'] || row['perks'] || '',
        requiredSkills: row['Required Skills'] || row['requiredSkills'] || '',
        preferredSkills: row['Preferred Skills'] || row['preferredSkills'] || '',
        programmingLanguages: row['Programming Languages'] || row['programmingLanguages'] || '',
        tools: row['Tools'] || row['tools'] || '',
        eligibility: {
          cgpa: row['Min CGPA'] || row['cgpa'] || '0',
          branch: row['Eligible Branches'] || row['branch'] || '',
          passingYear: row['Passing Year'] || row['passingYear'] || '',
        },
        description: row['Description'] || row['description'] || row['Role Overview'] || '',
        roleOverview: row['Role Overview'] || row['roleOverview'] || '',
        responsibilities: row['Responsibilities'] || row['responsibilities'] || '',
        qualifications: row['Qualifications'] || row['qualifications'] || '',
        additionalInfo: row['Additional Info'] || row['additionalInfo'] || '',
        deadline: row['Application Deadline'] || row['Deadline'] || row['deadline'] || '',
        applicationStartDate: row['Application Start Date'] || row['applicationStartDate'] || '',
        testDates: row['Test Date'] || row['testDates'] || '',
        interviewDates: row['Interview Date'] || row['interviewDates'] || '',
        applicationMode: row['Application Mode'] || row['applicationMode'] || 'Internal Portal',
        applicationLink: row['Application Link'] || row['applicationLink'] || '',
        tags: row['Tags'] || row['tags'] || '',
        visibility: row['Visibility'] || row['visibility'] || 'Published',
      });

      if (!payload.companyName || !payload.role || !payload.deadline) {
        errors.push(`Row ${i + 2}: Missing required fields (Company Name, Job Title, Deadline)`);
        continue;
      }

      const job = new Job(payload);
      const saved = await job.save();
      createdJobs.push(saved);

      // Send job alerts for published jobs (non-blocking)
      if (saved.visibility === 'Published') {
        sendJobAlertEmails(saved);
      }
    } catch (err) {
      errors.push(`Row ${i + 2}: ${err.message}`);
    }
  }

  res.status(201).json({
    message: `Imported ${createdJobs.length} job(s) successfully.`,
    created: createdJobs.length,
    errors,
  });
});
