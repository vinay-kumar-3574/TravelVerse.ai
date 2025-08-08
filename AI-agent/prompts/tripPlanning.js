/**
 * Trip Planning Prompt Templates
 * Contains all GPT prompts used for trip planning functionality
 */

const TRIP_PLANNING_PROMPTS = {
  // Extract trip details from user input
  extractTripDetails: `You are an AI travel assistant. Extract trip details from the user's message.

User Message: "{message}"

Extract the following information in JSON format:
{
  "source": "departure city/country",
  "destination": "arrival city/country", 
  "startDate": "YYYY-MM-DD or null",
  "endDate": "YYYY-MM-DD or null",
  "travelers": number of people,
  "budget": {
    "amount": number,
    "currency": "USD/INR/EUR/etc"
  },
  "preferences": {
    "travelMode": ["flight", "train", "bus", "any"],
    "accommodation": ["hotel", "hostel", "apartment", "any"],
    "activities": ["sightseeing", "adventure", "relaxation", "business", "any"]
  },
  "specialRequirements": ["accessibility", "dietary", "medical", "other"]
}

If any information is not provided, use null. Be specific about locations and dates.`,

  // Generate transport recommendations
  generateTransportRecommendations: `You are a travel transport advisor. Based on the trip details, suggest the best transport options.

Trip Details: {tripDetails}

Consider:
- Distance between source and destination
- Budget constraints
- Number of travelers
- Time constraints
- Comfort preferences

Provide recommendations in JSON format:
{
  "primaryRecommendation": {
    "mode": "flight/train/bus/car",
    "reasoning": "why this is the best option",
    "estimatedCost": {
      "amount": number,
      "currency": "string"
    },
    "duration": "estimated travel time",
    "comfort": "economy/business/first"
  },
  "alternatives": [
    {
      "mode": "transport mode",
      "pros": ["advantages"],
      "cons": ["disadvantages"],
      "estimatedCost": {
        "amount": number,
        "currency": "string"
      }
    }
  ],
  "budgetBreakdown": {
    "transport": number,
    "accommodation": number,
    "activities": number,
    "food": number,
    "miscellaneous": number
  }
}`,

  // Generate detailed itinerary
  generateItinerary: `You are an expert travel planner. Create a detailed daily itinerary for the trip.

Trip Details: {tripDetails}
Duration: {duration} days
Budget: {budget}
Travelers: {travelers}

Create a comprehensive itinerary in JSON format:
{
  "overview": {
    "totalDays": number,
    "totalBudget": {
      "amount": number,
      "currency": "string"
    },
    "highlights": ["key attractions/activities"]
  },
  "dailyItinerary": [
    {
      "day": number,
      "date": "YYYY-MM-DD",
      "theme": "day theme/focus",
      "morning": {
        "activity": "description",
        "location": "place name",
        "duration": "time",
        "cost": {
          "amount": number,
          "currency": "string"
        }
      },
      "afternoon": {
        "activity": "description",
        "location": "place name", 
        "duration": "time",
        "cost": {
          "amount": number,
          "currency": "string"
        }
      },
      "evening": {
        "activity": "description",
        "location": "place name",
        "duration": "time", 
        "cost": {
          "amount": number,
          "currency": "string"
        }
      },
      "accommodation": {
        "type": "hotel/hostel/apartment",
        "name": "accommodation name",
        "cost": {
          "amount": number,
          "currency": "string"
        }
      },
      "transport": {
        "mode": "walking/public transport/taxi",
        "cost": {
          "amount": number,
          "currency": "string"
        }
      },
      "meals": {
        "breakfast": "description and cost",
        "lunch": "description and cost", 
        "dinner": "description and cost"
      },
      "totalDayCost": {
        "amount": number,
        "currency": "string"
      }
    }
  ],
  "budgetSummary": {
    "transport": number,
    "accommodation": number,
    "activities": number,
    "food": number,
    "miscellaneous": number,
    "total": number
  },
  "recommendations": {
    "mustSee": ["attractions"],
    "localCuisine": ["dishes to try"],
    "culturalTips": ["local customs/etiquette"],
    "safetyTips": ["safety considerations"]
  }
}`,

  // Validate trip data
  validateTripData: `You are a travel data validator. Validate the provided trip information.

Trip Data: {tripData}

Check for:
1. Valid dates (start before end)
2. Realistic budget for destination
3. Valid locations
4. Appropriate number of travelers
5. Logical travel duration

Return validation result in JSON format:
{
  "isValid": boolean,
  "errors": [
    {
      "field": "field name",
      "message": "error description",
      "suggestion": "how to fix"
    }
  ],
  "warnings": [
    {
      "field": "field name", 
      "message": "warning description",
      "suggestion": "recommendation"
    }
  ],
  "suggestions": [
    {
      "type": "budget/route/accommodation",
      "message": "suggestion description"
    }
  ]
}`,

  // Generate budget breakdown
  generateBudgetBreakdown: `You are a travel budget expert. Create a detailed budget breakdown for the trip.

Trip Details: {tripDetails}
Total Budget: {budget}

Create a comprehensive budget breakdown in JSON format:
{
  "totalBudget": {
    "amount": number,
    "currency": "string"
  },
  "categories": {
    "transport": {
      "percentage": number,
      "amount": number,
      "breakdown": {
        "flights": number,
        "localTransport": number,
        "airportTransfer": number
      }
    },
    "accommodation": {
      "percentage": number,
      "amount": number,
      "breakdown": {
        "hotels": number,
        "taxes": number,
        "fees": number
      }
    },
    "food": {
      "percentage": number,
      "amount": number,
      "breakdown": {
        "breakfast": number,
        "lunch": number,
        "dinner": number,
        "snacks": number
      }
    },
    "activities": {
      "percentage": number,
      "amount": number,
      "breakdown": {
        "attractions": number,
        "tours": number,
        "entertainment": number
      }
    },
    "miscellaneous": {
      "percentage": number,
      "amount": number,
      "breakdown": {
        "souvenirs": number,
        "tips": number,
        "emergency": number
      }
    }
  },
  "dailyBudget": {
    "amount": number,
    "currency": "string"
  },
  "savingsTips": [
    "specific money-saving suggestions"
  ],
  "splurgeOpportunities": [
    "worthwhile experiences to consider"
  ]
}`,

  // Generate travel recommendations
  generateRecommendations: `You are a travel expert. Generate personalized recommendations for the trip.

Trip Details: {tripDetails}
User Preferences: {preferences}
Budget: {budget}

Provide recommendations in JSON format:
{
  "destinations": [
    {
      "name": "destination name",
      "reason": "why recommend",
      "bestTime": "best time to visit",
      "estimatedCost": {
        "amount": number,
        "currency": "string"
      }
    }
  ],
  "activities": [
    {
      "name": "activity name",
      "description": "what it involves",
      "duration": "time required",
      "cost": {
        "amount": number,
        "currency": "string"
      },
      "difficulty": "easy/medium/hard"
    }
  ],
  "accommodations": [
    {
      "type": "hotel/hostel/apartment",
      "name": "accommodation name",
      "location": "area/neighborhood",
      "priceRange": "budget/mid-range/luxury",
      "amenities": ["amenities list"],
      "pros": ["advantages"],
      "cons": ["disadvantages"]
    }
  ],
  "localInsights": {
    "cuisine": ["must-try dishes"],
    "culture": ["cultural highlights"],
    "language": ["useful phrases"],
    "etiquette": ["local customs"],
    "safety": ["safety tips"]
  },
  "packingList": {
    "essentials": ["essential items"],
    "seasonal": ["season-specific items"],
    "optional": ["nice-to-have items"]
  }
}`,

  // Optimize trip based on constraints
  optimizeTrip: `You are a travel optimization expert. Optimize the trip based on given constraints.

Original Trip: {originalTrip}
Constraints: {constraints}
Optimization Goals: {goals}

Optimize the trip and return in JSON format:
{
  "optimizedTrip": {
    "changes": [
      {
        "type": "route/accommodation/activity",
        "original": "original choice",
        "optimized": "optimized choice",
        "reason": "why changed",
        "savings": {
          "amount": number,
          "currency": "string"
        }
      }
    ],
    "totalSavings": {
      "amount": number,
      "currency": "string"
    },
    "improvements": [
      "specific improvements made"
    ]
  },
  "tradeOffs": [
    {
      "aspect": "what was compromised",
      "impact": "how it affects the trip",
      "mitigation": "how to minimize impact"
    }
  ],
  "alternativeOptions": [
    {
      "scenario": "alternative scenario",
      "pros": ["advantages"],
      "cons": ["disadvantages"],
      "cost": {
        "amount": number,
        "currency": "string"
      }
    }
  ]
}`
};

module.exports = TRIP_PLANNING_PROMPTS; 