import asyncHandler from '../utils/asyncHandler.js';
import Announcement from '../models/Announcement.js';

// @desc    Get all announcements
// @route   GET /api/announcements
// @access  Private
export const getAnnouncements = asyncHandler(async (req, res) => {
  const announcements = await Announcement.find({})
    .populate('createdBy', 'name')
    .sort({ createdAt: -1 });
  res.json(announcements);
});

// @desc    Create an announcement
// @route   POST /api/announcements
// @access  Private (TPO)
export const createAnnouncement = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const announcement = new Announcement({
    title,
    content,
    createdBy: req.user._id,
  });

  const createdAnnouncement = await announcement.save();
  // populate createdBy for immediate return
  await createdAnnouncement.populate('createdBy', 'name');
  res.status(201).json(createdAnnouncement);
});

// @desc    Delete an announcement
// @route   DELETE /api/announcements/:id
// @access  Private (TPO)
export const deleteAnnouncement = asyncHandler(async (req, res) => {
  const announcement = await Announcement.findByIdAndDelete(req.params.id);

  if (announcement) {
    res.json({ message: 'Announcement removed' });
  } else {
    res.status(404);
    throw new Error('Announcement not found');
  }
});
