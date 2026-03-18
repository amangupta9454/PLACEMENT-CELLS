import Notification from '../models/Notification.js';
import Student from '../models/Student.js';
import { emitNotification } from '../utils/socketService.js';
import { sendPriorityAlertEmail } from '../utils/emailService.js';

export const createNotification = async (req, res) => {
  try {
    const { title, message, type, target, targetUsers, announcement } = req.body;
    
    // Create notification
    const notification = await Notification.create({
      title,
      message,
      type,
      target,
      targetUsers: target === 'specific' ? targetUsers : [],
      createdBy: req.user._id,
      announcement: announcement || false
    });

    // Real-time emit and Email dispatch for high priority
    if (type === 'high') {
      if (target === 'all') {
        const students = await Student.find({}, 'email');
        // socket emit
        emitNotification('all', 'new_notification', notification);
        
        // send emails silently in background
        students.forEach(student => {
          sendPriorityAlertEmail(student.email, title, message);
        });
      } else if (target === 'specific' && targetUsers && targetUsers.length > 0) {
        const students = await Student.find({ _id: { $in: targetUsers } }, 'email');
        
        targetUsers.forEach(userId => {
          emitNotification(userId.toString(), 'new_notification', notification);
        });

        students.forEach(student => {
          sendPriorityAlertEmail(student.email, title, message);
        });
      }
    } else {
       // normal priority socket emit only
       if (target === 'all') {
         emitNotification('all', 'new_notification', notification);
       } else if (target === 'specific' && targetUsers && targetUsers.length > 0) {
         targetUsers.forEach(userId => {
           emitNotification(userId.toString(), 'new_notification', notification);
         });
       }
    }

    res.status(201).json({ success: true, notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null;
    let query = {};

    if (userId) {
      // Fetch for student: general + specific targeting
      query = {
        $or: [
          { target: 'all' },
          { target: 'specific', targetUsers: userId }
        ]
      };
    }

    const notifications = await Notification.find(query).sort({ createdAt: -1 }).populate('createdBy', 'name email');
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const userId = req.user._id;

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { $addToSet: { readBy: userId } },
      { new: true }
    );

    res.status(200).json({ success: true, notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
