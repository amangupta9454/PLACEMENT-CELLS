import Feedback from '../models/Feedback.js';

export const createFeedback = async (req, res) => {
  try {
    const { jobId, rating, comments } = req.body;
    
    // Check if feedback already exists for this job by this student
    const existing = await Feedback.findOne({ studentId: req.user._id, jobId });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Feedback already submitted for this job.' });
    }

    const feedback = await Feedback.create({
      studentId: req.user._id,
      jobId,
      rating,
      comments
    });

    res.status(201).json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminFeedbacks = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const feedbacks = await Feedback.find({})
      .populate('studentId', 'name email branch')
      .populate('jobId', 'companyName role')
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(200).json({ success: true, feedbacks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
