import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bot, Loader2 } from 'lucide-react';

const ChatWindow = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderMessage = (message) => {
    const isUser = message.type === 'user';
    const isError = message.type === 'error';

    return (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`flex items-start space-x-3 max-w-3xl ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
          {/* Avatar */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isUser 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
              : isError
              ? 'bg-red-500'
              : 'bg-gradient-to-r from-blue-500 to-cyan-500'
          }`}>
            {isUser ? (
              <User className="w-4 h-4 text-white" />
            ) : isError ? (
              <Bot className="w-4 h-4 text-white" />
            ) : (
              <Bot className="w-4 h-4 text-white" />
            )}
          </div>

          {/* Message Content */}
          <div className={`flex-1 ${isUser ? 'text-right' : ''}`}>
            <div className={`inline-block rounded-2xl px-4 py-3 max-w-2xl ${
              isUser 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                : isError
                ? 'bg-red-500/20 border border-red-500/30 text-red-300'
                : 'bg-slate-700/50 backdrop-blur-sm border border-slate-600 text-white'
            }`}>
              <div className="whitespace-pre-wrap">{message.content}</div>
              
              {/* Message Data (for AI responses) */}
              {message.data && !isUser && (
                <div className="mt-3 pt-3 border-t border-slate-600/50">
                  {message.data.tripData && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-slate-300">
                        <span>📍</span>
                        <span>{message.data.tripData.source} → {message.data.tripData.destination}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-slate-300">
                        <span>👥</span>
                        <span>{message.data.tripData.members} people</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-slate-300">
                        <span>💰</span>
                        <span>Budget: {message.data.tripData.budget}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className={`text-xs text-slate-400 mt-1 ${isUser ? 'text-right' : ''}`}>
              {formatTime(message.timestamp)}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="h-full overflow-y-auto">
      <AnimatePresence>
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Welcome to TravelVerse!
            </h3>
            <p className="text-slate-400 max-w-md">
              I'm your AI travel assistant. Tell me about your dream trip and I'll help you plan everything from flights to activities.
            </p>
            <div className="mt-6 space-y-2">
              <p className="text-sm text-slate-500">Try saying:</p>
              <div className="space-y-1">
                <p className="text-sm text-slate-400">"We are 4 people from Chennai to Dubai with 10,000 INR budget"</p>
                <p className="text-sm text-slate-400">"Plan a family vacation to Europe for 2 weeks"</p>
                <p className="text-sm text-slate-400">"Find the best hotels in Tokyo for next month"</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {messages.map(renderMessage)}
            
            {/* Loading Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start mb-4"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-2xl px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                      <span className="text-slate-300">TravelVerse is thinking...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow; 