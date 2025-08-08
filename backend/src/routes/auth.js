const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/auth');

// Public routes
router.post('/register', authController.register);
router.post('/signup', authController.register); // alias for frontend
router.post('/login', authController.login);

// Protected routes
router.post('/onboarding', authenticateToken, authController.completeOnboarding);
router.get('/me', authenticateToken, authController.getProfile); // alias for frontend
router.get('/profile', authenticateToken, authController.getProfile);
router.put('/profile', authenticateToken, authController.updateProfile);
router.post('/family-members', authenticateToken, authController.addFamilyMember);
router.get('/family-members', authenticateToken, authController.getFamilyMembers);

module.exports = router; 