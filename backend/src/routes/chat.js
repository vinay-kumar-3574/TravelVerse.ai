const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');
const Chat = require('../models/Chat');
const aiController = require('../controllers/aiController');

// All chat routes require authentication
router.use(authenticateToken);

// Main chat endpoints
router.post('/send', (req, res) => aiController.processChatMessage(req, res));
router.get('/history', (req, res) => aiController.getChatHistory(req, res));
router.delete('/history', (req, res) => aiController.clearChatHistory(req, res));

// AI agent specific endpoints
router.get('/memory', (req, res) => aiController.getUserMemory(req, res));
router.post('/multi-turn', (req, res) => aiController.processMultiTurnConversation(req, res));

// Enhanced AI-powered endpoints (replacing stubs)
router.post('/transport', async (req, res) => {
  try {
    const { tripInfo, preferences } = req.body;
    
    // Use AI agent to get transport recommendations
    const response = await aiController.aiAgent.handleTransport(
      req.user.id, 
      `Recommend transport for trip from ${tripInfo.source} to ${tripInfo.destination}`,
      { tripInfo, preferences }
    );
    
    res.status(200).json({
      success: true,
      recommendations: response.metadata?.recommendations || [],
      reasoning: response.content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get transport recommendations',
      error: error.message
    });
  }
});

router.post('/hotels', async (req, res) => {
  try {
    const { tripInfo, preferences } = req.body;
    
    // Use AI agent to get hotel recommendations
    const response = await aiController.aiAgent.handleHotel(
      req.user.id,
      `Recommend hotels for trip to ${tripInfo.destination}`,
      { tripInfo, preferences }
    );
    
    res.status(200).json({
      success: true,
      hotels: response.metadata?.hotels || [],
      reasoning: response.content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get hotel recommendations',
      error: error.message
    });
  }
});

router.post('/itinerary', async (req, res) => {
  try {
    const { tripInfo, days = 1 } = req.body;
    
    // Use AI agent to generate itinerary
    const response = await aiController.aiAgent.handleTripPlanning(
      req.user.id,
      `Create a ${days}-day itinerary for trip to ${tripInfo.destination}`,
      { tripInfo, days }
    );
    
    res.status(200).json({
      success: true,
      itinerary: response.metadata?.itinerary || [],
      content: response.content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate itinerary',
      error: error.message
    });
  }
});

router.post('/weather', async (req, res) => {
  try {
    const { location, date } = req.body;
    
    // Use AI agent to get weather information
    const response = await aiController.aiAgent.handleDashboard(
      req.user.id,
      `Get weather information for ${location} on ${date}`,
      { location, date }
    );
    
    res.status(200).json({
      success: true,
      weather: response.metadata?.weather || {},
      content: response.content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get weather information',
      error: error.message
    });
  }
});

router.post('/translate', async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;
    
    // Use AI agent for translation
    const response = await aiController.aiAgent.handleTranslation(
      req.user.id,
      `Translate "${text}" to ${targetLanguage}`,
      { text, targetLanguage }
    );
    
    res.status(200).json({
      success: true,
      translated: response.metadata?.translated || text,
      content: response.content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to translate text',
      error: error.message
    });
  }
});

router.post('/emergency', async (req, res) => {
  try {
    const { location, emergencyType } = req.body;
    
    // Use AI agent for emergency assistance
    const response = await aiController.aiAgent.handleSOS(
      req.user.id,
      `Emergency assistance needed: ${emergencyType} in ${location}`,
      { location, emergencyType }
    );
    
    res.status(200).json({
      success: true,
      assistance: response.metadata?.assistance || {},
      content: response.content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to process emergency request',
      error: error.message
    });
  }
});

module.exports = router; 