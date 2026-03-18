import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import Student from '../models/Student.js';
import Admin from '../models/Admin.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // We attach the user to req.user based on decoded role
      if (decoded.role === 'student') {
        req.user = await Student.findById(decoded.id).select('-password');
      } else if (decoded.role === 'tpo') {
        req.user = await Admin.findById(decoded.id).select('-password');
      }

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});
