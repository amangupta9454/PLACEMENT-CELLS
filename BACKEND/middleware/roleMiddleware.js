import { ROLES } from '../config/constants.js';

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403);
      throw new Error(`Role: ${req.user ? req.user.role : 'unknown'} is not allowed to access this resource`);
    }
    next();
  };
};
