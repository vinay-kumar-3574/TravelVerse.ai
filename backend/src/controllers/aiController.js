const TravelVerseAgent = require('../../../AI-agent/agent');
const Chat = require('../models/Chat');
const Trip = require('../models/Trip');
const User = require('../models/User');

class AIController {
  constructor() {
    this.aiAgent = new TravelVerseAgent(); // Main AI agent instance
  }

  /**
   * Handle incoming chat messages
   */
  async processChatMessage(req, res) {
    try {
      const { message, userId: bodyUserId, tripId, familyMembers = [] } = req.body;
      const userId = req.user?.id || bodyUserId;

      if (!message || !userId) {
        return res.status(400).json({
          success: false,
          message: 'Message and userId are required'
        });
      }

      // Find active chat session or create new
      let chat = await Chat.findOne({ userId, isActive: true });
      if (!chat) {
        chat = new Chat({ userId, tripId, messages: [] });
      }

      // Fetch user profile for context
      const user = await User.findById(userId);

      // Build AI context
      const context = {
        tripId: chat.tripId,
        familyMembers,
        userProfile: user
          ? {
              name: user.name,
              email: user.email,
              preferences: user.preferences || {},
              location: user.location || null
            }
          : null,
        currentTrip: chat.tripId ? await Trip.findById(chat.tripId) : null,
        conversationHistory: chat.messages.slice(-10) // Last 10 messages
      };

      // Save user message
      await chat.addMessage('user', message);

      // Get AI response
      const aiResponse = await this.aiAgent.processMessage(userId, message, context);

      // Save AI message
      await chat.addMessage('assistant', aiResponse.content, {
        intent: aiResponse.intent,
        entities: aiResponse.entities,
        metadata: aiResponse.metadata
      });

      // Update trip if AI provided new trip data
      if (aiResponse.metadata?.tripData) {
        chat.tripId = aiResponse.metadata.tripData._id;
      }

      await chat.save();

      res.status(200).json({
        success: true,
        data: {
          response: aiResponse.content,
          intent: aiResponse.intent,
          entities: aiResponse.entities,
          metadata: aiResponse.metadata,
          chatId: chat._id
        }
      });

    } catch (error) {
      console.error('Chat processing error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to process message',
        error: error.message
      });
    }
  }

  /**
   * Get user's chat history and AI memory
   */
  async getChatHistory(req, res) {
    try {
      const { userId } = req.params;
      const currentUserId = req.user?.id || userId;

      const chat = await Chat.findOne({ userId: currentUserId, isActive: true });

      if (!chat) {
        return res.status(200).json({
          success: true,
          data: { messages: [], memory: null }
        });
      }

      const memory = await this.aiAgent.memoryManager.getUserMemory(currentUserId);

      res.status(200).json({
        success: true,
        data: {
          messages: chat.messages,
          chatId: chat._id,
          memory,
          tripContext: chat.tripId ? await Trip.findById(chat.tripId) : null
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
  }

  /**
   * Clear chat history and AI memory for the user
   */
  async clearChatHistory(req, res) {
    try {
      const userId = req.user?.id;

      await Chat.updateMany({ userId }, { isActive: false });
      await this.aiAgent.memoryManager.clearUserMemory(userId);

      res.status(200).json({
        success: true,
        message: 'Chat history and memory cleared successfully'
      });

    } catch (error) {
      console.error('Clear chat history error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to clear chat history',
        error: error.message
      });
    }
  }

  /**
   * Get only AI memory for the user
   */
  async getUserMemory(req, res) {
    try {
      const userId = req.user?.id;
      const memory = await this.aiAgent.memoryManager.getUserMemory(userId);

      res.status(200).json({
        success: true,
        data: {
          memory,
          conversationState: memory?.conversationState || {},
          recentInteractions: memory?.recentMessages || []
        }
      });

    } catch (error) {
      console.error('Get user memory error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get user memory',
        error: error.message
      });
    }
  }

  /**
   * Process multi-turn conversations at once
   */
  async processMultiTurnConversation(req, res) {
    try {
      const { messages, userId } = req.body;
      const currentUserId = req.user?.id || userId;

      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Messages array is required'
        });
      }

      const response = await this.aiAgent.handleMultiTurnConversation(
        currentUserId,
        messages
      );

      res.status(200).json({
        success: true,
        data: {
          response: response.content,
          type: response.type,
          metadata: response.metadata
        }
      });

    } catch (error) {
      console.error('Multi-turn conversation error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to process multi-turn conversation',
        error: error.message
      });
    }
  }
}

module.exports = new AIController();
