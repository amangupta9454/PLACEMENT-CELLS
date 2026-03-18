import bcrypt from 'bcryptjs';
import asyncHandler from '../utils/asyncHandler.js';
import Student from '../models/Student.js';
import Admin from '../models/Admin.js';
import OTP from '../models/OTP.js';
import generateToken from '../utils/generateToken.js';
import generateOTP from '../utils/otpGenerator.js';
import sendEmail from '../utils/sendEmail.js';
import { otpEmailTemplate } from '../utils/emailTemplates.js';

// @desc    Register a new student (Step 1: Send OTP)
// @route   POST /api/auth/register
// @access  Public
export const registerStudent = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const studentExists = await Student.findOne({ email });

  if (studentExists && studentExists.isVerified) {
    res.status(400);
    throw new Error('Student already exists and is verified. Please login.');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // If unverified student exists, update them, else create new
  if (studentExists && !studentExists.isVerified) {
    studentExists.name = name;
    studentExists.password = hashedPassword;
    await studentExists.save();
  } else {
    await Student.create({
      name,
      email,
      password: hashedPassword,
    });
  }

  // Generate OTP
  const otp = generateOTP();

  // Save OTP in DB
  await OTP.findOneAndDelete({ email }); // Remove old OTP if exists
  await OTP.create({
    email,
    otp,
  });

  // Send HTML Email
  try {
    await sendEmail({
      email,
      subject: '🎓 Placement Cell — Verify Your Email (OTP)',
      message: `Your OTP for Placement Cell registration is: ${otp}. Valid for 10 minutes.`,
      html: otpEmailTemplate(name, otp),
    });
    res.status(200).json({ message: 'OTP sent successfully to email' });
  } catch (error) {
    await OTP.findOneAndDelete({ email });
    console.error(error);
    res.status(500);
    throw new Error('Email could not be sent');
  }
});

// @desc    Verify OTP and activate account
// @route   POST /api/auth/verify-otp
// @access  Public
export const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const otpRecord = await OTP.findOne({ email });

  if (!otpRecord) {
    res.status(400);
    throw new Error('OTP expired or invalid');
  }

  if (otpRecord.otp !== otp) {
    res.status(400);
    throw new Error('Incorrect OTP');
  }

  const student = await Student.findOne({ email });

  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  student.isVerified = true;
  await student.save();

  // Remove OTP
  await OTP.findOneAndDelete({ email });

  res.status(200).json({
    _id: student._id,
    name: student.name,
    email: student.email,
    role: student.role,
    token: generateToken(student._id, student.role),
  });
});

// @desc    Login student
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const student = await Student.findOne({ email });

  if (student && student.isVerified && (await bcrypt.compare(password, student.password))) {
    res.json({
      _id: student._id,
      name: student.name,
      email: student.email,
      role: student.role,
      token: generateToken(student._id, student.role),
      isVerified: student.isVerified,
    });
  } else {
    res.status(401);
    throw new Error(student && !student.isVerified ? 'Account not verified. Please register to get OTP.' : 'Invalid email or password');
  }
});

// @desc    Login Admin/TPO
// @route   POST /api/auth/admin-login
// @access  Public
export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const admin = await Admin.findOne({ email });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id, admin.role),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Admin email or password');
  }
});
