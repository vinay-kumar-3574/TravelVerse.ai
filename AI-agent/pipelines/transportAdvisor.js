const { createChatCompletion, extractEntities } = require('../ai-config');

class TransportAdvisor {
  constructor() {
    this.transportModes = {
      FLIGHT: 'flight',
      TRAIN: 'train',
      BUS: 'bus',
      CAR: 'car'
    };
  }

  async suggestTransportMode(tripDetails) {
    try {
      const { source, destination, budget, travelers, startDate, endDate } = tripDetails;
      
      const prompt = `
        Analyze the trip details and suggest the best transport mode:
        
        Trip Details:
        - Source: ${source}
        - Destination: ${destination}
        - Budget: ${budget} INR
        - Travelers: ${travelers} people
        - Start Date: ${startDate}
        - End Date: ${endDate}
        
        Consider factors:
        1. Distance between source and destination
        2. Budget constraints per person
        3. Group size and comfort requirements
        4. Time constraints
        5. Availability and reliability
        
        Return a JSON object with:
        {
          "recommendedMode": "flight/train/bus/car",
          "reasoning": "detailed explanation",
          "estimatedCost": "cost per person",
          "totalCost": "total cost for all travelers",
          "duration": "estimated travel time",
          "alternatives": ["array of alternative modes"],
          "seatPreferences": ["available seat options"],
          "specialRequirements": ["any special needs based on group size"]
        }
      `;

      const response = await createChatCompletion(prompt);
      const recommendation = JSON.parse(response);

      return {
        ...recommendation,
        source,
        destination,
        travelers,
        budget
      };
    } catch (error) {
      console.error('Transport suggestion error:', error);
      throw new Error('Failed to suggest transport mode');
    }
  }

  async getSeatPreferences(transportMode, tripDetails) {
    try {
      const { travelers, budget } = tripDetails;
      
      const prompt = `
        Suggest seat preferences for ${transportMode} travel:
        
        Details:
        - Transport Mode: ${transportMode}
        - Travelers: ${travelers} people
        - Budget: ${budget} INR
        
        Return a JSON object with available seat options:
        {
          "availableClasses": ["array of available classes"],
          "recommendedClass": "best class for this group",
          "seatTypes": ["window", "aisle", "middle", "front", "back"],
          "specialRequests": ["wheelchair", "extra legroom", "bassinet"],
          "groupSeating": "recommendation for group seating",
          "estimatedCost": "cost for recommended class"
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Seat preferences error:', error);
      throw new Error('Failed to get seat preferences');
    }
  }

  async calculateTransportCost(transportMode, tripDetails, seatClass = 'economy') {
    try {
      const { source, destination, travelers, budget } = tripDetails;
      
      const prompt = `
        Calculate detailed transport costs for ${transportMode}:
        
        Trip Details:
        - Source: ${source}
        - Destination: ${destination}
        - Travelers: ${travelers} people
        - Seat Class: ${seatClass}
        - Total Budget: ${budget} INR
        
        Return a JSON object with cost breakdown:
        {
          "baseFare": "base fare per person",
          "seatClassMultiplier": "multiplier for seat class",
          "totalPerPerson": "total cost per person",
          "totalForGroup": "total cost for all travelers",
          "taxesAndFees": "additional taxes and fees",
          "insurance": "optional travel insurance cost",
          "baggage": "baggage allowance and costs",
          "remainingBudget": "budget remaining after transport",
          "costPercentage": "percentage of total budget used"
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Cost calculation error:', error);
      throw new Error('Failed to calculate transport costs');
    }
  }

  async validateTransportChoice(transportMode, tripDetails) {
    try {
      const { source, destination, budget, travelers } = tripDetails;
      
      const prompt = `
        Validate if the chosen transport mode is suitable:
        
        Choice: ${transportMode}
        Source: ${source}
        Destination: ${destination}
        Budget: ${budget} INR
        Travelers: ${travelers} people
        
        Return a JSON object with validation:
        {
          "isSuitable": true/false,
          "reasoning": "explanation",
          "warnings": ["any potential issues"],
          "recommendations": ["suggestions for better options"],
          "budgetFeasibility": "high/medium/low",
          "comfortLevel": "high/medium/low"
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Transport validation error:', error);
      throw new Error('Failed to validate transport choice');
    }
  }

  async getTransportAlternatives(tripDetails, excludeMode = null) {
    try {
      const { source, destination, budget, travelers } = tripDetails;
      
      const prompt = `
        Suggest alternative transport modes for this trip:
        
        Trip Details:
        - Source: ${source}
        - Destination: ${destination}
        - Budget: ${budget} INR
        - Travelers: ${travelers} people
        - Exclude: ${excludeMode || 'none'}
        
        Return a JSON object with alternatives:
        {
          "alternatives": [
            {
              "mode": "transport mode",
              "estimatedCost": "cost per person",
              "duration": "travel time",
              "pros": ["advantages"],
              "cons": ["disadvantages"],
              "suitability": "high/medium/low"
            }
          ],
          "recommendation": "best alternative mode",
          "reasoning": "why this alternative is recommended"
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Transport alternatives error:', error);
      throw new Error('Failed to get transport alternatives');
    }
  }

  async generateTransportSummary(tripDetails, selectedMode, seatClass) {
    try {
      const { source, destination, travelers, budget } = tripDetails;
      
      const prompt = `
        Generate a comprehensive transport summary:
        
        Trip: ${source} to ${destination}
        Mode: ${selectedMode}
        Seat Class: ${seatClass}
        Travelers: ${travelers} people
        Budget: ${budget} INR
        
        Return a JSON object with summary:
        {
          "summary": "brief overview of transport choice",
          "keyPoints": ["important points about the journey"],
          "preparation": ["what travelers need to prepare"],
          "timeline": "recommended timeline for booking",
          "tips": ["travel tips for this mode"],
          "emergencyInfo": "emergency contact information"
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Transport summary error:', error);
      throw new Error('Failed to generate transport summary');
    }
  }

  async analyzeRouteComplexity(source, destination) {
    try {
      const prompt = `
        Analyze the complexity of the route from ${source} to ${destination}:
        
        Consider:
        - Distance and geography
        - Infrastructure availability
        - Seasonal factors
        - Political/security considerations
        
        Return a JSON object with analysis:
        {
          "complexity": "low/medium/high",
          "factors": ["factors affecting complexity"],
          "recommendations": ["recommendations for this route"],
          "risks": ["potential risks"],
          "bestSeason": "best time to travel",
          "requiredDocuments": ["required travel documents"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Route analysis error:', error);
      throw new Error('Failed to analyze route complexity');
    }
  }
}

module.exports = TransportAdvisor; 