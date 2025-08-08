const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');
const Chat = require('../models/Chat');
const aiController = require('../controllers/aiController');

// All chat routes require authentication
router.use(authenticateToken);
// Proxy for AI chat POST for frontend compatibility
router.post('/send', (req, res) => aiController.processChatMessage(req, res));
// Optional additional endpoints to align with frontend chatService
router.post('/generate', (req, res) => aiController.processChatMessage(req, res));
router.post('/transport', async (req, res) => {
  // simple stub using ai to suggest
  return res.status(200).json({ success: true, recommendations: [{ mode: 'flight', reason: 'Fastest for long distance', estimate: 8000 }] });
});
router.post('/hotels', async (req, res) => {
  return res.status(200).json({ success: true, hotels: [{ name: 'City Inn', pricePerNight: 2500, rating: 4.2 }] });
});
router.post('/itinerary', async (req, res) => {
  return res.status(200).json({ success: true, itinerary: [{ time: '09:00', activity: 'Breakfast' }] });
});
router.post('/weather', async (req, res) => {
  return res.status(200).json({ success: true, weather: { temperature: 28, condition: 'Sunny', humidity: 65, windSpeed: 12 } });
});
router.post('/translate', async (req, res) => {
  const { text, targetLanguage } = req.body;
  return res.status(200).json({ success: true, translated: `[${targetLanguage}] ${text}` });
});
router.post('/emergency', async (req, res) => {
  return res.status(200).json({ success: true, message: 'Emergency services notified (simulated).' });
});

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