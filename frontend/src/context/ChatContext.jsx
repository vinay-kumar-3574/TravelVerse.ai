import { createContext, useContext, useState, useCallback } from 'react';
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

      // Send to AI service
      const response = await chatService.sendMessage(message, {
        currentTrip,
        familyMembers,
        ...options,
      });

      // Add AI response to chat
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: response.content,
        data: response.data,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);

      // Update trip data if provided
      if (response.tripData) {
        setCurrentTrip(response.tripData);
      }

      return response;
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
  }, [currentTrip, familyMembers]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setCurrentTrip(null);
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

  const value = {
    messages,
    isLoading,
    currentTrip,
    familyMembers,
    sendMessage,
    clearChat,
    addFamilyMember,
    removeFamilyMember,
    updateFamilyMember,
    setCurrentTrip,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}; 