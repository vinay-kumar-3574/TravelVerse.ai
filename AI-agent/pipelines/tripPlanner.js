const { createChatCompletion, extractEntities, generateRecommendations } = require('../ai-config.js');

class TripPlanner {
  constructor() {
    this.context = {};
  }

  // Extract travel details from user input
  async extractTripDetails(userInput) {
    try {
      const entities = await extractEntities(userInput);
      
      if (!entities) {
        return {
          success: false,
          message: "I couldn't understand the travel details. Could you please provide more specific information about your trip?"
        };
      }

      // Validate extracted data
      const validation = this.validateTripData(entities);
      if (!validation.isValid) {
        return {
          success: false,
          message: validation.message
        };
      }

      return {
        success: true,
        data: entities,
        message: "I've extracted your travel details. Let me plan your perfect trip!"
      };
    } catch (error) {
      console.error('Trip details extraction error:', error);
      return {
        success: false,
        message: "Sorry, I encountered an error while processing your request. Please try again."
      };
    }
  }

  // Validate extracted trip data
  validateTripData(data) {
    const errors = [];

    if (!data.source) errors.push("Source location is missing");
    if (!data.destination) errors.push("Destination is missing");
    if (!data.budget) errors.push("Budget information is missing");
    if (!data.travelers) errors.push("Number of travelers is missing");

    if (errors.length > 0) {
      return {
        isValid: false,
        message: `Please provide: ${errors.join(', ')}`
      };
    }

    return { isValid: true };
  }

  // Generate intelligent travel recommendations
  async generateRecommendations(tripData) {
    try {
      const recommendations = await generateRecommendations(tripData);
      
      return {
        success: true,
        recommendations: recommendations,
        message: "Here are my recommendations for your trip:"
      };
    } catch (error) {
      console.error('Recommendations generation error:', error);
      return {
        success: false,
        message: "Sorry, I couldn't generate recommendations at the moment. Please try again."
      };
    }
  }

  // Suggest optimal transport mode
  async suggestTransportMode(tripData) {
    const transportPrompt = `
      Based on this trip information, suggest the optimal transport mode:
      - Source: ${tripData.source}
      - Destination: ${tripData.destination}
      - Budget: ${tripData.budget}
      - Travelers: ${tripData.travelers}
      
      Consider factors like:
      - Distance and travel time
      - Budget constraints
      - Group size
      - Comfort preferences
      - Environmental impact
      
      Return a JSON response with:
      - recommendedMode: "flight" | "train" | "bus"
      - reasoning: explanation for the choice
      - estimatedCost: estimated cost per person
      - estimatedTime: estimated travel time
      - alternatives: other viable options
    `;

    try {
      const response = await createChatCompletion([
        { role: 'user', content: transportPrompt }
      ], 'tripPlanner');

      // Try to parse JSON response
      try {
        return JSON.parse(response);
      } catch (parseError) {
        return {
          recommendedMode: 'flight',
          reasoning: 'Based on your trip details, I recommend flying for the best balance of time and comfort.',
          estimatedCost: 5000,
          estimatedTime: '2 hours',
          alternatives: ['train', 'bus']
        };
      }
    } catch (error) {
      console.error('Transport suggestion error:', error);
      return null;
    }
  }

  // Generate detailed itinerary
  async generateItinerary(tripData) {
    const itineraryPrompt = `
      Create a detailed daily itinerary for this trip:
      - Destination: ${tripData.destination}
      - Duration: ${tripData.dates ? `${tripData.dates.start} to ${tripData.dates.end}` : 'Not specified'}
      - Budget: ${tripData.budget}
      - Travelers: ${tripData.travelers}
      
      Include:
      - Daily activities and attractions
      - Meal recommendations
      - Transportation within destination
      - Budget allocation per day
      - Local tips and cultural notes
      
      Format as a structured itinerary with day-by-day breakdown.
    `;

    try {
      const itinerary = await createChatCompletion([
        { role: 'user', content: itineraryPrompt }
      ], 'tripPlanner');

      return {
        success: true,
        itinerary: itinerary
      };
    } catch (error) {
      console.error('Itinerary generation error:', error);
      return {
        success: false,
        message: "Sorry, I couldn't generate an itinerary at the moment."
      };
    }
  }

  // Calculate budget breakdown
  async calculateBudgetBreakdown(tripData) {
    const budgetPrompt = `
      Create a detailed budget breakdown for this trip:
      - Destination: ${tripData.destination}
      - Total Budget: ${tripData.budget}
      - Travelers: ${tripData.travelers}
      
      Break down the budget into:
      - Transportation (to/from destination)
      - Accommodation
      - Food and dining
      - Activities and attractions
      - Shopping and souvenirs
      - Emergency fund
      - Local transportation
      
      Provide percentages and amounts for each category.
    `;

    try {
      const budgetBreakdown = await createChatCompletion([
        { role: 'user', content: budgetPrompt }
      ], 'budgetPlanner');

      return {
        success: true,
        breakdown: budgetBreakdown
      };
    } catch (error) {
      console.error('Budget calculation error:', error);
      return {
        success: false,
        message: "Sorry, I couldn't calculate the budget breakdown."
      };
    }
  }

  // Process complete trip planning request
  async planTrip(userInput) {
    try {
      // Step 1: Extract trip details
      const extractionResult = await this.extractTripDetails(userInput);
      if (!extractionResult.success) {
        return extractionResult;
      }

      const tripData = extractionResult.data;

      // Step 2: Generate transport recommendations
      const transportSuggestion = await this.suggestTransportMode(tripData);

      // Step 3: Generate itinerary
      const itineraryResult = await this.generateItinerary(tripData);

      // Step 4: Calculate budget breakdown
      const budgetResult = await this.calculateBudgetBreakdown(tripData);

      // Step 5: Generate overall recommendations
      const recommendationsResult = await this.generateRecommendations(tripData);

      return {
        success: true,
        tripData: tripData,
        transport: transportSuggestion,
        itinerary: itineraryResult.success ? itineraryResult.itinerary : null,
        budget: budgetResult.success ? budgetResult.breakdown : null,
        recommendations: recommendationsResult.success ? recommendationsResult.recommendations : null,
        message: "I've created a comprehensive travel plan for you! Here are the details:"
      };

    } catch (error) {
      console.error('Trip planning error:', error);
      return {
        success: false,
        message: "Sorry, I encountered an error while planning your trip. Please try again."
      };
    }
  }
}

module.exports = TripPlanner; 