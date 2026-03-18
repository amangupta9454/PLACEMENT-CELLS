import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['normal', 'high'], default: 'normal' },
    target: { type: String, enum: ['student', 'all', 'specific'], default: 'all' },
    targetUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }], // If target is specific
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
    announcement: { type: Boolean, default: false }, // Flag to indicate if it's an announcement
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }], // Track who has read it
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
