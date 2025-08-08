const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// AI Configuration
const AI_CONFIG = {
  model: 'gpt-4-1106-preview', // Using GPT-4.1-mini equivalent
  maxTokens: 2000,
  temperature: 0.7,
  topP: 1,
  frequencyPenalty: 0,
  presencePenalty: 0,
};

// System prompts for different contexts
const SYSTEM_PROMPTS = {
  onboarding: `You are TravelVerse, an intelligent AI travel assistant. Help users complete their onboarding process by collecting necessary information for travel planning. Be friendly, professional, and thorough.`,
  
  tripPlanner: `You are TravelVerse's trip planning expert. Analyze user requests to extract travel details (source, destination, dates, budget, travelers) and provide intelligent travel recommendations. Consider factors like budget, time, group size, and preferences.`,
  
  bookingAgent: `You are TravelVerse's booking specialist. Help users book transport and accommodation based on their preferences and budget. Provide realistic booking simulations with pricing and availability.`,
  
  dashboardAgent: `You are TravelVerse's travel companion. Provide real-time assistance during trips including itinerary planning, budget tracking, local recommendations, and emergency support.`,
  
  sosHandler: `You are TravelVerse's emergency response system. Provide immediate assistance for travel emergencies including medical, security, and logistical support.`,
  
  translator: `You are TravelVerse's language assistant. Help users communicate in local languages by providing accurate translations and cultural context.`,
  
  budgetPlanner: `You are TravelVerse's financial advisor. Help users plan and track their travel budget, providing spending recommendations and cost optimization strategies.`,
  
  whatIfScenario: `You are TravelVerse's contingency planner. Generate alternative travel plans and backup options for various scenarios like weather changes, cancellations, or emergencies.`
};

// Helper function to create chat completion
const createChatCompletion = async (messages, context = 'tripPlanner') => {
  try {
    const systemPrompt = SYSTEM_PROMPTS[context];
    
    const response = await openai.chat.completions.create({
      model: AI_CONFIG.model,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      max_tokens: AI_CONFIG.maxTokens,
      temperature: AI_CONFIG.temperature,
      top_p: AI_CONFIG.topP,
      frequency_penalty: AI_CONFIG.frequencyPenalty,
      presence_penalty: AI_CONFIG.presencePenalty,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('AI service temporarily unavailable');
  }
};

// Helper function to extract entities from user input
const extractEntities = async (userInput) => {
  const extractionPrompt = `
    Extract travel-related entities from this user input. Return a JSON object with:
    - source: departure location
    - destination: arrival location
    - dates: travel dates (start and end)
    - budget: budget amount and currency
    - travelers: number of people and types (adult/child/infant)
    - preferences: any specific preferences mentioned
    
    User input: "${userInput}"
  `;

  try {
    const response = await createChatCompletion([
      { role: 'user', content: extractionPrompt }
    ], 'tripPlanner');

    // Try to parse JSON response
    try {
      return JSON.parse(response);
    } catch (parseError) {
      // If parsing fails, return structured data
      return {
        source: null,
        destination: null,
        dates: null,
        budget: null,
        travelers: null,
        preferences: null,
        rawResponse: response
      };
    }
  } catch (error) {
    console.error('Entity extraction error:', error);
    return null;
  }
};

// Helper function to generate travel recommendations
const generateRecommendations = async (tripData) => {
  const recommendationPrompt = `
    Based on this trip data, provide intelligent travel recommendations:
    - Transport mode (flight/train/bus) with reasoning
    - Accommodation suggestions
    - Budget allocation
    - Travel tips and considerations
    
    Trip data: ${JSON.stringify(tripData)}
  `;

  return await createChatCompletion([
    { role: 'user', content: recommendationPrompt }
  ], 'tripPlanner');
};

module.exports = {
  openai,
  AI_CONFIG,
  SYSTEM_PROMPTS,
  createChatCompletion,
  extractEntities,
  generateRecommendations
}; 