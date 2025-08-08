/**
 * General Prompt Templates
 * Contains all GPT prompts used for general AI interactions
 */

const GENERAL_PROMPTS = {
  // Intent recognition
  recognizeIntent: `You are an AI travel assistant. Analyze the user's message and determine their intent.

User Message: "{message}"
Conversation History: {conversationHistory}

Analyze the intent and return in JSON format:
{
  "intent": "onboarding/trip_planning/booking/transport/hotel/dashboard/sos/budget/what_if/translation/general",
  "confidence": number between 0 and 1,
  "entities": {
    "source": "departure location",
    "destination": "arrival location",
    "dates": ["start date", "end date"],
    "travelers": "number of travelers",
    "budget": {
      "amount": number,
      "currency": "string"
    },
    "preferences": ["travel preferences"],
    "urgency": "low/medium/high"
  },
  "context": {
    "conversationStage": "initial/planning/booking/active_trip",
    "userState": "new_user/returning_user/onboarding",
    "previousIntent": "previous intent if any"
  },
  "suggestedResponse": {
    "type": "question/information/action",
    "content": "suggested response",
    "nextStep": "what to do next"
  }
}`,

  // Entity extraction
  extractEntities: `You are an AI assistant extracting entities from user messages.

User Message: "{message}"
Context: {context}

Extract entities and return in JSON format:
{
  "locations": [
    {
      "name": "location name",
      "type": "city/country/airport/hotel/landmark",
      "confidence": number between 0 and 1
    }
  ],
  "dates": [
    {
      "date": "YYYY-MM-DD",
      "type": "start_date/end_date/single_date",
      "confidence": number between 0 and 1
    }
  ],
  "numbers": [
    {
      "value": number,
      "type": "travelers/budget/age/quantity",
      "unit": "currency/people/days",
      "confidence": number between 0 and 1
    }
  ],
  "preferences": [
    {
      "category": "travel_mode/accommodation/activities/budget",
      "value": "preference value",
      "confidence": number between 0 and 1
    }
  ],
  "actions": [
    {
      "verb": "action verb",
      "object": "action object",
      "confidence": number between 0 and 1
    }
  ]
}`,

  // General chat response
  generalChat: `You are TravelVerse, an intelligent AI travel assistant. Respond to the user's message in a helpful, friendly, and knowledgeable manner.

User Message: "{message}"
User Context: {userContext}
Conversation History: {conversationHistory}

Provide a helpful response in JSON format:
{
  "response": "helpful and friendly response",
  "tone": "friendly/professional/enthusiastic",
  "type": "information/recommendation/question/action",
  "suggestions": [
    {
      "type": "follow_up/alternative/related",
      "content": "suggestion content",
      "reason": "why suggested"
    }
  ],
  "nextSteps": [
    "suggested next actions"
  ],
  "personalization": {
    "userName": "user name if known",
    "preferences": ["relevant preferences"],
    "history": ["relevant history"]
  }
}`,

  // Error handling
  handleError: `You are an AI travel assistant handling errors gracefully.

Error Type: {errorType}
Error Details: {errorDetails}
User Context: {userContext}

Handle the error and provide guidance in JSON format:
{
  "errorType": "technical/validation/user_input/network",
  "friendlyMessage": "user-friendly error message",
  "explanation": "what went wrong",
  "solution": "how to fix the issue",
  "alternatives": [
    {
      "option": "alternative approach",
      "description": "description of alternative",
      "pros": ["advantages"],
      "cons": ["disadvantages"]
    }
  ],
  "support": {
    "contact": "support contact information",
    "resources": ["helpful resources"],
    "documentation": ["relevant documentation"]
  },
  "retry": {
    "canRetry": boolean,
    "retryInstructions": "how to retry",
    "timeout": "timeout information if applicable"
  }
}`,

  // Context understanding
  understandContext: `You are an AI assistant understanding conversation context.

Current Message: "{message}"
Conversation History: {conversationHistory}
User Profile: {userProfile}

Analyze the context and return in JSON format:
{
  "conversationFlow": {
    "stage": "initial/planning/booking/active_trip/completion",
    "topic": "main conversation topic",
    "progress": "conversation progress"
  },
  "userIntent": {
    "primary": "primary intent",
    "secondary": "secondary intent if any",
    "implicit": "implicit needs"
  },
  "contextualInfo": {
    "tripDetails": "extracted trip information",
    "userPreferences": "relevant preferences",
    "constraints": "user constraints",
    "timeline": "time-related information"
  },
  "suggestedActions": [
    {
      "action": "suggested action",
      "priority": "high/medium/low",
      "reasoning": "why suggested"
    }
  ],
  "missingInfo": [
    {
      "field": "missing information",
      "importance": "critical/important/optional",
      "suggestion": "how to obtain"
    }
  ]
}`,

  // Response generation
  generateResponse: `You are TravelVerse, an AI travel assistant. Generate a helpful response based on the context.

User Intent: {userIntent}
Context: {context}
Available Information: {availableInfo}

Generate a response in JSON format:
{
  "response": "main response content",
  "style": {
    "tone": "friendly/professional/enthusiastic",
    "length": "brief/medium/detailed",
    "format": "text/list/structured"
  },
  "components": {
    "greeting": "appropriate greeting if needed",
    "mainContent": "main response content",
    "examples": ["relevant examples"],
    "tips": ["useful tips"],
    "closing": "appropriate closing"
  },
  "actions": [
    {
      "type": "button/link/suggestion",
      "text": "action text",
      "url": "action URL if applicable",
      "data": "action data"
    }
  ],
  "followUp": {
    "question": "follow-up question if needed",
    "suggestions": ["additional suggestions"],
    "nextStep": "what to do next"
  }
}`,

  // Personalization
  personalizeResponse: `You are an AI assistant personalizing responses based on user data.

User Profile: {userProfile}
Trip History: {tripHistory}
Preferences: {preferences}
Current Context: {currentContext}

Personalize the response in JSON format:
{
  "personalization": {
    "userName": "user name if available",
    "travelStyle": "user's travel style",
    "preferences": ["relevant preferences"],
    "history": ["relevant trip history"]
  },
  "recommendations": [
    {
      "type": "destination/activity/accommodation",
      "name": "recommendation name",
      "reason": "why recommended for this user",
      "similarity": "similarity to past choices"
    }
  ],
  "customization": {
    "language": "preferred language",
    "currency": "preferred currency",
    "format": "preferred response format",
    "detail": "preferred detail level"
  },
  "insights": {
    "patterns": ["observed travel patterns"],
    "preferences": ["inferred preferences"],
    "suggestions": ["personalization suggestions"]
  }
}`,

  // Multi-turn conversation
  handleMultiTurn: `You are an AI assistant handling multi-turn conversations.

Conversation History: {conversationHistory}
Current Message: "{message}"
User Context: {userContext}

Handle the multi-turn conversation in JSON format:
{
  "conversationAnalysis": {
    "flow": "conversation flow analysis",
    "topics": ["discussed topics"],
    "progress": "conversation progress",
    "unresolved": ["unresolved questions"]
  },
  "contextMaintenance": {
    "previousContext": "previous context",
    "currentContext": "updated context",
    "changes": ["context changes"]
  },
  "response": {
    "content": "contextual response",
    "references": ["references to previous messages"],
    "continuity": "how it continues the conversation"
  },
  "nextSteps": [
    {
      "action": "next action",
      "reasoning": "why this action",
      "timing": "when to take action"
    }
  ],
  "clarification": {
    "needed": boolean,
    "questions": ["clarification questions"],
    "assumptions": ["current assumptions"]
  }
}`,

  // Language detection and translation
  detectLanguage: `You are an AI assistant detecting language and providing translation support.

User Message: "{message}"
Context: {context}

Detect language and provide translation support in JSON format:
{
  "detection": {
    "language": "detected language",
    "confidence": number between 0 and 1,
    "script": "writing script if applicable"
  },
  "translation": {
    "original": "original text",
    "translated": "translated text",
    "targetLanguage": "target language",
    "quality": "translation quality"
  },
  "culturalContext": {
    "region": "geographic region",
    "customs": ["relevant customs"],
    "etiquette": ["cultural etiquette"]
  },
  "languageSupport": {
    "available": ["supported languages"],
    "recommendations": ["language recommendations"],
    "resources": ["language learning resources"]
  }
}`,

  // Sentiment analysis
  analyzeSentiment: `You are an AI assistant analyzing user sentiment and emotional state.

User Message: "{message}"
Conversation History: {conversationHistory}
User Context: {userContext}

Analyze sentiment and return in JSON format:
{
  "sentiment": {
    "primary": "positive/negative/neutral/mixed",
    "intensity": "low/medium/high",
    "confidence": number between 0 and 1
  },
  "emotions": [
    {
      "emotion": "specific emotion",
      "intensity": number between 0 and 1,
      "trigger": "what caused this emotion"
    }
  ],
  "tone": {
    "formality": "formal/informal",
    "urgency": "low/medium/high",
    "satisfaction": "satisfied/neutral/dissatisfied"
  },
  "responseAdjustment": {
    "tone": "appropriate response tone",
    "approach": "how to approach the user",
    "empathy": "empathy level needed"
  },
  "followUp": {
    "needed": boolean,
    "type": "support/clarification/action",
    "timing": "when to follow up"
  }
}`,

  // Accessibility support
  provideAccessibility: `You are an AI assistant providing accessibility support.

User Needs: {accessibilityNeeds}
Context: {context}
Message: "{message}"

Provide accessibility support in JSON format:
{
  "accessibility": {
    "visual": {
      "description": "visual description",
      "contrast": "contrast recommendations",
      "textSize": "text size recommendations"
    },
    "auditory": {
      "transcript": "text transcript",
      "captions": "caption availability",
      "audioDescription": "audio description"
    },
    "mobility": {
      "navigation": "navigation assistance",
      "interaction": "interaction alternatives",
      "physical": "physical accessibility"
    },
    "cognitive": {
      "simplification": "simplified explanation",
      "structure": "clear structure",
      "repetition": "repetition if needed"
    }
  },
  "accommodations": [
    {
      "type": "accommodation type",
      "description": "accommodation description",
      "implementation": "how to implement"
    }
  ],
  "resources": [
    {
      "type": "resource type",
      "name": "resource name",
      "description": "resource description",
      "accessibility": "accessibility features"
    }
  ]
}`,

  // Cultural sensitivity
  provideCulturalSensitivity: `You are an AI assistant providing culturally sensitive responses.

User Culture: {userCulture}
Destination Culture: {destinationCulture}
Context: {context}

Provide culturally sensitive response in JSON format:
{
  "culturalAwareness": {
    "userCulture": {
      "background": "user cultural background",
      "preferences": ["cultural preferences"],
      "sensitivities": ["cultural sensitivities"]
    },
    "destinationCulture": {
      "background": "destination cultural background",
      "customs": ["local customs"],
      "etiquette": ["cultural etiquette"]
    }
  },
  "adaptation": {
    "language": "appropriate language use",
    "tone": "culturally appropriate tone",
    "content": "culturally appropriate content"
  },
  "considerations": [
    {
      "aspect": "cultural aspect",
      "importance": "importance level",
      "guidance": "how to handle"
    }
  ],
  "resources": [
    {
      "type": "cultural resource",
      "name": "resource name",
      "description": "resource description",
      "relevance": "why relevant"
    }
  ]
}`
};

module.exports = GENERAL_PROMPTS; 