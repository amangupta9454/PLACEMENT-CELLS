import sendEmail from './sendEmail.js';
import { alertEmailTemplate } from './emailTemplates.js';

export const sendPriorityAlertEmail = async (email, title, message) => {
  try {
    const htmlContent = alertEmailTemplate(title, message);
    await sendEmail({
      email,
      subject: `🚨 Priority Alert: ${title}`,
      message,
      html: htmlContent
    });
  } catch (error) {
    console.error('Error sending priority alert email:', error);
  }
};
