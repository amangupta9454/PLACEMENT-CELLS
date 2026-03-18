import express from 'express';
import { registerStudent, verifyOTP, login, adminLogin } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerStudent);
router.post('/verify-otp', verifyOTP);
router.post('/login', login);
router.post('/admin-login', adminLogin);

export default router;
