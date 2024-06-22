import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    // Validation
    if (!token) {
      return res.status(401).send({
        success: false,
        message: 'Not authorized user',
      });
    }

    // Verify token
    const decodeData = JWT.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decodeData._id);

    // Check if user exists
    if (!req.user) {
      return res.status(401).send({
        success: false,
        message: 'User not found',
      });
    }

    next();
  } catch (error) {
    // Handle errors
    return res.status(401).send({
      success: false,
      message: 'Invalid token or token expired',
    });
  }
};


// ADMIN AUTH
export const isAdmin = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).send({
      success: false,
      message: "admin only",
    });
  }
  next();
};
