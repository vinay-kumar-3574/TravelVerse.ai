/**
 * Dashboard Prompt Templates
 * Contains all GPT prompts used for dashboard functionality
 */

const DASHBOARD_PROMPTS = {
  // Generate trip overview
  generateTripOverview: `You are an AI travel assistant creating a comprehensive trip overview for the dashboard.

Trip Details: {tripDetails}
User Preferences: {userPreferences}
Current Date: {currentDate}

Create a trip overview in JSON format:
{
  "tripSummary": {
    "destination": "destination name",
    "duration": "trip duration",
    "daysRemaining": number,
    "progress": "percentage of trip completed"
  },
  "currentStatus": {
    "location": "current location",
    "nextEvent": "next scheduled event",
    "weather": "current weather",
    "localTime": "local time"
  },
  "bookings": {
    "transport": {
      "status": "confirmed/pending/completed",
      "details": "transport details",
      "next": "next transport"
    },
    "accommodation": {
      "status": "confirmed/pending/completed",
      "details": "accommodation details",
      "checkIn": "check-in details"
    }
  },
  "today": {
    "date": "YYYY-MM-DD",
    "theme": "day theme",
    "highlights": ["main activities"],
    "weather": "weather forecast",
    "recommendations": ["local recommendations"]
  },
  "upcoming": [
    {
      "date": "YYYY-MM-DD",
      "event": "event description",
      "location": "location",
      "time": "HH:MM",
      "type": "activity/transport/accommodation"
    }
  ],
  "alerts": [
    {
      "type": "weather/transport/accommodation/emergency",
      "message": "alert message",
      "severity": "low/medium/high",
      "action": "required action"
    }
  ]
}`,

  // Generate daily itinerary
  generateDailyItinerary: `You are an AI travel planner creating a detailed daily itinerary.

Trip Details: {tripDetails}
Day: {dayNumber}
Date: {date}
Weather: {weather}
User Preferences: {preferences}

Create a daily itinerary in JSON format:
{
  "day": {
    "number": number,
    "date": "YYYY-MM-DD",
    "theme": "day theme/focus",
    "weather": "weather forecast"
  },
  "schedule": {
    "morning": {
      "time": "HH:MM",
      "activity": "activity description",
      "location": "location name",
      "duration": "estimated duration",
      "cost": {
        "amount": number,
        "currency": "string"
      },
      "tips": ["useful tips"],
      "transport": "how to get there"
    },
    "afternoon": {
      "time": "HH:MM",
      "activity": "activity description",
      "location": "location name",
      "duration": "estimated duration",
      "cost": {
        "amount": number,
        "currency": "string"
      },
      "tips": ["useful tips"],
      "transport": "how to get there"
    },
    "evening": {
      "time": "HH:MM",
      "activity": "activity description",
      "location": "location name",
      "duration": "estimated duration",
      "cost": {
        "amount": number,
        "currency": "string"
      },
      "tips": ["useful tips"],
      "transport": "how to get there"
    }
  },
  "meals": {
    "breakfast": {
      "time": "HH:MM",
      "location": "restaurant/cafe name",
      "cuisine": "cuisine type",
      "cost": {
        "amount": number,
        "currency": "string"
      },
      "recommendations": ["dish recommendations"]
    },
    "lunch": {
      "time": "HH:MM",
      "location": "restaurant/cafe name",
      "cuisine": "cuisine type",
      "cost": {
        "amount": number,
        "currency": "string"
      },
      "recommendations": ["dish recommendations"]
    },
    "dinner": {
      "time": "HH:MM",
      "location": "restaurant/cafe name",
      "cuisine": "cuisine type",
      "cost": {
        "amount": number,
        "currency": "string"
      },
      "recommendations": ["dish recommendations"]
    }
  },
  "accommodation": {
    "name": "hotel name",
    "checkIn": "check-in time",
    "checkOut": "check-out time",
    "room": "room details",
    "amenities": ["available amenities"]
  },
  "budget": {
    "dailyBudget": {
      "amount": number,
      "currency": "string"
    },
    "spent": {
      "amount": number,
      "currency": "string"
    },
    "remaining": {
      "amount": number,
      "currency": "string"
    }
  },
  "localInsights": {
    "language": ["useful phrases"],
    "culture": ["cultural tips"],
    "safety": ["safety tips"],
    "emergency": ["emergency contacts"]
  }
}`,

  // Provide personal assistance
  providePersonalAssistance: `You are an AI personal travel assistant providing real-time assistance.

User Question: {userQuestion}
Current Context: {currentContext}
Trip Details: {tripDetails}
User Location: {userLocation}

Provide personalized assistance in JSON format:
{
  "response": "helpful response to user question",
  "type": "information/recommendation/action/emergency",
  "priority": "low/medium/high",
  "actions": [
    {
      "type": "booking/transport/accommodation/activity",
      "description": "action description",
      "url": "action URL if applicable",
      "cost": {
        "amount": number,
        "currency": "string"
      }
    }
  ],
  "recommendations": [
    {
      "type": "restaurant/activity/transport/accommodation",
      "name": "recommendation name",
      "reason": "why recommended",
      "rating": "rating if available",
      "cost": {
        "amount": number,
        "currency": "string"
      }
    }
  ],
  "followUp": {
    "question": "follow-up question if needed",
    "suggestions": ["additional suggestions"]
  }
}`,

  // Generate local insights
  generateLocalInsights: `You are an AI travel guide providing local insights and recommendations.

Destination: {destination}
User Preferences: {preferences}
Current Date: {currentDate}
Weather: {weather}

Generate local insights in JSON format:
{
  "destination": {
    "name": "destination name",
    "country": "country name",
    "timezone": "timezone",
    "currency": "local currency",
    "language": "primary language"
  },
  "culture": {
    "customs": ["local customs"],
    "etiquette": ["cultural etiquette"],
    "traditions": ["local traditions"],
    "festivals": ["current festivals if any"]
  },
  "cuisine": {
    "mustTry": ["must-try dishes"],
    "restaurants": [
      {
        "name": "restaurant name",
        "cuisine": "cuisine type",
        "priceRange": "budget/mid-range/luxury",
        "specialty": "specialty dish"
      }
    ],
    "dietary": ["dietary considerations"]
  },
  "attractions": {
    "historical": ["historical sites"],
    "cultural": ["cultural sites"],
    "natural": ["natural attractions"],
    "entertainment": ["entertainment options"]
  },
  "practical": {
    "transport": ["transport options"],
    "safety": ["safety tips"],
    "health": ["health considerations"],
    "emergency": ["emergency contacts"]
  },
  "seasonal": {
    "currentSeason": "current season",
    "weather": "weather conditions",
    "packing": ["packing recommendations"],
    "activities": ["seasonal activities"]
  }
}`,

  // Handle trip modifications
  handleTripModification: `You are an AI travel assistant handling trip modification requests.

Original Trip: {originalTrip}
Modification Request: {modificationRequest}
User Context: {userContext}

Handle the modification request in JSON format:
{
  "canModify": boolean,
  "modificationType": "date/route/accommodation/activity",
  "impact": {
    "cost": {
      "change": number,
      "currency": "string"
    },
    "schedule": "schedule impact",
    "bookings": ["affected bookings"]
  },
  "alternatives": [
    {
      "option": "alternative option",
      "pros": ["advantages"],
      "cons": ["disadvantages"],
      "cost": {
        "amount": number,
        "currency": "string"
      }
    }
  ],
  "recommendations": [
    {
      "type": "modification/alternative",
      "description": "recommendation description",
      "reasoning": "why recommended"
    }
  ],
  "nextSteps": [
    "list of next steps"
  ]
}`,

  // Generate trip summary
  generateTripSummary: `You are an AI travel assistant creating a comprehensive trip summary.

Trip Details: {tripDetails}
Completed Activities: {completedActivities}
Expenses: {expenses}
Photos: {photos}
User Feedback: {userFeedback}

Create a trip summary in JSON format:
{
  "tripOverview": {
    "destination": "destination name",
    "duration": "trip duration",
    "travelers": "number of travelers",
    "totalCost": {
      "amount": number,
      "currency": "string"
    }
  },
  "highlights": [
    {
      "type": "attraction/restaurant/activity",
      "name": "highlight name",
      "description": "why it was memorable",
      "rating": "user rating",
      "photos": ["photo references"]
    }
  ],
  "expenses": {
    "transport": {
      "amount": number,
      "currency": "string",
      "breakdown": ["expense breakdown"]
    },
    "accommodation": {
      "amount": number,
      "currency": "string",
      "breakdown": ["expense breakdown"]
    },
    "food": {
      "amount": number,
      "currency": "string",
      "breakdown": ["expense breakdown"]
    },
    "activities": {
      "amount": number,
      "currency": "string",
      "breakdown": ["expense breakdown"]
    },
    "miscellaneous": {
      "amount": number,
      "currency": "string",
      "breakdown": ["expense breakdown"]
    }
  },
  "memories": [
    {
      "date": "YYYY-MM-DD",
      "event": "memorable event",
      "location": "location",
      "description": "why it was special"
    }
  ],
  "learnings": [
    {
      "category": "travel/culture/budget",
      "insight": "what was learned",
      "application": "how to apply in future"
    }
  ],
  "recommendations": {
    "return": "recommendation for return visit",
    "similar": ["similar destinations"],
    "improvements": ["suggestions for future trips"]
  },
  "photos": {
    "total": number,
    "highlights": ["best photo moments"],
    "locations": ["photo locations"]
  }
}`,

  // Handle real-time updates
  handleRealTimeUpdates: `You are an AI travel assistant providing real-time updates and alerts.

Trip Status: {tripStatus}
Current Location: {currentLocation}
Recent Events: {recentEvents}
User Context: {userContext}

Provide real-time updates in JSON format:
{
  "status": {
    "current": "current trip status",
    "progress": "trip progress percentage",
    "nextEvent": "next scheduled event"
  },
  "alerts": [
    {
      "type": "weather/transport/accommodation/emergency",
      "message": "alert message",
      "severity": "low/medium/high",
      "action": "required action",
      "timestamp": "alert timestamp"
    }
  ],
  "updates": [
    {
      "type": "booking/weather/transport",
      "message": "update message",
      "impact": "impact on trip",
      "timestamp": "update timestamp"
    }
  ],
  "recommendations": [
    {
      "type": "adjustment/alternative",
      "reason": "why recommended",
      "action": "specific action to take"
    }
  ],
  "weather": {
    "current": "current weather",
    "forecast": "weather forecast",
    "impact": "weather impact on plans"
  },
  "transport": {
    "status": "transport status",
    "delays": ["any delays"],
    "alternatives": ["alternative routes"]
  }
}`,

  // Generate personalized recommendations
  generatePersonalizedRecommendations: `You are an AI travel assistant providing personalized recommendations.

User Profile: {userProfile}
Trip History: {tripHistory}
Current Trip: {currentTrip}
User Preferences: {preferences}

Generate personalized recommendations in JSON format:
{
  "destinations": [
    {
      "name": "destination name",
      "reason": "why recommended for this user",
      "similarity": "similarity to past trips",
      "cost": {
        "amount": number,
        "currency": "string"
      },
      "bestTime": "best time to visit"
    }
  ],
  "activities": [
    {
      "name": "activity name",
      "type": "activity type",
      "reason": "why recommended",
      "difficulty": "easy/medium/hard",
      "cost": {
        "amount": number,
        "currency": "string"
      }
    }
  ],
  "accommodations": [
    {
      "name": "accommodation name",
      "type": "hotel/hostel/apartment",
      "reason": "why recommended",
      "amenities": ["relevant amenities"],
      "cost": {
        "amount": number,
        "currency": "string"
      }
    }
  ],
  "restaurants": [
    {
      "name": "restaurant name",
      "cuisine": "cuisine type",
      "reason": "why recommended",
      "priceRange": "budget/mid-range/luxury",
      "specialties": ["specialty dishes"]
    }
  ],
  "insights": {
    "patterns": ["travel patterns observed"],
    "preferences": ["inferred preferences"],
    "suggestions": ["improvement suggestions"]
  }
}`,

  // Handle emergency situations
  handleEmergency: `You are an AI travel assistant handling emergency situations.

Emergency Type: {emergencyType}
User Location: {userLocation}
Trip Details: {tripDetails}
Emergency Details: {emergencyDetails}

Handle the emergency in JSON format:
{
  "emergencyType": "medical/transport/accommodation/security/natural",
  "severity": "low/medium/high/critical",
  "immediateActions": [
    {
      "action": "immediate action to take",
      "priority": "high/medium/low",
      "contact": "contact information if needed"
    }
  ],
  "contacts": [
    {
      "type": "emergency/police/hospital/embassy",
      "name": "contact name",
      "number": "contact number",
      "address": "contact address"
    }
  ],
  "guidance": {
    "do": ["actions to take"],
    "dont": ["actions to avoid"],
    "nextSteps": ["next steps to follow"]
  },
  "resources": [
    {
      "type": "information/support/service",
      "name": "resource name",
      "description": "resource description",
      "contact": "contact information"
    }
  ],
  "followUp": {
    "timeline": "when to follow up",
    "actions": ["follow-up actions"],
    "monitoring": ["what to monitor"]
  }
}`
};

module.exports = DASHBOARD_PROMPTS; 