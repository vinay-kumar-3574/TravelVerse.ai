const { createChatCompletion, extractEntities } = require('../ai-config');

class DashboardAgent {
  constructor() {
    this.dashboardModules = {
      OVERVIEW: 'overview',
      TRIP_PLANNER: 'trip_planner',
      TRANSLATOR: 'translator',
      PERSONAL_ASSISTANT: 'personal_assistant',
      BUDGET_PLANNER: 'budget_planner',
      WHAT_IF: 'what_if',
      SOS: 'sos',
      SUMMARY: 'summary'
    };
  }

  async generateTripOverview(tripData) {
    try {
      const { source, destination, startDate, endDate, travelers, budget, transport, accommodation } = tripData;
      
      const prompt = `
        Generate a comprehensive trip overview:
        
        Trip Details:
        - Source: ${source}
        - Destination: ${destination}
        - Dates: ${startDate} to ${endDate}
        - Travelers: ${travelers} people
        - Budget: ${budget} INR
        - Transport: ${JSON.stringify(transport)}
        - Accommodation: ${JSON.stringify(accommodation)}
        
        Return a JSON object with overview:
        {
          "daysLeft": "days until trip starts",
          "daysRemaining": "days left in trip",
          "currentLocation": "current GPS location (mock)",
          "tripProgress": "percentage of trip completed",
          "alerts": ["important alerts"],
          "notifications": ["recent notifications"],
          "weather": "current weather at destination",
          "localTime": "local time at destination",
          "currency": "local currency information",
          "emergencyContacts": ["local emergency contacts"],
          "keyHighlights": ["trip highlights"],
          "upcomingEvents": ["events during trip dates"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Trip overview error:', error);
      throw new Error('Failed to generate trip overview');
    }
  }

  async planDailyItinerary(tripData, dayNumber) {
    try {
      const { destination, travelers, budget, preferences, startDate } = tripData;
      
      const prompt = `
        Create a detailed daily itinerary for day ${dayNumber}:
        
        Trip Details:
        - Destination: ${destination}
        - Travelers: ${travelers} people
        - Budget: ${budget} INR
        - Preferences: ${JSON.stringify(preferences || {})}
        - Start Date: ${startDate}
        
        Consider:
        1. Local attractions and activities
        2. Weather conditions
        3. Budget constraints
        4. Group size and interests
        5. Transportation options
        6. Meal planning
        
        Return a JSON object with itinerary:
        {
          "day": ${dayNumber},
          "date": "actual date",
          "weather": "weather forecast",
          "schedule": [
            {
              "time": "time slot",
              "activity": "activity name",
              "location": "location",
              "duration": "duration",
              "cost": "estimated cost",
              "description": "activity description",
              "transportation": "how to get there",
              "tips": ["useful tips"]
            }
          ],
          "totalCost": "total cost for the day",
          "budgetRemaining": "budget remaining after this day",
          "recommendations": ["additional recommendations"],
          "backupPlans": ["backup plans for bad weather"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Daily itinerary error:', error);
      throw new Error('Failed to plan daily itinerary');
    }
  }

  async translateText(text, fromLanguage, toLanguage) {
    try {
      const prompt = `
        Translate the following text from ${fromLanguage} to ${toLanguage}:
        
        Text: "${text}"
        
        Return a JSON object with translation:
        {
          "originalText": "${text}",
          "translatedText": "translated text",
          "fromLanguage": "${fromLanguage}",
          "toLanguage": "${toLanguage}",
          "pronunciation": "how to pronounce the translation",
          "context": "when to use this translation",
          "alternatives": ["alternative translations"],
          "culturalNotes": ["cultural context notes"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Translation error:', error);
      throw new Error('Failed to translate text');
    }
  }

  async providePersonalAssistance(userQuery, tripContext) {
    try {
      const prompt = `
        Act as a personal travel assistant and answer the user's question:
        
        User Query: "${userQuery}"
        Trip Context: ${JSON.stringify(tripContext)}
        
        Provide helpful, accurate, and contextual information. Consider:
        1. Current trip location and context
        2. Local customs and culture
        3. Safety considerations
        4. Practical travel advice
        5. Emergency information if needed
        
        Return a JSON object with response:
        {
          "answer": "detailed answer to the query",
          "suggestions": ["related suggestions"],
          "warnings": ["any warnings or cautions"],
          "resources": ["additional resources"],
          "followUpQuestions": ["suggested follow-up questions"],
          "emergencyInfo": "emergency information if relevant"
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Personal assistance error:', error);
      throw new Error('Failed to provide personal assistance');
    }
  }

  async planBudgetBreakdown(tripData, expenses) {
    try {
      const { budget, transport, accommodation, startDate, endDate } = tripData;
      
      const prompt = `
        Create a detailed budget breakdown for the trip:
        
        Trip Details:
        - Total Budget: ${budget} INR
        - Transport Cost: ${JSON.stringify(transport)}
        - Accommodation Cost: ${JSON.stringify(accommodation)}
        - Dates: ${startDate} to ${endDate}
        - Current Expenses: ${JSON.stringify(expenses)}
        
        Return a JSON object with budget breakdown:
        {
          "totalBudget": ${budget},
          "spentSoFar": "amount spent so far",
          "remainingBudget": "remaining budget",
          "breakdown": {
            "transport": "transport cost",
            "accommodation": "accommodation cost",
            "food": "estimated food cost",
            "activities": "activities cost",
            "shopping": "shopping budget",
            "emergency": "emergency fund",
            "miscellaneous": "miscellaneous expenses"
          },
          "dailyBudget": "recommended daily budget",
          "savings": ["ways to save money"],
          "splurge": ["worthwhile splurges"],
          "warnings": ["budget warnings"],
          "recommendations": ["budget recommendations"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Budget planning error:', error);
      throw new Error('Failed to plan budget breakdown');
    }
  }

  async generateWhatIfScenarios(tripData, scenario) {
    try {
      const { destination, travelers, budget, transport, accommodation } = tripData;
      
      const prompt = `
        Generate "what if" scenario analysis:
        
        Trip Details:
        - Destination: ${destination}
        - Travelers: ${travelers} people
        - Budget: ${budget} INR
        - Transport: ${JSON.stringify(transport)}
        - Accommodation: ${JSON.stringify(accommodation)}
        - Scenario: ${scenario}
        
        Return a JSON object with scenario analysis:
        {
          "scenario": "${scenario}",
          "impact": "how this scenario affects the trip",
          "alternatives": [
            {
              "option": "alternative option",
              "cost": "estimated cost",
              "pros": ["advantages"],
              "cons": ["disadvantages"],
              "feasibility": "high/medium/low"
            }
          ],
          "recommendations": ["recommended actions"],
          "risks": ["potential risks"],
          "opportunities": ["potential opportunities"],
          "timeline": "timeline for implementing changes",
          "costImplications": "cost implications"
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('What-if scenario error:', error);
      throw new Error('Failed to generate what-if scenarios');
    }
  }

  async handleSOSRequest(emergencyType, location, tripData) {
    try {
      const { destination, travelers } = tripData;
      
      const prompt = `
        Handle emergency SOS request:
        
        Emergency Type: ${emergencyType}
        Location: ${location}
        Destination: ${destination}
        Travelers: ${travelers} people
        
        Return a JSON object with emergency response:
        {
          "emergencyType": "${emergencyType}",
          "immediateActions": ["immediate actions to take"],
          "emergencyContacts": [
            {
              "service": "service name",
              "number": "phone number",
              "description": "when to call"
            }
          ],
          "location": "current location details",
          "instructions": ["step-by-step instructions"],
          "safetyTips": ["safety tips"],
          "nextSteps": ["next steps after emergency"],
          "prevention": ["how to prevent similar emergencies"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('SOS handling error:', error);
      throw new Error('Failed to handle SOS request');
    }
  }

  async generateTripSummary(tripData, expenses, activities) {
    try {
      const { source, destination, startDate, endDate, travelers, budget } = tripData;
      
      const prompt = `
        Generate a comprehensive trip summary:
        
        Trip Details:
        - Source: ${source}
        - Destination: ${destination}
        - Dates: ${startDate} to ${endDate}
        - Travelers: ${travelers} people
        - Budget: ${budget} INR
        - Expenses: ${JSON.stringify(expenses)}
        - Activities: ${JSON.stringify(activities)}
        
        Return a JSON object with trip summary:
        {
          "overview": "trip overview",
          "highlights": ["trip highlights"],
          "expenses": {
            "totalSpent": "total amount spent",
            "budgetUtilization": "percentage of budget used",
            "categoryBreakdown": "breakdown by category"
          },
          "activities": ["activities completed"],
          "placesVisited": ["places visited"],
          "missedOpportunities": ["missed opportunities"],
          "lessonsLearned": ["lessons learned"],
          "recommendations": ["recommendations for future trips"],
          "memories": ["memorable moments"],
          "ratings": {
            "overall": "overall trip rating",
            "transport": "transport rating",
            "accommodation": "accommodation rating",
            "activities": "activities rating"
          }
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Trip summary error:', error);
      throw new Error('Failed to generate trip summary');
    }
  }

  async getLocalInsights(destination, category = 'general') {
    try {
      const prompt = `
        Provide local insights for ${destination}:
        
        Category: ${category}
        
        Return a JSON object with local insights:
        {
          "destination": "${destination}",
          "category": "${category}",
          "insights": ["local insights"],
          "tips": ["local tips"],
          "customs": ["local customs"],
          "etiquette": ["local etiquette"],
          "language": ["useful phrases"],
          "safety": ["safety tips"],
          "recommendations": ["local recommendations"],
          "avoid": ["things to avoid"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Local insights error:', error);
      throw new Error('Failed to get local insights');
    }
  }
}

module.exports = DashboardAgent; 