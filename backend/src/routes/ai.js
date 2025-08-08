const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { authenticateToken } = require('../middlewares/auth');

// AI chat routes
router.post('/chat', authenticateToken, aiController.processChatMessage);
router.get('/chat/:userId', authenticateToken, aiController.getChatHistory);

module.exports = router; 