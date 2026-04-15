import asyncHandler from '../utils/asyncHandler.js';
import Internship from '../models/Internship.js';

// @desc    Get all internships
// @route   GET /api/internships
// @access  Private (Student/Admin)
export const getInternships = asyncHandler(async (req, res) => {
  // Populate the poster's name regardless of whether it's a Student or Admin
  const internships = await Internship.find({})
    .populate('postedBy', 'name email')
    .sort({ createdAt: -1 });
  res.json(internships);
});

// @desc    Create an internship
// @route   POST /api/internships
// @access  Private (Student/Admin)
export const createInternship = asyncHandler(async (req, res) => {
  const { companyName, applyLink, role, description, experience, stipend, other } = req.body;

  // Determine user type from the auth middleware where req.user.role is set
  const isStudent = req.user.role === 'student';

  const internship = await Internship.create({
    companyName,
    applyLink,
    role,
    description,
    experience,
    stipend,
    other,
    postedBy: req.user._id,
    postedByModel: isStudent ? 'Student' : 'Admin',
  });

  const populatedInternship = await Internship.findById(internship._id).populate('postedBy', 'name email');

  res.status(201).json(populatedInternship);
});

// @desc    Update an internship
// @route   PUT /api/internships/:id
// @access  Private (Student/Admin)
export const updateInternship = asyncHandler(async (req, res) => {
  const internship = await Internship.findById(req.params.id);

  if (!internship) {
    res.status(404);
    throw new Error('Internship not found');
  }

  // Check if user is the creator OR if the user is a TPO (Admin)
  const isCreator = internship.postedBy.toString() === req.user._id.toString();
  const isAdmin = req.user.role === 'tpo';

  if (!isCreator && !isAdmin) {
    res.status(403);
    throw new Error('You do not have permission to update this listing');
  }

  const updatedInternship = await Internship.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  ).populate('postedBy', 'name email');

  res.json(updatedInternship);
});

// @desc    Delete an internship
// @route   DELETE /api/internships/:id
// @access  Private (Student/Admin)
export const deleteInternship = asyncHandler(async (req, res) => {
  const internship = await Internship.findById(req.params.id);

  if (!internship) {
    res.status(404);
    throw new Error('Internship not found');
  }

  const isCreator = internship.postedBy.toString() === req.user._id.toString();
  const isAdmin = req.user.role === 'tpo';

  if (!isCreator && !isAdmin) {
    res.status(403);
    throw new Error('You do not have permission to delete this listing');
  }

  await internship.deleteOne();
  res.json({ message: 'Internship removed' });
});
