const { createChatCompletion, extractEntities } = require('../ai-config');

class HotelSelector {
  constructor() {
    this.hotelCategories = {
      BUDGET: 'budget',
      ECONOMY: 'economy',
      MID_RANGE: 'mid-range',
      LUXURY: 'luxury',
      BOUTIQUE: 'boutique'
    };
  }

  async recommendHotels(tripDetails, remainingBudget) {
    try {
      const { destination, travelers, startDate, endDate, preferences } = tripDetails;
      
      const prompt = `
        Recommend hotels for the trip:
        
        Trip Details:
        - Destination: ${destination}
        - Travelers: ${travelers} people
        - Dates: ${startDate} to ${endDate}
        - Remaining Budget: ${remainingBudget} INR
        - Preferences: ${JSON.stringify(preferences || {})}
        
        Consider:
        1. Budget constraints per person per night
        2. Group size and room requirements
        3. Location proximity to attractions
        4. Amenities and comfort level
        5. Safety and reviews
        
        Return a JSON object with hotel recommendations:
        {
          "recommendations": [
            {
              "name": "hotel name",
              "category": "budget/economy/mid-range/luxury",
              "location": "area/district",
              "pricePerNight": "price per night",
              "totalPrice": "total for entire stay",
              "rating": "out of 5",
              "amenities": ["list of amenities"],
              "roomTypes": ["available room types"],
              "pros": ["advantages"],
              "cons": ["disadvantages"],
              "distanceFromCenter": "distance from city center",
              "specialOffers": ["any special offers"]
            }
          ],
          "budgetBreakdown": {
            "totalCost": "total hotel cost",
            "costPerPerson": "cost per person",
            "costPerNight": "cost per night",
            "remainingBudget": "budget after hotel"
          },
          "recommendation": "best hotel choice",
          "reasoning": "why this hotel is recommended"
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Hotel recommendation error:', error);
      throw new Error('Failed to recommend hotels');
    }
  }

  async getHotelDetails(hotelName, destination) {
    try {
      const prompt = `
        Provide detailed information about ${hotelName} in ${destination}:
        
        Return a JSON object with:
        {
          "name": "hotel name",
          "address": "full address",
          "contact": "phone and email",
          "checkIn": "check-in time",
          "checkOut": "check-out time",
          "amenities": ["detailed amenities list"],
          "roomTypes": [
            {
              "type": "room type",
              "capacity": "number of people",
              "price": "price per night",
              "description": "room description"
            }
          ],
          "policies": ["hotel policies"],
          "nearbyAttractions": ["attractions nearby"],
          "transportation": ["transportation options"],
          "reviews": {
            "averageRating": "average rating",
            "totalReviews": "number of reviews",
            "highlights": ["review highlights"]
          }
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Hotel details error:', error);
      throw new Error('Failed to get hotel details');
    }
  }

  async calculateHotelCosts(hotelChoice, tripDetails) {
    try {
      const { travelers, startDate, endDate, remainingBudget } = tripDetails;
      const { name, pricePerNight, roomTypes } = hotelChoice;
      
      const prompt = `
        Calculate detailed hotel costs:
        
        Hotel: ${name}
        Price per night: ${pricePerNight}
        Travelers: ${travelers} people
        Dates: ${startDate} to ${endDate}
        Budget: ${remainingBudget} INR
        
        Return a JSON object with cost breakdown:
        {
          "basePrice": "base price per night",
          "numberOfNights": "total nights",
          "subtotal": "subtotal before taxes",
          "taxes": "taxes and fees",
          "totalCost": "total hotel cost",
          "costPerPerson": "cost per person",
          "roomAllocation": "how many rooms needed",
          "additionalCharges": ["any additional charges"],
          "remainingBudget": "budget after hotel",
          "costPercentage": "percentage of remaining budget used"
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Hotel cost calculation error:', error);
      throw new Error('Failed to calculate hotel costs');
    }
  }

  async validateHotelChoice(hotelChoice, tripDetails) {
    try {
      const { travelers, remainingBudget, preferences } = tripDetails;
      
      const prompt = `
        Validate if the chosen hotel is suitable:
        
        Hotel: ${JSON.stringify(hotelChoice)}
        Travelers: ${travelers} people
        Budget: ${remainingBudget} INR
        Preferences: ${JSON.stringify(preferences || {})}
        
        Return a JSON object with validation:
        {
          "isSuitable": true/false,
          "reasoning": "explanation",
          "warnings": ["any potential issues"],
          "recommendations": ["suggestions"],
          "budgetFeasibility": "high/medium/low",
          "comfortLevel": "high/medium/low",
          "safetyRating": "high/medium/low"
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Hotel validation error:', error);
      throw new Error('Failed to validate hotel choice');
    }
  }

  async getHotelAlternatives(tripDetails, excludeHotel = null) {
    try {
      const { destination, travelers, remainingBudget, preferences } = tripDetails;
      
      const prompt = `
        Suggest alternative hotels for this trip:
        
        Destination: ${destination}
        Travelers: ${travelers} people
        Budget: ${remainingBudget} INR
        Preferences: ${JSON.stringify(preferences || {})}
        Exclude: ${excludeHotel || 'none'}
        
        Return a JSON object with alternatives:
        {
          "alternatives": [
            {
              "name": "hotel name",
              "category": "hotel category",
              "pricePerNight": "price per night",
              "totalPrice": "total cost",
              "pros": ["advantages"],
              "cons": ["disadvantages"],
              "suitability": "high/medium/low"
            }
          ],
          "recommendation": "best alternative hotel",
          "reasoning": "why this alternative is recommended"
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Hotel alternatives error:', error);
      throw new Error('Failed to get hotel alternatives');
    }
  }

  async generateHotelSummary(hotelChoice, tripDetails) {
    try {
      const { destination, travelers, startDate, endDate } = tripDetails;
      
      const prompt = `
        Generate a comprehensive hotel summary:
        
        Hotel: ${JSON.stringify(hotelChoice)}
        Destination: ${destination}
        Travelers: ${travelers} people
        Dates: ${startDate} to ${endDate}
        
        Return a JSON object with summary:
        {
          "summary": "brief overview of hotel choice",
          "keyPoints": ["important points about the hotel"],
          "preparation": ["what travelers need to prepare"],
          "checkInInstructions": "check-in process",
          "amenities": ["key amenities to know"],
          "nearbyAttractions": ["attractions nearby"],
          "transportation": ["transportation options"],
          "tips": ["travel tips for this hotel"],
          "emergencyInfo": "emergency contact information"
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Hotel summary error:', error);
      throw new Error('Failed to generate hotel summary');
    }
  }

  async analyzeLocationSafety(destination, hotelLocation) {
    try {
      const prompt = `
        Analyze the safety of the hotel location:
        
        Destination: ${destination}
        Hotel Location: ${hotelLocation}
        
        Return a JSON object with safety analysis:
        {
          "safetyRating": "high/medium/low",
          "factors": ["factors affecting safety"],
          "recommendations": ["safety recommendations"],
          "risks": ["potential risks"],
          "safeAreas": ["safe areas nearby"],
          "avoidAreas": ["areas to avoid"],
          "emergencyContacts": ["local emergency contacts"],
          "travelAdvisories": ["any travel advisories"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Location safety analysis error:', error);
      throw new Error('Failed to analyze location safety');
    }
  }

  async getSpecialRequirements(travelers, preferences) {
    try {
      const prompt = `
        Analyze special requirements for hotel booking:
        
        Travelers: ${travelers} people
        Preferences: ${JSON.stringify(preferences || {})}
        
        Return a JSON object with special requirements:
        {
          "accessibility": ["accessibility requirements"],
          "dietary": ["dietary requirements"],
          "medical": ["medical requirements"],
          "family": ["family-friendly requirements"],
          "business": ["business requirements"],
          "specialRequests": ["any special requests"],
          "roomRequirements": ["specific room requirements"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Special requirements error:', error);
      throw new Error('Failed to get special requirements');
    }
  }
}

module.exports = HotelSelector; 