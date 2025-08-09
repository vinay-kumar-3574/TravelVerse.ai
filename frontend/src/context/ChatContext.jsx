import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { chatService } from '../features/ChatInterface/chatService';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTrip, setCurrentTrip] = useState(null);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [userMemory, setUserMemory] = useState(null);
  const [conversationState, setConversationState] = useState({});

  // Load chat history and memory on mount
  useEffect(() => {
    const loadChatData = async () => {
      try {
        // Load chat history
        const historyResponse = await chatService.getChatHistory();
        if (historyResponse.success) {
          setMessages(historyResponse.data.messages || []);
          setCurrentTrip(historyResponse.data.tripContext);
        }

        // Load user memory
        const memoryResponse = await chatService.getUserMemory();
        if (memoryResponse.success) {
          setUserMemory(memoryResponse.data.memory);
          setConversationState(memoryResponse.data.conversationState || {});
        }
      } catch (error) {
        console.error('Error loading chat data:', error);
      }
    };

    loadChatData();
  }, []);

  const sendMessage = useCallback(async (message, options = {}) => {
    try {
      setIsLoading(true);
      
      // Add user message to chat
      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: message,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, userMessage]);

      // Send to AI agent with enhanced context
      const response = await chatService.sendMessage(message, {
        currentTrip,
        familyMembers,
        userMemory,
        conversationState,
        ...options,
      });

      // Add AI response to chat
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: response.data.response,
        data: {
          intent: response.data.intent,
          entities: response.data.entities,
          metadata: response.data.metadata,
          tripData: response.data.metadata?.tripData
        },
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);

      // Update trip data if provided
      if (response.data.metadata?.tripData) {
        setCurrentTrip(response.data.metadata.tripData);
      }

      // Update conversation state
      if (response.data.metadata?.conversationState) {
        setConversationState(response.data.metadata.conversationState);
      }

      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        type: 'error',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [currentTrip, familyMembers, userMemory, conversationState]);

  const clearChat = useCallback(async () => {
    try {
      await chatService.clearChatHistory();
      setMessages([]);
      setCurrentTrip(null);
      setUserMemory(null);
      setConversationState({});
    } catch (error) {
      console.error('Error clearing chat:', error);
    }
  }, []);

  const addFamilyMember = useCallback((member) => {
    setFamilyMembers(prev => [...prev, member]);
  }, []);

  const removeFamilyMember = useCallback((memberId) => {
    setFamilyMembers(prev => prev.filter(member => member.id !== memberId));
  }, []);

  const updateFamilyMember = useCallback((memberId, updates) => {
    setFamilyMembers(prev => 
      prev.map(member => 
        member.id === memberId ? { ...member, ...updates } : member
      )
    );
  }, []);

  const processMultiTurnConversation = useCallback(async (messages) => {
    try {
      const response = await chatService.processMultiTurnConversation(messages);
      return response.data;
    } catch (error) {
      console.error('Error processing multi-turn conversation:', error);
      throw error;
    }
  }, []);

  const getTransportRecommendations = useCallback(async (tripInfo, preferences) => {
    try {
      const response = await chatService.getTransportRecommendations(tripInfo, preferences);
      return response;
    } catch (error) {
      console.error('Error getting transport recommendations:', error);
      throw error;
    }
  }, []);

  const getHotelRecommendations = useCallback(async (tripInfo, preferences) => {
    try {
      const response = await chatService.getHotelRecommendations(tripInfo, preferences);
      return response;
    } catch (error) {
      console.error('Error getting hotel recommendations:', error);
      throw error;
    }
  }, []);

  const generateItinerary = useCallback(async (tripInfo, days) => {
    try {
      const response = await chatService.generateItinerary(tripInfo, days);
      return response;
    } catch (error) {
      console.error('Error generating itinerary:', error);
      throw error;
    }
  }, []);

  const getWeatherInfo = useCallback(async (location, date) => {
    try {
      const response = await chatService.getWeatherInfo(location, date);
      return response;
    } catch (error) {
      console.error('Error getting weather info:', error);
      throw error;
    }
  }, []);

  const translateText = useCallback(async (text, targetLanguage) => {
    try {
      const response = await chatService.translateText(text, targetLanguage);
      return response;
    } catch (error) {
      console.error('Error translating text:', error);
      throw error;
    }
  }, []);

  const getEmergencyInfo = useCallback(async (location, emergencyType) => {
    try {
      const response = await chatService.getEmergencyInfo(location, emergencyType);
      return response;
    } catch (error) {
      console.error('Error getting emergency info:', error);
      throw error;
    }
  }, []);

  const value = {
    messages,
    isLoading,
    currentTrip,
    familyMembers,
    userMemory,
    conversationState,
    sendMessage,
    clearChat,
    addFamilyMember,
    removeFamilyMember,
    updateFamilyMember,
    setCurrentTrip,
    processMultiTurnConversation,
    getTransportRecommendations,
    getHotelRecommendations,
    generateItinerary,
    getWeatherInfo,
    translateText,
    getEmergencyInfo,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}; 