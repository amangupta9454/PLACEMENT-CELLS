import ActivityLog from '../models/ActivityLog.js';

export const getActivityTimeline = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Ensure student is requesting their own timeline or TPO is requesting
    if (req.user.role === 'student' && req.user._id.toString() !== userId) {
        return res.status(403).json({ success: false, message: 'Not authorized to view this timeline' });
    }

    const timeline = await ActivityLog.find({ userId })
      .sort({ createdAt: -1 });
      
    res.status(200).json({ success: true, timeline });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
