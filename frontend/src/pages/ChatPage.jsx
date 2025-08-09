import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { 
  Send, 
  Plus, 
  Globe, 
  Zap, 
  ChevronDown, 
  User, 
  Users, 
  Settings, 
  LogOut,
  Heart,
  MessageSquare,
  MapPin,
  Calendar,
  CreditCard
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../features/ChatInterface/ChatWindow';
import MessageInput from '../features/ChatInterface/MessageInput';

const ChatPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { messages, isLoading, familyMembers } = useChat();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 overflow-auto">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        user={user}
        familyMembers={familyMembers}
        onLogout={handleLogout}
      />

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <Users className="w-5 h-5 text-slate-300" />
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">TravelVerse</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-slate-300 text-sm">
                <span>GPT-5</span>
                <Zap className="w-4 h-4" />
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg hover:bg-slate-700 transition-colors">
                  <Settings className="w-5 h-5 text-slate-300" />
                </button>
                <button 
                  onClick={handleLogout}
                  className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <LogOut className="w-5 h-5 text-slate-300" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6">
            <ChatWindow messages={messages} isLoading={isLoading} />
          </div>

          {/* Input Area - Lovable.dev Style */}
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Main Input Box */}
                <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-xl p-4">
                  <textarea
                    placeholder="Ask TravelVerse to create a trip from Chennai to Dubai with 4 people and 10,000 INR budget..."
                    className="w-full bg-transparent text-white placeholder-slate-400 resize-none outline-none text-lg"
                    rows="3"
                    style={{ minHeight: '80px' }}
                  />
                  
                  {/* Bottom Controls */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-600">
                    {/* Left Controls */}
                    <div className="flex items-center space-x-2">
                      <button className="p-2 rounded-lg hover:bg-slate-700 transition-colors">
                        <Plus className="w-4 h-4 text-slate-400" />
                      </button>
                      
                      <button className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors">
                        <Globe className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-300">Public</span>
                      </button>
                      
                      <button className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors">
                        <Zap className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-slate-300">Supabase</span>
                        <ChevronDown className="w-3 h-3 text-slate-400" />
                      </button>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors">
                        <Zap className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-300">GPT-5</span>
                      </button>
                      
                      <button className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105">
                        <Send className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-4 flex items-center space-x-2">
                  <span className="text-sm text-slate-400">Quick actions:</span>
                  <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                    Plan a trip
                  </button>
                  <span className="text-slate-600">•</span>
                  <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                    Add family member
                  </button>
                  <span className="text-slate-600">•</span>
                  <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                    Check weather
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;