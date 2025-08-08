const { createChatCompletion, extractEntities } = require('../ai-config');

class WhatIfScenario {
  constructor() {
    this.scenarioTypes = {
      WEATHER: 'weather',
      TRANSPORT: 'transport',
      ACCOMMODATION: 'accommodation',
      BUDGET: 'budget',
      HEALTH: 'health',
      POLITICAL: 'political',
      NATURAL_DISASTER: 'natural_disaster',
      PERSONAL: 'personal'
    };
  }

  async analyzeScenario(scenarioType, scenario, tripData) {
    try {
      const { destination, travelers, budget, transport, accommodation, startDate, endDate } = tripData;
      
      const prompt = `
        Analyze "what if" scenario for the trip:
        
        Scenario Type: ${scenarioType}
        Scenario: ${scenario}
        Trip Details:
        - Destination: ${destination}
        - Travelers: ${travelers} people
        - Budget: ${budget} INR
        - Transport: ${JSON.stringify(transport)}
        - Accommodation: ${JSON.stringify(accommodation)}
        - Dates: ${startDate} to ${endDate}
        
        Return a JSON object with scenario analysis:
        {
          "scenarioType": "${scenarioType}",
          "scenario": "${scenario}",
          "impact": "how this scenario affects the trip",
          "severity": "high/medium/low",
          "probability": "high/medium/low",
          "alternatives": [
            {
              "option": "alternative option",
              "cost": "estimated cost",
              "feasibility": "high/medium/low",
              "pros": ["advantages"],
              "cons": ["disadvantages"],
              "implementation": "how to implement"
            }
          ],
          "recommendations": ["recommended actions"],
          "risks": ["potential risks"],
          "opportunities": ["potential opportunities"],
          "timeline": "timeline for implementing changes",
          "costImplications": "cost implications",
          "prevention": ["prevention measures"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Scenario analysis error:', error);
      throw new Error('Failed to analyze scenario');
    }
  }

  async generateContingencyPlans(tripData, riskFactors) {
    try {
      const { destination, travelers, budget, startDate, endDate } = tripData;
      
      const prompt = `
        Generate contingency plans for the trip:
        
        Trip Details:
        - Destination: ${destination}
        - Travelers: ${travelers} people
        - Budget: ${budget} INR
        - Dates: ${startDate} to ${endDate}
        - Risk Factors: ${JSON.stringify(riskFactors)}
        
        Return a JSON object with contingency plans:
        {
          "riskAssessment": {
            "overallRisk": "overall risk level",
            "riskFactors": ["identified risk factors"],
            "mitigationStrategies": ["risk mitigation strategies"]
          },
          "contingencyPlans": [
            {
              "scenario": "potential scenario",
              "plan": "contingency plan",
              "cost": "estimated cost",
              "timeline": "implementation timeline",
              "resources": ["required resources"],
              "contacts": ["emergency contacts"]
            }
          ],
          "backupOptions": ["backup options"],
          "emergencyFunds": "recommended emergency funds",
          "insurance": ["insurance recommendations"],
          "communicationPlan": ["communication plan"],
          "evacuationPlan": ["evacuation plan"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Contingency plan generation error:', error);
      throw new Error('Failed to generate contingency plans');
    }
  }

  async analyzeWeatherImpact(weatherScenario, tripData) {
    try {
      const { destination, travelers, startDate, endDate, activities } = tripData;
      
      const prompt = `
        Analyze weather impact on the trip:
        
        Weather Scenario: ${weatherScenario}
        Trip Details:
        - Destination: ${destination}
        - Travelers: ${travelers} people
        - Dates: ${startDate} to ${endDate}
        - Activities: ${JSON.stringify(activities || [])}
        
        Return a JSON object with weather impact analysis:
        {
          "weatherScenario": "${weatherScenario}",
          "impact": "how weather affects the trip",
          "affectedActivities": ["activities affected by weather"],
          "alternativeActivities": [
            {
              "activity": "alternative activity",
              "indoor": true/false,
              "cost": "estimated cost",
              "duration": "activity duration"
            }
          ],
          "transportationImpact": "transportation impact",
          "accommodationImpact": "accommodation impact",
          "budgetImpact": "budget implications",
          "safetyConsiderations": ["safety considerations"],
          "recommendations": ["weather-related recommendations"],
          "backupPlans": ["backup plans for bad weather"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Weather impact analysis error:', error);
      throw new Error('Failed to analyze weather impact');
    }
  }

  async analyzeTransportDisruption(disruptionType, tripData) {
    try {
      const { destination, travelers, budget, transport } = tripData;
      
      const prompt = `
        Analyze transport disruption impact:
        
        Disruption Type: ${disruptionType}
        Trip Details:
        - Destination: ${destination}
        - Travelers: ${travelers} people
        - Budget: ${budget} INR
        - Current Transport: ${JSON.stringify(transport)}
        
        Return a JSON object with transport disruption analysis:
        {
          "disruptionType": "${disruptionType}",
          "impact": "how disruption affects the trip",
          "alternativeTransport": [
            {
              "mode": "transport mode",
              "availability": "availability status",
              "cost": "estimated cost",
              "duration": "travel duration",
              "reliability": "reliability rating"
            }
          ],
          "costImplications": "cost implications",
          "timelineImpact": "timeline impact",
          "safetyConsiderations": ["safety considerations"],
          "recommendations": ["transport recommendations"],
          "compensation": ["compensation options"],
          "prevention": ["prevention measures"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Transport disruption analysis error:', error);
      throw new Error('Failed to analyze transport disruption');
    }
  }

  async analyzeBudgetChanges(budgetScenario, tripData) {
    try {
      const { destination, travelers, budget, expenses } = tripData;
      
      const prompt = `
        Analyze budget change impact:
        
        Budget Scenario: ${budgetScenario}
        Trip Details:
        - Destination: ${destination}
        - Travelers: ${travelers} people
        - Current Budget: ${budget} INR
        - Current Expenses: ${JSON.stringify(expenses || [])}
        
        Return a JSON object with budget impact analysis:
        {
          "budgetScenario": "${budgetScenario}",
          "impact": "how budget changes affect the trip",
          "priorityAdjustments": ["priority adjustments"],
          "costCuttingOptions": [
            {
              "category": "expense category",
              "currentCost": "current cost",
              "reducedCost": "reduced cost",
              "savings": "potential savings",
              "impact": "impact on experience"
            }
          ],
          "alternativeOptions": ["alternative budget-friendly options"],
          "savingsStrategies": ["savings strategies"],
          "splurgeRecommendations": ["worthwhile splurges"],
          "riskAssessment": "budget risk assessment",
          "recommendations": ["budget recommendations"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Budget change analysis error:', error);
      throw new Error('Failed to analyze budget changes');
    }
  }

  async analyzeHealthEmergency(healthScenario, tripData) {
    try {
      const { destination, travelers, startDate, endDate } = tripData;
      
      const prompt = `
        Analyze health emergency impact:
        
        Health Scenario: ${healthScenario}
        Trip Details:
        - Destination: ${destination}
        - Travelers: ${travelers} people
        - Dates: ${startDate} to ${endDate}
        
        Return a JSON object with health emergency analysis:
        {
          "healthScenario": "${healthScenario}",
          "severity": "high/medium/low",
          "immediateActions": ["immediate actions"],
          "medicalResources": [
            {
              "type": "medical resource type",
              "location": "location",
              "contact": "contact information",
              "services": ["available services"]
            }
          ],
          "insuranceCoverage": ["insurance coverage details"],
          "costImplications": "medical cost implications",
          "tripModifications": ["trip modifications needed"],
          "recoveryTimeline": "recovery timeline",
          "prevention": ["prevention measures"],
          "emergencyContacts": ["emergency medical contacts"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Health emergency analysis error:', error);
      throw new Error('Failed to analyze health emergency');
    }
  }

  async analyzePoliticalUnrest(politicalScenario, tripData) {
    try {
      const { destination, travelers, startDate, endDate } = tripData;
      
      const prompt = `
        Analyze political unrest impact:
        
        Political Scenario: ${politicalScenario}
        Trip Details:
        - Destination: ${destination}
        - Travelers: ${travelers} people
        - Dates: ${startDate} to ${endDate}
        
        Return a JSON object with political unrest analysis:
        {
          "politicalScenario": "${politicalScenario}",
          "severity": "high/medium/low",
          "safetyAssessment": "safety assessment",
          "travelAdvisories": ["travel advisories"],
          "affectedAreas": ["affected areas"],
          "safeZones": ["safe zones"],
          "evacuationOptions": ["evacuation options"],
          "alternativeDestinations": ["alternative destinations"],
          "embassyContacts": ["embassy contact information"],
          "insuranceCoverage": ["insurance coverage"],
          "recommendations": ["safety recommendations"],
          "monitoring": ["situation monitoring sources"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Political unrest analysis error:', error);
      throw new Error('Failed to analyze political unrest');
    }
  }

  async generatePlanB(tripData, originalPlan) {
    try {
      const { destination, travelers, budget, startDate, endDate } = tripData;
      
      const prompt = `
        Generate Plan B for the trip:
        
        Trip Details:
        - Destination: ${destination}
        - Travelers: ${travelers} people
        - Budget: ${budget} INR
        - Dates: ${startDate} to ${endDate}
        - Original Plan: ${JSON.stringify(originalPlan)}
        
        Return a JSON object with Plan B:
        {
          "planB": {
            "overview": "Plan B overview",
            "modifications": ["modifications from original plan"],
            "cost": "estimated cost",
            "feasibility": "high/medium/low",
            "advantages": ["advantages of Plan B"],
            "disadvantages": ["disadvantages of Plan B"]
          },
          "alternativeDestinations": ["alternative destinations"],
          "alternativeActivities": ["alternative activities"],
          "alternativeTransport": ["alternative transport options"],
          "alternativeAccommodation": ["alternative accommodation"],
          "implementation": ["implementation steps"],
          "timeline": "implementation timeline",
          "costComparison": "cost comparison with original plan"
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Plan B generation error:', error);
      throw new Error('Failed to generate Plan B');
    }
  }

  async analyzeNaturalDisaster(disasterType, tripData) {
    try {
      const { destination, travelers, startDate, endDate } = tripData;
      
      const prompt = `
        Analyze natural disaster impact:
        
        Disaster Type: ${disasterType}
        Trip Details:
        - Destination: ${destination}
        - Travelers: ${travelers} people
        - Dates: ${startDate} to ${endDate}
        
        Return a JSON object with natural disaster analysis:
        {
          "disasterType": "${disasterType}",
          "severity": "high/medium/low",
          "immediateActions": ["immediate safety actions"],
          "evacuationPlan": ["evacuation plan"],
          "shelterOptions": ["shelter options"],
          "emergencyServices": ["emergency services"],
          "communicationPlan": ["communication plan"],
          "alternativeDestinations": ["alternative destinations"],
          "insuranceCoverage": ["insurance coverage"],
          "recoveryTimeline": "recovery timeline",
          "prevention": ["prevention measures"],
          "monitoring": ["disaster monitoring sources"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Natural disaster analysis error:', error);
      throw new Error('Failed to analyze natural disaster');
    }
  }

  async generateScenarioSummary(scenarios, tripData) {
    try {
      const { destination, travelers, budget } = tripData;
      
      const prompt = `
        Generate summary of all scenarios:
        
        Trip Details:
        - Destination: ${destination}
        - Travelers: ${travelers} people
        - Budget: ${budget} INR
        - Scenarios: ${JSON.stringify(scenarios)}
        
        Return a JSON object with scenario summary:
        {
          "overallRisk": "overall risk assessment",
          "scenarioSummary": [
            {
              "type": "scenario type",
              "probability": "probability level",
              "impact": "impact level",
              "preparedness": "preparedness level"
            }
          ],
          "priorityScenarios": ["high-priority scenarios"],
          "preventionMeasures": ["prevention measures"],
          "emergencyPlan": ["emergency plan"],
          "insuranceRecommendations": ["insurance recommendations"],
          "monitoringSources": ["situation monitoring sources"],
          "recommendations": ["overall recommendations"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Scenario summary generation error:', error);
      throw new Error('Failed to generate scenario summary');
    }
  }
}

module.exports = WhatIfScenario; 