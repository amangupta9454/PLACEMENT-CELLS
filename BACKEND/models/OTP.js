import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: '10m', // The document will be automatically deleted after 10 minutes
    },
  }
);

const OTP = mongoose.model('OTP', otpSchema);

export default OTP;
