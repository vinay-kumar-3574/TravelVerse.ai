const aiConfig = require('./ai-config');
const OnboardingAgent = require('./pipelines/onboardingAgent');
const TripPlanner = require('./pipelines/tripPlanner');
const TransportAdvisor = require('./pipelines/transportAdvisor');
const BookingAgent = require('./pipelines/bookingAgent');
const HotelSelector = require('./pipelines/hotelSelector');
const DashboardAgent = require('./pipelines/dashboardAgent');
const SOSHandler = require('./pipelines/sosHandler');
const BudgetPlanner = require('./pipelines/budgetPlanner');
const WhatIfScenario = require('./pipelines/whatIfScenario');
const Translator = require('./translator');
const MemoryManager = require('./memory/memoryManager');

class TravelVerseAgent {
  constructor() {
    // Initialize all AI pipelines
    this.onboardingAgent = new OnboardingAgent();
    this.tripPlanner = new TripPlanner();
    this.transportAdvisor = new TransportAdvisor();
    this.bookingAgent = new BookingAgent();
    this.hotelSelector = new HotelSelector();
    this.dashboardAgent = new DashboardAgent();
    this.sosHandler = new SOSHandler();
    this.budgetPlanner = new BudgetPlanner();
    this.whatIfScenario = new WhatIfScenario();
    this.translator = new Translator();
    
    // Initialize memory manager
    this.memoryManager = new MemoryManager();
    
    // Conversation state
    this.conversationState = new Map();
  }

  /**
   * Get OpenAI client with lazy initialization
   */
  getOpenAIClient() {
    return aiConfig.getOpenAIClient();
  }

  /**
   * Main entry point for processing user messages
   */
  async processMessage(userId, message, context = {}) {
    try {
      // Load conversation memory
      const memory = await this.memoryManager.getUserMemory(userId);
      
      // Analyze intent and extract entities
      const intentAnalysis = await this.analyzeIntent(message, memory);
      
      // Update conversation state
      this.updateConversationState(userId, intentAnalysis);
      
      // Route to appropriate pipeline
      const response = await this.routeToPipeline(userId, message, intentAnalysis, context);
      
      // Store in memory
      await this.memoryManager.storeInteraction(userId, {
        message,
        response: response.content,
        intent: intentAnalysis.intent,
        entities: intentAnalysis.entities,
        timestamp: new Date()
      });
      
      return response;
    } catch (error) {
      console.error('Error in processMessage:', error);
      return {
        content: "I apologize, but I'm experiencing some technical difficulties. Please try again in a moment.",
        type: 'error',
        metadata: { error: error.message }
      };
    }
  }

  /**
   * Analyze user intent and extract entities
   */
  async analyzeIntent(message, memory) {
    const systemPrompt = `You are an AI travel assistant. Analyze the user's message and determine:
    1. Primary intent (onboarding, trip_planning, booking, transport, hotel, dashboard, sos, budget, what_if, translation, general)
    2. Extracted entities (source, destination, budget, travelers, dates, etc.)
    3. Confidence level (0-1)
    4. Suggested next action
    
    Consider conversation history and context when analyzing intent.`;

    const openai = this.getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: aiConfig.AI_CONFIG.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Message: "${message}"\n\nConversation History: ${JSON.stringify(memory.recentMessages || [])}` }
      ],
      temperature: 0.3,
      max_tokens: 500
    });

    const analysis = JSON.parse(response.choices[0].message.content);
    return {
      intent: analysis.intent,
      entities: analysis.entities,
      confidence: analysis.confidence,
      nextAction: analysis.nextAction
    };
  }

  /**
   * Route message to appropriate AI pipeline
   */
  async routeToPipeline(userId, message, intentAnalysis, context) {
    const { intent, entities, confidence } = intentAnalysis;
    
    switch (intent) {
      case 'onboarding':
        return await this.handleOnboarding(userId, message, entities, context);
      
      case 'trip_planning':
        return await this.handleTripPlanning(userId, message, entities, context);
      
      case 'transport':
        return await this.handleTransport(userId, message, entities, context);
      
      case 'booking':
        return await this.handleBooking(userId, message, entities, context);
      
      case 'hotel':
        return await this.handleHotel(userId, message, entities, context);
      
      case 'dashboard':
        return await this.handleDashboard(userId, message, entities, context);
      
      case 'sos':
        return await this.handleSOS(userId, message, entities, context);
      
      case 'budget':
        return await this.handleBudget(userId, message, entities, context);
      
      case 'what_if':
        return await this.handleWhatIf(userId, message, entities, context);
      
      case 'translation':
        return await this.handleTranslation(userId, message, entities, context);
      
      default:
        return await this.handleGeneralChat(userId, message, context);
    }
  }

  /**
   * Handle onboarding flow
   */
  async handleOnboarding(userId, message, entities, context) {
    const stage = context.onboardingStage || 'basic_details';
    const result = await this.onboardingAgent.processOnboardingStep(message, stage, entities);
    
    return {
      content: result.response,
      type: 'onboarding',
      metadata: {
        stage: result.nextStage,
        isComplete: result.isComplete,
        extractedData: result.extractedData
      }
    };
  }

  /**
   * Handle trip planning
   */
  async handleTripPlanning(userId, message, entities, context) {
    const result = await this.tripPlanner.planTrip(message, entities);
    
    return {
      content: result.response,
      type: 'trip_planning',
      metadata: {
        tripDetails: result.tripDetails,
        recommendations: result.recommendations,
        budgetBreakdown: result.budgetBreakdown
      }
    };
  }

  /**
   * Handle transport selection
   */
  async handleTransport(userId, message, entities, context) {
    const result = await this.transportAdvisor.suggestTransportMode(message, entities);
    
    return {
      content: result.response,
      type: 'transport',
      metadata: {
        suggestedMode: result.suggestedMode,
        alternatives: result.alternatives,
        costBreakdown: result.costBreakdown
      }
    };
  }

  /**
   * Handle booking process
   */
  async handleBooking(userId, message, entities, context) {
    const result = await this.bookingAgent.processBooking(message, entities);
    
    return {
      content: result.response,
      type: 'booking',
      metadata: {
        bookingType: result.bookingType,
        confirmation: result.confirmation,
        nextSteps: result.nextSteps
      }
    };
  }

  /**
   * Handle hotel selection
   */
  async handleHotel(userId, message, entities, context) {
    const result = await this.hotelSelector.recommendHotels(message, entities);
    
    return {
      content: result.response,
      type: 'hotel',
      metadata: {
        recommendations: result.recommendations,
        alternatives: result.alternatives,
        costBreakdown: result.costBreakdown
      }
    };
  }

  /**
   * Handle dashboard interactions
   */
  async handleDashboard(userId, message, entities, context) {
    const result = await this.dashboardAgent.processDashboardRequest(message, entities, context);
    
    return {
      content: result.response,
      type: 'dashboard',
      metadata: {
        dashboardType: result.dashboardType,
        data: result.data,
        actions: result.actions
      }
    };
  }

  /**
   * Handle SOS/emergency situations
   */
  async handleSOS(userId, message, entities, context) {
    const result = await this.sosHandler.handleEmergency(message, entities);
    
    return {
      content: result.response,
      type: 'sos',
      metadata: {
        emergencyType: result.emergencyType,
        actions: result.actions,
        contacts: result.contacts
      }
    };
  }

  /**
   * Handle budget planning
   */
  async handleBudget(userId, message, entities, context) {
    const result = await this.budgetPlanner.createBudgetPlan(message, entities);
    
    return {
      content: result.response,
      type: 'budget',
      metadata: {
        budgetPlan: result.budgetPlan,
        recommendations: result.recommendations,
        breakdown: result.breakdown
      }
    };
  }

  /**
   * Handle what-if scenarios
   */
  async handleWhatIf(userId, message, entities, context) {
    const result = await this.whatIfScenario.analyzeScenario(message, entities);
    
    return {
      content: result.response,
      type: 'what_if',
      metadata: {
        scenario: result.scenario,
        alternatives: result.alternatives,
        impact: result.impact
      }
    };
  }

  /**
   * Handle translation requests
   */
  async handleTranslation(userId, message, entities, context) {
    const result = await this.translator.translateText(message, entities);
    
    return {
      content: result.response,
      type: 'translation',
      metadata: {
        sourceLanguage: result.sourceLanguage,
        targetLanguage: result.targetLanguage,
        translation: result.translation
      }
    };
  }

  /**
   * Handle general chat
   */
  async handleGeneralChat(userId, message, context) {
    const memory = await this.memoryManager.getUserMemory(userId);
    
    const openai = this.getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: aiConfig.AI_CONFIG.model,
      messages: [
        {
          role: 'system',
          content: `You are TravelVerse, an intelligent AI travel assistant. Be helpful, friendly, and knowledgeable about travel. Use the conversation history to provide contextual responses.`
        },
        ...memory.recentMessages.slice(-5).map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 300
    });

    return {
      content: response.choices[0].message.content,
      type: 'general',
      metadata: {}
    };
  }

  /**
   * Update conversation state
   */
  updateConversationState(userId, intentAnalysis) {
    if (!this.conversationState.has(userId)) {
      this.conversationState.set(userId, {
        currentIntent: null,
        conversationStage: 'initial',
        extractedEntities: {},
        lastInteraction: null
      });
    }

    const state = this.conversationState.get(userId);
    state.currentIntent = intentAnalysis.intent;
    state.lastInteraction = new Date();
    state.extractedEntities = { ...state.extractedEntities, ...intentAnalysis.entities };
  }

  /**
   * Get conversation state for a user
   */
  getConversationState(userId) {
    return this.conversationState.get(userId) || null;
  }

  /**
   * Clear conversation state for a user
   */
  clearConversationState(userId) {
    this.conversationState.delete(userId);
    this.memoryManager.clearUserMemory(userId);
  }

  /**
   * Get user preferences and history
   */
  async getUserContext(userId) {
    const memory = await this.memoryManager.getUserMemory(userId);
    const state = this.getConversationState(userId);
    
    return {
      memory,
      state,
      preferences: memory.preferences || {},
      recentTrips: memory.recentTrips || [],
      commonDestinations: memory.commonDestinations || []
    };
  }

  /**
   * Generate personalized recommendations
   */
  async generatePersonalizedRecommendations(userId, context) {
    const userContext = await this.getUserContext(userId);
    
    const openai = this.getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: aiConfig.AI_CONFIG.model,
      messages: [
        {
          role: 'system',
          content: `Generate personalized travel recommendations based on user preferences and history. Consider their budget, preferred travel style, and past destinations.`
        },
        {
          role: 'user',
          content: `User Context: ${JSON.stringify(userContext)}\n\nGenerate 3-5 personalized recommendations.`
        }
      ],
      temperature: 0.8,
      max_tokens: 400
    });

    return {
      content: response.choices[0].message.content,
      type: 'recommendations',
      metadata: { personalized: true }
    };
  }

  /**
   * Handle multi-turn conversations
   */
  async handleMultiTurnConversation(userId, messages, context) {
    const memory = await this.memoryManager.getUserMemory(userId);
    const conversationHistory = memory.recentMessages || [];
    
    // Analyze the conversation flow
    const flowAnalysis = await this.analyzeConversationFlow(messages, conversationHistory);
    
    // Generate contextual response
    const openai = this.getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: aiConfig.AI_CONFIG.model,
      messages: [
        {
          role: 'system',
          content: `You are TravelVerse. Maintain context across multiple messages. Be consistent with previous responses and build upon the conversation naturally.`
        },
        ...conversationHistory.slice(-10).map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        ...messages.map(msg => ({
          role: 'user',
          content: msg
        }))
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return {
      content: response.choices[0].message.content,
      type: 'multi_turn',
      metadata: { flowAnalysis }
    };
  }

  /**
   * Analyze conversation flow for context
   */
  async analyzeConversationFlow(messages, history) {
    const openai = this.getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: aiConfig.AI_CONFIG.model,
      messages: [
        {
          role: 'system',
          content: `Analyze the conversation flow and identify the main topic, user intent progression, and any unresolved questions or requests.`
        },
        {
          role: 'user',
          content: `Recent Messages: ${JSON.stringify(messages)}\n\nHistory: ${JSON.stringify(history.slice(-5))}`
        }
      ],
      temperature: 0.3,
      max_tokens: 200
    });

    return JSON.parse(response.choices[0].message.content);
  }

  /**
   * Health check for the AI agent
   */
  async healthCheck() {
    try {
      // Test OpenAI connection
      const openai = this.getOpenAIClient();
      await openai.chat.completions.create({
        model: aiConfig.AI_CONFIG.model,
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 5
      });

      // Test memory manager
      await this.memoryManager.healthCheck();

      return {
        status: 'healthy',
        components: {
          openai: 'connected',
          memory: 'operational',
          pipelines: 'loaded'
        }
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message,
        components: {
          openai: error.message.includes('openai') ? 'error' : 'connected',
          memory: 'operational',
          pipelines: 'loaded'
        }
      };
    }
  }
}

module.exports = TravelVerseAgent; 