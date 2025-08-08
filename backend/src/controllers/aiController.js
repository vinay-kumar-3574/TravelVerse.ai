const TripPlanner = require('../../AI-agent/pipelines/tripPlanner');
const BookingAgent = require('../../AI-agent/pipelines/bookingAgent');
const { createChatCompletion } = require('../../AI-agent/ai-config');
const Chat = require('../models/Chat');
const Trip = require('../models/Trip');

class AIController {
  constructor() {
    this.tripPlanner = new TripPlanner();
    this.bookingAgent = new BookingAgent();
  }

  // Process chat message
  async processChatMessage(req, res) {
    try {
      const { message, userId: bodyUserId, tripId } = req.body;

      const userId = req.user?.id || bodyUserId;
      if (!message || !userId) {
        return res.status(400).json({
          success: false,
          message: 'Message and userId are required'
        });
      }

      // Get or create chat session
      let chat = await Chat.findOne({ 
        userId, 
        isActive: true 
      });

      if (!chat) {
        chat = new Chat({
          userId,
          tripId,
          messages: []
        });
      }

      // Add user message to chat
      await chat.addMessage('user', message);

      // Process message with AI
      const aiResponse = await this.processMessageWithAI(message, chat);

      // Add AI response to chat
      await chat.addMessage('assistant', aiResponse.content, {
        intent: aiResponse.intent,
        entities: aiResponse.entities
      });

      res.status(200).json({
        success: true,
        data: {
          response: aiResponse.content,
          intent: aiResponse.intent,
          entities: aiResponse.entities,
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

  // Process message with AI based on context
  async processMessageWithAI(message, chat) {
    try {
      // Analyze message intent
      const intent = await this.analyzeIntent(message);
      
      let response;

      switch (intent.type) {
        case 'trip_planning':
          response = await this.handleTripPlanning(message, chat);
          break;
        case 'booking':
          response = await this.handleBooking(message, chat);
          break;
        case 'support':
          response = await this.handleSupport(message, chat);
          break;
        case 'onboarding':
          response = await this.handleOnboarding(message, chat);
          break;
        default:
          response = await this.handleGeneralChat(message, chat);
      }

      return {
        content: response,
        intent: intent.type,
        entities: intent.entities
      };

    } catch (error) {
      console.error('AI processing error:', error);
      return {
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again.",
        intent: 'error',
        entities: {}
      };
    }
  }

  // Analyze message intent
  async analyzeIntent(message) {
    const intentPrompt = `
      Analyze this message and determine the intent:
      "${message}"
      
      Return a JSON object with:
      - type: "trip_planning" | "booking" | "support" | "onboarding" | "general"
      - entities: any relevant entities extracted
      - confidence: confidence score (0-1)
    `;

    try {
      const response = await createChatCompletion([
        { role: 'user', content: intentPrompt }
      ], 'tripPlanner');

      try {
        return JSON.parse(response);
      } catch (parseError) {
        // Default intent analysis
        const keywords = {
          trip_planning: ['plan', 'trip', 'travel', 'destination', 'budget'],
          booking: ['book', 'reserve', 'flight', 'hotel', 'train', 'bus'],
          support: ['help', 'support', 'emergency', 'sos'],
          onboarding: ['signup', 'register', 'profile', 'details']
        };

        for (const [intent, words] of Object.entries(keywords)) {
          if (words.some(word => message.toLowerCase().includes(word))) {
            return { type: intent, entities: {}, confidence: 0.7 };
          }
        }

        return { type: 'general', entities: {}, confidence: 0.5 };
      }
    } catch (error) {
      return { type: 'general', entities: {}, confidence: 0.5 };
    }
  }

  // Handle trip planning requests
  async handleTripPlanning(message, chat) {
    try {
      const tripPlan = await this.tripPlanner.planTrip(message);
      
      if (tripPlan.success) {
        // Store trip data if valid
        if (tripPlan.tripData) {
          // Create or update trip in database
          const tripData = {
            userId: chat.userId,
            tripName: `Trip to ${tripPlan.tripData.destination}`,
            source: tripPlan.tripData.source,
            destination: tripPlan.tripData.destination,
            budget: tripPlan.tripData.budget,
            status: 'planning'
          };

          const trip = new Trip(tripData);
          await trip.save();

          // Update chat with trip context
          chat.tripId = trip._id;
          await chat.save();
        }

        return `Great! I've analyzed your trip request. Here's what I found:

**Trip Details:**
- From: ${tripPlan.tripData?.source || 'Not specified'}
- To: ${tripPlan.tripData?.destination || 'Not specified'}
- Budget: ${tripPlan.tripData?.budget || 'Not specified'}

**Transport Recommendation:**
${tripPlan.transport?.reasoning || 'Based on your preferences, I recommend the most suitable transport option.'}

**Budget Breakdown:**
${tripPlan.budget || 'I can help you plan your budget allocation.'}

Would you like me to proceed with booking your transport and accommodation?`;
      } else {
        return tripPlan.message;
      }
    } catch (error) {
      console.error('Trip planning error:', error);
      return "I'm sorry, I couldn't process your trip planning request. Please provide more details about your travel plans.";
    }
  }

  // Handle booking requests
  async handleBooking(message, chat) {
    try {
      // Extract booking details from message
      const bookingPrompt = `
        Extract booking details from this message:
        "${message}"
        
        Return JSON with:
        - type: "transport" | "hotel"
        - mode: "flight" | "train" | "bus" (for transport)
        - source: departure location
        - destination: arrival location
        - date: travel date
        - passengers: number of passengers
        - budget: budget amount
      `;

      const response = await createChatCompletion([
        { role: 'user', content: bookingPrompt }
      ], 'bookingAgent');

      let bookingData;
      try {
        bookingData = JSON.parse(response);
      } catch (parseError) {
        bookingData = {
          type: 'transport',
          mode: 'flight',
          source: 'Not specified',
          destination: 'Not specified',
          date: new Date().toISOString(),
          passengers: 1,
          budget: 10000
        };
      }

      const bookingResult = await this.bookingAgent.processBooking(bookingData);

      if (bookingResult.success) {
        return `Perfect! I've processed your booking:

**Booking Details:**
- Type: ${bookingData.type}
- ${bookingData.type === 'transport' ? `Mode: ${bookingData.mode}` : 'Hotel booking'}
- Booking ID: ${bookingResult.booking.bookingId}
- Status: ${bookingResult.booking.status}

Your booking has been confirmed! You'll receive a confirmation email shortly.

Would you like me to help you with anything else for your trip?`;
      } else {
        return `I'm sorry, I couldn't complete your booking. ${bookingResult.message}`;
      }
    } catch (error) {
      console.error('Booking error:', error);
      return "I'm sorry, I encountered an error while processing your booking. Please try again.";
    }
  }

  // Handle support requests
  async handleSupport(message, chat) {
    const supportPrompt = `
      Provide helpful support for this travel-related question:
      "${message}"
      
      Be friendly, informative, and provide practical advice.
    `;

    try {
      const response = await createChatCompletion([
        { role: 'user', content: supportPrompt }
      ], 'dashboardAgent');

      return response;
    } catch (error) {
      return "I'm here to help! Please let me know what specific assistance you need with your travel plans.";
    }
  }

  // Handle onboarding requests
  async handleOnboarding(message, chat) {
    const onboardingPrompt = `
      Help with user onboarding for TravelVerse. The user said:
      "${message}"
      
      Guide them through the onboarding process in a friendly and helpful manner.
    `;

    try {
      const response = await createChatCompletion([
        { role: 'user', content: onboardingPrompt }
      ], 'onboarding');

      return response;
    } catch (error) {
      return "Welcome to TravelVerse! I'm here to help you get started with your travel planning. What would you like to know?";
    }
  }

  // Handle general chat
  async handleGeneralChat(message, chat) {
    const generalPrompt = `
      You are TravelVerse, an AI travel assistant. Respond to this user message in a helpful and friendly manner:
      "${message}"
      
      Keep responses concise and travel-focused.
    `;

    try {
      const response = await createChatCompletion([
        { role: 'user', content: generalPrompt }
      ], 'dashboardAgent');

      return response;
    } catch (error) {
      return "Hello! I'm your TravelVerse assistant. How can I help you plan your next adventure?";
    }
  }

  // Get chat history
  async getChatHistory(req, res) {
    try {
      const { userId } = req.params;

      const chat = await Chat.findOne({ 
        userId, 
        isActive: true 
      });

      if (!chat) {
        return res.status(200).json({
          success: true,
          data: { messages: [] }
        });
      }

      res.status(200).json({
        success: true,
        data: {
          messages: chat.messages,
          chatId: chat._id
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
}

module.exports = new AIController(); 