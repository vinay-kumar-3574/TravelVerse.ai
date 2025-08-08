const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/auth');

// All user routes require authentication
router.use(authenticateToken);

router.get('/profile', authController.getProfile);
router.put('/profile', authController.updateProfile);
router.post('/family-members', authController.addFamilyMember);
router.get('/family-members', authController.getFamilyMembers);

module.exports = router; 