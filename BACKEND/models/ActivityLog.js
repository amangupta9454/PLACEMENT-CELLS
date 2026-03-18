import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    action: { type: String, required: true, trim: true },
    details: { type: mongoose.Schema.Types.Mixed }, // Arbitrary data for more context (e.g. jobId, application status)
  },
  { timestamps: true } // Creates createdAt for the timeline
);

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);
export default ActivityLog;
