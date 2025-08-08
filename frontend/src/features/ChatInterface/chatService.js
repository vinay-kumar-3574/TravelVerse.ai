import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('travelverse_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const chatService = {
  // Send message to AI and get response
  async sendMessage(message, options = {}) {
    try {
      const response = await api.post('/chat/send', {
        message,
        currentTrip: options.currentTrip,
        familyMembers: options.familyMembers,
        context: options.context,
      });
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send message');
    }
  },

  // Parse trip information from user message
  parseTripInfo(message) {
    // This is a simplified parser - in production, you'd use more sophisticated NLP
    const tripInfo = {
      source: null,
      destination: null,
      members: null,
      budget: null,
      dates: null,
      preferences: [],
    };

    // Extract source and destination (basic pattern matching)
    const fromMatch = message.match(/from\s+([A-Za-z\s]+?)(?:\s+to|\s+with|\s+and|\s+for|$)/i);
    const toMatch = message.match(/to\s+([A-Za-z\s]+?)(?:\s+with|\s+and|\s+for|$)/i);
    
    if (fromMatch) tripInfo.source = fromMatch[1].trim();
    if (toMatch) tripInfo.destination = toMatch[1].trim();

    // Extract number of people
    const peopleMatch = message.match(/(\d+)\s+(?:people?|person|member)/i);
    if (peopleMatch) tripInfo.members = parseInt(peopleMatch[1]);

    // Extract budget
    const budgetMatch = message.match(/(\d+(?:,\d+)*)\s*(?:INR|USD|EUR|GBP|budget)/i);
    if (budgetMatch) {
      tripInfo.budget = budgetMatch[1].replace(/,/g, '');
    }

    // Extract dates (basic patterns)
    const datePatterns = [
      /(\d{1,2}\/\d{1,2}\/\d{4})/,
      /(\d{1,2}-\d{1,2}-\d{4})/,
      /(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4})/i,
    ];

    for (const pattern of datePatterns) {
      const match = message.match(pattern);
      if (match) {
        tripInfo.dates = match[1];
        break;
      }
    }

    return tripInfo;
  },

  // Generate AI response based on message type
  async generateResponse(message, tripInfo, familyMembers = []) {
    try {
      const response = await api.post('/chat/generate', {
        message,
        tripInfo,
        familyMembers,
        timestamp: new Date().toISOString(),
      });
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to generate response');
    }
  },

  // Get transport recommendations
  async getTransportRecommendations(tripInfo) {
    try {
      const response = await api.post('/chat/transport', {
        source: tripInfo.source,
        destination: tripInfo.destination,
        members: tripInfo.members,
        budget: tripInfo.budget,
        preferences: tripInfo.preferences,
      });
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get transport recommendations');
    }
  },

  // Get hotel recommendations
  async getHotelRecommendations(tripInfo) {
    try {
      const response = await api.post('/chat/hotels', {
        destination: tripInfo.destination,
        members: tripInfo.members,
        budget: tripInfo.budget,
        dates: tripInfo.dates,
        preferences: tripInfo.preferences,
      });
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get hotel recommendations');
    }
  },

  // Generate daily itinerary
  async generateItinerary(tripInfo, days = 1) {
    try {
      const response = await api.post('/chat/itinerary', {
        destination: tripInfo.destination,
        days,
        members: tripInfo.members,
        budget: tripInfo.budget,
        preferences: tripInfo.preferences,
      });
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to generate itinerary');
    }
  },

  // Get weather information
  async getWeatherInfo(location, date) {
    try {
      const response = await api.post('/chat/weather', {
        location,
        date,
      });
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get weather information');
    }
  },

  // Translate text
  async translateText(text, targetLanguage) {
    try {
      const response = await api.post('/chat/translate', {
        text,
        targetLanguage,
      });
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to translate text');
    }
  },

  // Get emergency information
  async getEmergencyInfo(location) {
    try {
      const response = await api.post('/chat/emergency', {
        location,
      });
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get emergency information');
    }
  },

  // Save trip to user's account
  async saveTrip(tripData) {
    try {
      const response = await api.post('/trips', tripData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to save trip');
    }
  },

  // Get user's saved trips
  async getSavedTrips() {
    try {
      const response = await api.get('/trips');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get saved trips');
    }
  },

  // Update trip
  async updateTrip(tripId, tripData) {
    try {
      const response = await api.put(`/trips/${tripId}`, tripData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update trip');
    }
  },

  // Delete trip
  async deleteTrip(tripId) {
    try {
      const response = await api.delete(`/trips/${tripId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete trip');
    }
  },
}; 