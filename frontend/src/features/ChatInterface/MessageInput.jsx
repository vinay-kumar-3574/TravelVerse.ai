import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Plus, 
  Globe, 
  Zap, 
  ChevronDown, 
  Paperclip,
  Smile,
  Mic
} from 'lucide-react';
import { useChat } from '../../context/ChatContext';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef(null);
  const { sendMessage, isLoading } = useChat();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const trimmedMessage = message.trim();
    setMessage('');
    setIsTyping(false);

    try {
      await sendMessage(trimmedMessage);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const quickActions = [
    'Plan a trip',
    'Add family member',
    'Check weather',
    'Find hotels',
    'Book flights',
    'Emergency help'
  ];

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main Input Box */}
        <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-xl p-4 transition-all duration-200 hover:border-slate-500 focus-within:border-purple-500">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask TravelVerse to create a trip from Chennai to Dubai with 4 people and 10,000 INR budget..."
            className="w-full bg-transparent text-white placeholder-slate-400 resize-none outline-none text-lg min-h-[80px] max-h-[120px]"
            disabled={isLoading}
          />
          
          {/* Bottom Controls */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-600">
            {/* Left Controls */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-slate-700 transition-colors group"
                title="Add attachment"
              >
                <Plus className="w-4 h-4 text-slate-400 group-hover:text-slate-300" />
              </button>
              
              <button
                type="button"
                className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
                title="Visibility settings"
              >
                <Globe className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-300">Public</span>
              </button>
              
              <button
                type="button"
                className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
                title="Database integration"
              >
                <Zap className="w-4 h-4 text-green-400" />
                <span className="text-sm text-slate-300">Supabase</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            </div>

            {/* Right Controls */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
                title="AI Model"
              >
                <Zap className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-300">GPT-5</span>
              </button>
              
              <motion.button
                type="submit"
                disabled={!message.trim() || isLoading}
                className={`p-2 rounded-lg transition-all duration-200 transform ${
                  message.trim() && !isLoading
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-105'
                    : 'bg-slate-700 cursor-not-allowed'
                }`}
                whileHover={message.trim() && !isLoading ? { scale: 1.05 } : {}}
                whileTap={message.trim() && !isLoading ? { scale: 0.95 } : {}}
              >
                <Send className="w-4 h-4 text-white" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {!isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center flex-wrap gap-2"
          >
            <span className="text-sm text-slate-400">Quick actions:</span>
            {quickActions.map((action, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setMessage(action)}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors hover:underline"
              >
                {action}
              </button>
            ))}
          </motion.div>
        )}

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2 text-sm text-slate-400"
          >
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span>Typing...</span>
          </motion.div>
        )}
      </form>
    </div>
  );
};

export default MessageInput; 