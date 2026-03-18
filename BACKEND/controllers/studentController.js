import asyncHandler from '../utils/asyncHandler.js';
import Student from '../models/Student.js';
import cloudinary from '../config/cloudinary.js';

// @desc    Get student profile
// @route   GET /api/students/profile
// @access  Private (Student)
export const getProfile = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.user._id).select('-password');
  if (student) {
    res.json(student);
  } else {
    res.status(404); throw new Error('Student not found');
  }
});

// @desc    Update student profile (all sections)
// @route   PUT /api/students/update
// @access  Private (Student)
export const updateProfile = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.user._id);
  if (!student) { res.status(404); throw new Error('Student not found'); }

  const {
    name, branch, cgpa, skills,
    mobile, course, year,
    linkedinLink, githubLink, portfolioLink, otherLink,
    projects, qualifications, experiences, achievements, responsibilities,
  } = req.body;

  if (name !== undefined) student.name = name;
  if (branch !== undefined) student.branch = branch;
  if (cgpa !== undefined) student.cgpa = cgpa;
  if (mobile !== undefined) student.mobile = mobile;
  if (course !== undefined) student.course = course;
  if (year !== undefined) student.year = year;
  if (linkedinLink !== undefined) student.linkedinLink = linkedinLink;
  if (githubLink !== undefined) student.githubLink = githubLink;
  if (portfolioLink !== undefined) student.portfolioLink = portfolioLink;
  if (otherLink !== undefined) student.otherLink = otherLink;

  // Skills — accept [{skill, proficiency}] array OR comma-separated string (legacy)
  if (skills !== undefined) {
    if (Array.isArray(skills)) {
      student.skills = skills;
    } else if (typeof skills === 'string') {
      student.skills = skills.split(',').map(s => ({ skill: s.trim(), proficiency: 'Intermediate' })).filter(x => x.skill);
    }
  }

  // Arrays — accept parsed arrays directly
  if (projects !== undefined) student.projects = Array.isArray(projects) ? projects.slice(0, 10) : [];
  if (qualifications !== undefined) student.qualifications = Array.isArray(qualifications) ? qualifications : [];
  if (experiences !== undefined) student.experiences = Array.isArray(experiences) ? experiences : [];
  if (achievements !== undefined) student.achievements = Array.isArray(achievements) ? achievements : [];
  if (responsibilities !== undefined) student.responsibilities = Array.isArray(responsibilities) ? responsibilities : [];

  const updatedStudent = await student.save();
  const { password: _, ...studentData } = updatedStudent.toObject();
  res.json(studentData);
});

// @desc    Upload resume (PDF only → stored as raw on Cloudinary so it opens as PDF)
// @route   POST /api/students/upload-resume
// @access  Private (Student)
export const uploadResume = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.user._id);
  if (!student) { res.status(404); throw new Error('Student not found'); }
  if (!req.file) { res.status(400); throw new Error('No file uploaded'); }

  try {
    const uploadToCloudinary = (buffer, originalname) => {
      return new Promise((resolve, reject) => {
        const safeName = (originalname || 'resume').replace(/[^a-zA-Z0-9._-]/g, '_').replace(/\.pdf$/i, '');
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'placement_resumes',
            resource_type: 'raw',         // 'raw' ensures file served as-is (PDF MIME type preserved)
            public_id: `${safeName}_${Date.now()}.pdf`, // .pdf suffix forces correct content-type
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

    const result = await uploadToCloudinary(req.file.buffer, req.file.originalname);
    student.resumeUrl = result.secure_url;
    await student.save();

    res.json({
      message: 'Resume uploaded successfully',
      resumeUrl: student.resumeUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500); throw new Error('Resume upload failed. Please check Cloudinary configuration.');
  }
});
