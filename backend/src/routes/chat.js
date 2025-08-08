const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');
const Chat = require('../models/Chat');

// All chat routes require authentication
router.use(authenticateToken);

// Get chat history for user
router.get('/history', async (req, res) => {
  try {
    const chat = await Chat.findOne({ 
      userId: req.user.id, 
      isActive: true 
    });

    res.status(200).json({
      success: true,
      data: {
        messages: chat ? chat.messages : [],
        chatId: chat ? chat._id : null
      }
    });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get chat history',
      error: error.message
    });
  }
});

// Clear chat history
router.delete('/history', async (req, res) => {
  try {
    await Chat.updateMany(
      { userId: req.user.id },
      { isActive: false }
    );

    res.status(200).json({
      success: true,
      message: 'Chat history cleared successfully'
    });
  } catch (error) {
    console.error('Clear chat history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear chat history',
      error: error.message
    });
  }
});

module.exports = router; 