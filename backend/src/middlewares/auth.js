const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET; // Use the same secret that signs the token
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Get user from database

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    // Add user to request object
    req.user = {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      isOnboarded: user.isOnboarded
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

module.exports = {
  authenticateToken
}; 