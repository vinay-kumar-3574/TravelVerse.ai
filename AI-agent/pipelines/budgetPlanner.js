const { createChatCompletion, extractEntities } = require('../ai-config');

class BudgetPlanner {
  constructor() {
    this.budgetCategories = {
      TRANSPORT: 'transport',
      ACCOMMODATION: 'accommodation',
      FOOD: 'food',
      ACTIVITIES: 'activities',
      SHOPPING: 'shopping',
      EMERGENCY: 'emergency',
      MISCELLANEOUS: 'miscellaneous'
    };
  }

  async createBudgetPlan(tripData) {
    try {
      const { destination, travelers, budget, startDate, endDate, preferences } = tripData;
      
      const prompt = `
        Create a comprehensive budget plan for the trip:
        
        Trip Details:
        - Destination: ${destination}
        - Travelers: ${travelers} people
        - Total Budget: ${budget} INR
        - Dates: ${startDate} to ${endDate}
        - Preferences: ${JSON.stringify(preferences || {})}
        
        Return a JSON object with budget plan:
        {
          "totalBudget": ${budget},
          "budgetBreakdown": {
            "transport": {
              "allocated": "allocated amount",
              "percentage": "percentage of total",
              "details": "transport cost breakdown"
            },
            "accommodation": {
              "allocated": "allocated amount",
              "percentage": "percentage of total",
              "details": "accommodation cost breakdown"
            },
            "food": {
              "allocated": "allocated amount",
              "percentage": "percentage of total",
              "details": "food cost breakdown"
            },
            "activities": {
              "allocated": "allocated amount",
              "percentage": "percentage of total",
              "details": "activities cost breakdown"
            },
            "shopping": {
              "allocated": "allocated amount",
              "percentage": "percentage of total",
              "details": "shopping budget breakdown"
            },
            "emergency": {
              "allocated": "allocated amount",
              "percentage": "percentage of total",
              "details": "emergency fund breakdown"
            },
            "miscellaneous": {
              "allocated": "allocated amount",
              "percentage": "percentage of total",
              "details": "miscellaneous cost breakdown"
            }
          },
          "dailyBudget": "recommended daily budget",
          "costPerPerson": "cost per person",
          "savingsTips": ["ways to save money"],
          "splurgeRecommendations": ["worthwhile splurges"],
          "budgetWarnings": ["budget warnings"],
          "recommendations": ["budget recommendations"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Budget plan creation error:', error);
      throw new Error('Failed to create budget plan');
    }
  }

  async trackExpenses(tripData, expenses) {
    try {
      const { budget, travelers } = tripData;
      
      const prompt = `
        Track and analyze expenses for the trip:
        
        Trip Details:
        - Total Budget: ${budget} INR
        - Travelers: ${travelers} people
        - Current Expenses: ${JSON.stringify(expenses)}
        
        Return a JSON object with expense tracking:
        {
          "totalSpent": "total amount spent so far",
          "remainingBudget": "remaining budget",
          "budgetUtilization": "percentage of budget used",
          "expenseBreakdown": {
            "transport": "transport expenses",
            "accommodation": "accommodation expenses",
            "food": "food expenses",
            "activities": "activities expenses",
            "shopping": "shopping expenses",
            "miscellaneous": "miscellaneous expenses"
          },
          "dailyAverage": "average daily spending",
          "projectedTotal": "projected total spending",
          "overspending": "amount over budget (if any)",
          "savings": "amount under budget (if any)",
          "alerts": ["budget alerts"],
          "recommendations": ["spending recommendations"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Expense tracking error:', error);
      throw new Error('Failed to track expenses');
    }
  }

  async optimizeBudget(tripData, currentExpenses) {
    try {
      const { budget, travelers, destination } = tripData;
      
      const prompt = `
        Optimize the budget for better value:
        
        Trip Details:
        - Destination: ${destination}
        - Total Budget: ${budget} INR
        - Travelers: ${travelers} people
        - Current Expenses: ${JSON.stringify(currentExpenses)}
        
        Return a JSON object with budget optimization:
        {
          "currentSpending": "current spending analysis",
          "optimizationOpportunities": [
            {
              "category": "expense category",
              "currentCost": "current cost",
              "optimizedCost": "optimized cost",
              "savings": "potential savings",
              "recommendations": ["optimization recommendations"]
            }
          ],
          "totalPotentialSavings": "total potential savings",
          "priorityOptimizations": ["high-priority optimizations"],
          "tradeOffs": ["cost vs. value trade-offs"],
          "recommendations": ["optimization recommendations"],
          "risks": ["risks of optimization"],
          "timeline": "optimization timeline"
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Budget optimization error:', error);
      throw new Error('Failed to optimize budget');
    }
  }

  async calculateDailyBudget(tripData, remainingDays) {
    try {
      const { budget, travelers, destination } = tripData;
      
      const prompt = `
        Calculate daily budget allocation:
        
        Trip Details:
        - Destination: ${destination}
        - Total Budget: ${budget} INR
        - Travelers: ${travelers} people
        - Remaining Days: ${remainingDays}
        
        Return a JSON object with daily budget:
        {
          "totalBudget": ${budget},
          "remainingDays": ${remainingDays},
          "dailyBudget": "recommended daily budget",
          "dailyBreakdown": {
            "food": "daily food budget",
            "activities": "daily activities budget",
            "transport": "daily transport budget",
            "shopping": "daily shopping budget",
            "miscellaneous": "daily miscellaneous budget"
          },
          "weeklyBudget": "recommended weekly budget",
          "budgetTips": ["daily budget tips"],
          "flexibility": "budget flexibility recommendations",
          "emergencyFund": "emergency fund allocation"
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Daily budget calculation error:', error);
      throw new Error('Failed to calculate daily budget');
    }
  }

  async provideCostEstimates(destination, activities, travelers) {
    try {
      const prompt = `
        Provide cost estimates for activities in ${destination}:
        
        Destination: ${destination}
        Activities: ${JSON.stringify(activities)}
        Travelers: ${travelers} people
        
        Return a JSON object with cost estimates:
        {
          "destination": "${destination}",
          "costEstimates": [
            {
              "activity": "activity name",
              "costPerPerson": "cost per person",
              "totalCost": "total cost for group",
              "duration": "activity duration",
              "inclusions": ["what's included"],
              "exclusions": ["what's not included"],
              "tips": ["cost-saving tips"],
              "alternatives": ["cheaper alternatives"]
            }
          ],
          "averageDailyCost": "average daily cost per person",
          "budgetFriendlyOptions": ["budget-friendly alternatives"],
          "luxuryOptions": ["luxury alternatives"],
          "seasonalVariations": ["seasonal cost variations"],
          "bookingTips": ["booking and payment tips"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Cost estimation error:', error);
      throw new Error('Failed to provide cost estimates');
    }
  }

  async generateSavingsRecommendations(tripData, currentExpenses) {
    try {
      const { budget, travelers, destination } = tripData;
      
      const prompt = `
        Generate money-saving recommendations:
        
        Trip Details:
        - Destination: ${destination}
        - Total Budget: ${budget} INR
        - Travelers: ${travelers} people
        - Current Expenses: ${JSON.stringify(currentExpenses)}
        
        Return a JSON object with savings recommendations:
        {
          "totalPotentialSavings": "total potential savings",
          "recommendations": [
            {
              "category": "expense category",
              "currentSpending": "current spending",
              "savingsOpportunity": "potential savings",
              "recommendations": ["specific recommendations"],
              "implementation": "how to implement",
              "timeline": "implementation timeline"
            }
          ],
          "quickWins": ["quick money-saving wins"],
          "longTermSavings": ["long-term savings strategies"],
          "tradeOffs": ["cost vs. value considerations"],
          "risks": ["risks of cost-cutting"],
          "alternatives": ["alternative cost-effective options"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Savings recommendations error:', error);
      throw new Error('Failed to generate savings recommendations');
    }
  }

  async analyzeSpendingPatterns(expenses, tripData) {
    try {
      const { travelers, destination } = tripData;
      
      const prompt = `
        Analyze spending patterns for the trip:
        
        Trip Details:
        - Destination: ${destination}
        - Travelers: ${travelers} people
        - Expenses: ${JSON.stringify(expenses)}
        
        Return a JSON object with spending analysis:
        {
          "spendingPatterns": {
            "highestCategory": "category with highest spending",
            "lowestCategory": "category with lowest spending",
            "trends": ["spending trends"],
            "anomalies": ["spending anomalies"]
          },
          "comparison": {
            "vsBudget": "spending vs. budget comparison",
            "vsAverage": "spending vs. average for destination",
            "vsPreviousTrips": "spending vs. previous trips"
          },
          "insights": ["spending insights"],
          "recommendations": ["spending recommendations"],
          "warnings": ["spending warnings"],
          "opportunities": ["spending optimization opportunities"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Spending pattern analysis error:', error);
      throw new Error('Failed to analyze spending patterns');
    }
  }

  async generateBudgetReport(tripData, expenses) {
    try {
      const { budget, travelers, destination, startDate, endDate } = tripData;
      
      const prompt = `
        Generate a comprehensive budget report:
        
        Trip Details:
        - Destination: ${destination}
        - Total Budget: ${budget} INR
        - Travelers: ${travelers} people
        - Dates: ${startDate} to ${endDate}
        - Expenses: ${JSON.stringify(expenses)}
        
        Return a JSON object with budget report:
        {
          "summary": "budget summary",
          "totalSpent": "total amount spent",
          "remainingBudget": "remaining budget",
          "budgetUtilization": "percentage of budget used",
          "categoryBreakdown": {
            "transport": "transport spending",
            "accommodation": "accommodation spending",
            "food": "food spending",
            "activities": "activities spending",
            "shopping": "shopping spending",
            "miscellaneous": "miscellaneous spending"
          },
          "dailyAverages": "daily spending averages",
          "projections": "spending projections",
          "savings": "total savings achieved",
          "overspending": "overspending (if any)",
          "recommendations": ["budget recommendations"],
          "lessonsLearned": ["budget lessons learned"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Budget report generation error:', error);
      throw new Error('Failed to generate budget report');
    }
  }

  async provideCurrencyAdvice(destination, budget) {
    try {
      const prompt = `
        Provide currency and financial advice for ${destination}:
        
        Budget: ${budget} INR
        
        Return a JSON object with currency advice:
        {
          "destination": "${destination}",
          "localCurrency": "local currency information",
          "exchangeRate": "current exchange rate",
          "bestExchangeOptions": ["best places to exchange money"],
          "paymentMethods": ["accepted payment methods"],
          "creditCardInfo": ["credit card information"],
          "cashAdvice": ["cash handling advice"],
          "bankingOptions": ["banking options"],
          "fees": ["exchange and transaction fees"],
          "safetyTips": ["financial safety tips"],
          "budgetingTips": ["currency-specific budgeting tips"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Currency advice error:', error);
      throw new Error('Failed to provide currency advice');
    }
  }
}

module.exports = BudgetPlanner; 