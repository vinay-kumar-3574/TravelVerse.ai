# TravelVerse AI Agent

The AI Agent is the central intelligence system of TravelVerse, providing intelligent travel assistance through various specialized pipelines.

## Overview

The AI Agent consists of multiple specialized pipelines that handle different aspects of travel planning and assistance. Each pipeline is designed to be modular, intelligent, and focused on specific travel-related tasks.

## Architecture

```
ai-agent/
├── ai-config.js          # Central AI configuration and utilities
├── pipelines/            # Specialized AI pipelines
│   ├── onboardingAgent.js
│   ├── tripPlanner.js
│   ├── transportAdvisor.js
│   ├── bookingAgent.js
│   ├── hotelSelector.js
│   ├── dashboardAgent.js
│   ├── sosHandler.js
│   ├── budgetPlanner.js
│   └── whatIfScenario.js
├── translator/           # Translation services
│   └── index.js
└── README.md
```

## AI Configuration (`ai-config.js`)

Central configuration for OpenAI API integration and common AI utilities.

### Features:
- OpenAI API configuration with GPT-4 model
- System prompts for different contexts
- Helper functions for chat completions
- Entity extraction utilities
- Recommendation generation

### Usage:
```javascript
const { createChatCompletion, extractEntities } = require('./ai-config');

// Create a chat completion
const response = await createChatCompletion(prompt);

// Extract entities from text
const entities = await extractEntities(text);
```

## AI Pipelines

### 1. Onboarding Agent (`onboardingAgent.js`)

Handles the multi-step user onboarding process.

**Features:**
- Multi-stage onboarding flow
- Basic details collection
- Travel preferences setup
- Document requirements
- Emergency contact setup
- Consent management

**Stages:**
1. Basic Details
2. Travel Preferences
3. Travel Documents
4. Emergency Contact
5. Consent

**Usage:**
```javascript
const OnboardingAgent = require('./pipelines/onboardingAgent');
const agent = new OnboardingAgent();

const result = await agent.processOnboardingStep(
  userId, 
  currentStage, 
  userInput, 
  existingData
);
```

### 2. Trip Planner (`tripPlanner.js`)

Core trip planning intelligence that extracts trip details and generates comprehensive plans.

**Features:**
- Trip detail extraction from natural language
- Trip data validation
- Transport mode recommendations
- Itinerary generation
- Budget breakdown calculation
- Comprehensive trip planning

**Usage:**
```javascript
const TripPlanner = require('./pipelines/tripPlanner');
const planner = new TripPlanner();

const tripPlan = await planner.planTrip(tripDetails);
```

### 3. Transport Advisor (`transportAdvisor.js`)

Intelligently suggests transport modes and handles transport-related decisions.

**Features:**
- Transport mode recommendations
- Seat preference suggestions
- Cost calculations
- Transport validation
- Alternative transport options
- Route complexity analysis

**Usage:**
```javascript
const TransportAdvisor = require('./pipelines/transportAdvisor');
const advisor = new TransportAdvisor();

const recommendation = await advisor.suggestTransportMode(tripDetails);
```

### 4. Booking Agent (`bookingAgent.js`)

Simulates booking processes for flights, trains, buses, and hotels.

**Features:**
- Flight booking simulation
- Train booking simulation
- Bus booking simulation
- Hotel booking simulation
- Confirmation email generation
- Booking validation

**Usage:**
```javascript
const BookingAgent = require('./pipelines/bookingAgent');
const agent = new BookingAgent();

const booking = await agent.processBooking(bookingDetails);
```

### 5. Hotel Selector (`hotelSelector.js`)

Recommends hotels based on budget, location, and preferences.

**Features:**
- Hotel recommendations
- Cost calculations
- Hotel validation
- Alternative options
- Safety analysis
- Special requirements handling

**Usage:**
```javascript
const HotelSelector = require('./pipelines/hotelSelector');
const selector = new HotelSelector();

const hotels = await selector.recommendHotels(tripDetails, remainingBudget);
```

### 6. Dashboard Agent (`dashboardAgent.js`)

Provides post-booking intelligent features and trip management.

**Features:**
- Trip overview generation
- Daily itinerary planning
- Language translation
- Personal assistance
- Budget planning
- What-if scenarios
- SOS handling
- Trip summaries

**Usage:**
```javascript
const DashboardAgent = require('./pipelines/dashboardAgent');
const agent = new DashboardAgent();

const overview = await agent.generateTripOverview(tripData);
```

### 7. SOS Handler (`sosHandler.js`)

Provides emergency assistance and safety information.

**Features:**
- Emergency situation handling
- Emergency contact information
- Safety guidance
- Risk assessment
- Medical assistance
- Lost/stolen item handling
- Natural disaster guidance

**Usage:**
```javascript
const SOSHandler = require('./pipelines/sosHandler');
const handler = new SOSHandler();

const emergencyResponse = await handler.handleEmergency(
  emergencyType, 
  location, 
  tripData
);
```

### 8. Budget Planner (`budgetPlanner.js`)

Intelligent budget management and financial planning.

**Features:**
- Budget plan creation
- Expense tracking
- Budget optimization
- Daily budget calculation
- Cost estimates
- Savings recommendations
- Spending pattern analysis

**Usage:**
```javascript
const BudgetPlanner = require('./pipelines/budgetPlanner');
const planner = new BudgetPlanner();

const budgetPlan = await planner.createBudgetPlan(tripData);
```

### 9. What-If Scenario (`whatIfScenario.js`)

Analyzes alternative plans and contingency scenarios.

**Features:**
- Scenario analysis
- Contingency planning
- Weather impact analysis
- Transport disruption handling
- Budget change analysis
- Health emergency planning
- Political unrest analysis

**Usage:**
```javascript
const WhatIfScenario = require('./pipelines/whatIfScenario');
const scenario = new WhatIfScenario();

const analysis = await scenario.analyzeScenario(
  scenarioType, 
  scenario, 
  tripData
);
```

## Translator Module (`translator/index.js`)

Provides multi-language translation services for travelers.

**Features:**
- Text translation
- Common phrase generation
- Language tips
- Signs and menu translation
- Emergency translations
- Language guides
- Cultural context

**Usage:**
```javascript
const Translator = require('./translator');
const translator = new Translator();

const translation = await translator.translateText(
  text, 
  fromLanguage, 
  toLanguage
);
```

## Integration with Backend

The AI Agent integrates seamlessly with the backend through the AI Controller:

```javascript
// backend/src/controllers/aiController.js
const TripPlanner = require('../../ai-agent/pipelines/tripPlanner');
const BookingAgent = require('../../ai-agent/pipelines/bookingAgent');

// Process chat messages with AI
const response = await processMessageWithAI(message, context);
```

## Error Handling

All pipelines include comprehensive error handling:

```javascript
try {
  const result = await pipeline.process(data);
  return result;
} catch (error) {
  console.error('Pipeline error:', error);
  throw new Error('Failed to process request');
}
```

## Configuration

The AI Agent uses environment variables for configuration:

```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4-1106-preview
OPENAI_TEMPERATURE=0.7
OPENAI_MAX_TOKENS=2000
```

## Best Practices

1. **Modularity**: Each pipeline handles a specific domain
2. **Error Handling**: Comprehensive error handling in all pipelines
3. **Validation**: Input validation before AI processing
4. **Caching**: Consider caching frequent AI responses
5. **Rate Limiting**: Implement rate limiting for API calls
6. **Logging**: Comprehensive logging for debugging
7. **Testing**: Unit tests for each pipeline

## Performance Considerations

1. **Async Processing**: All AI operations are asynchronous
2. **Response Caching**: Cache common AI responses
3. **Batch Processing**: Group similar requests
4. **Timeout Handling**: Implement timeouts for AI calls
5. **Fallback Responses**: Provide fallback responses for AI failures

## Security

1. **Input Sanitization**: Sanitize all user inputs
2. **API Key Protection**: Secure API key storage
3. **Rate Limiting**: Prevent abuse of AI services
4. **Data Privacy**: Ensure user data privacy
5. **Validation**: Validate all AI responses

## Future Enhancements

1. **Voice Integration**: Add voice processing capabilities
2. **Image Recognition**: Process travel-related images
3. **Real-time Updates**: Live travel updates
4. **Multi-language Support**: Enhanced language support
5. **Personalization**: User-specific AI responses
6. **Predictive Analytics**: Predict travel patterns
7. **Integration APIs**: Connect with real travel APIs

## Troubleshooting

### Common Issues:

1. **API Rate Limits**: Implement exponential backoff
2. **Response Timeouts**: Increase timeout values
3. **Memory Issues**: Monitor memory usage
4. **Network Errors**: Implement retry logic
5. **Validation Errors**: Check input formats

### Debug Mode:

Enable debug logging for detailed error information:

```javascript
process.env.DEBUG = 'ai-agent:*';
```

## Contributing

When adding new pipelines or modifying existing ones:

1. Follow the established pattern
2. Include comprehensive error handling
3. Add proper documentation
4. Include unit tests
5. Update this README
6. Follow the naming conventions
7. Include usage examples

## License

This AI Agent is part of the TravelVerse project and follows the same licensing terms. 