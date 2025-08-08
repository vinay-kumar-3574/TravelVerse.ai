import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { useLocation } from '../context/LocationContext';
import { 
  MapPin, 
  Calendar, 
  Users, 
  CreditCard, 
  Globe, 
  Shield, 
  Zap, 
  Heart,
  ArrowRight,
  Clock,
  Thermometer,
  Wind,
  Droplets,
  Sun,
  Moon,
  AlertTriangle,
  Phone,
  MessageSquare,
  Settings,
  LogOut,
  Plane,
  Hotel,
  Car,
  Train,
  Bus,
  Camera,
  Utensils,
  ShoppingBag,
  Activity,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Euro,
  PoundSterling,
  IndianRupee,
  Bot,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Navigation,
  Compass,
  Star,
  Info,
  HelpCircle
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const GuideModePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { currentTrip, familyMembers, sendMessage } = useChat();
  const { currentLocation, getCurrentLocation } = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentPlace, setCurrentPlace] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [guideTips, setGuideTips] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!currentLocation) {
      getCurrentLocation();
    }
    // Mock data
    setCurrentPlace({
      name: 'Burj Khalifa',
      description: 'The world\'s tallest building, standing at 828 meters.',
      rating: 4.8,
      distance: '0.5 km',
      category: 'Landmark',
      tips: [
        'Best time to visit is during sunset',
        'Book tickets in advance to avoid queues',
        'Don\'t forget your camera for amazing views'
      ]
    });
    setNearbyPlaces([
      { name: 'Dubai Mall', distance: '0.2 km', rating: 4.5, category: 'Shopping' },
      { name: 'Dubai Fountain', distance: '0.3 km', rating: 4.7, category: 'Attraction' },
      { name: 'Dubai Opera', distance: '0.8 km', rating: 4.6, category: 'Entertainment' }
    ]);
    setGuideTips([
      'The best time to visit Burj Khalifa is during sunset for amazing views',
      'Book your tickets online to avoid long queues',
      'Don\'t forget to bring your camera for stunning photos',
      'Visit the observation deck on the 124th floor',
      'Combine your visit with Dubai Mall shopping'
    ]);
    setWeather({
      temperature: 28,
      condition: 'Sunny',
      humidity: 65,
      windSpeed: 12,
      icon: 'sun'
    });
  }, [currentLocation, getCurrentLocation]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Here you would implement voice recognition
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const askGuide = async (question) => {
    try {
      await sendMessage(question);
    } catch (error) {
      console.error('Error asking guide:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        user={user}
        familyMembers={familyMembers}
        onLogout={handleLogout}
      />

      {/* Main Content */}
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
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">AI Tour Guide</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleMute}
                className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-slate-300" /> : <Volume2 className="w-5 h-5 text-slate-300" />}
              </button>
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
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* AI Guide Assistant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">AI Tour Guide</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleListening}
                    className={`p-3 rounded-full transition-all ${
                      isListening 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <div className="bg-slate-700/30 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white">
                      Welcome to Dubai! I'm your AI tour guide. I can help you with directions, recommendations, 
                      translations, and answer any questions about your trip. Just ask me anything!
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  'Where should I eat?',
                  'How do I get there?',
                  'What\'s the weather like?',
                  'Translate this for me'
                ].map((question, index) => (
                  <button
                    key={index}
                    onClick={() => askGuide(question)}
                    className="p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors text-left"
                  >
                    <p className="text-sm text-slate-300">{question}</p>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Current Location Info */}
            {currentPlace && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Current Location</h3>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <span className="text-slate-400 text-sm">{currentPlace.distance}</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-xl font-bold text-white">{currentPlace.name}</h4>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-semibold">{currentPlace.rating}</span>
                      </div>
                    </div>
                    <p className="text-slate-300 mb-4">{currentPlace.description}</p>
                    
                    <div className="space-y-2">
                      <h5 className="text-white font-medium">Quick Tips:</h5>
                      <ul className="space-y-1">
                        {currentPlace.tips.map((tip, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-slate-300 text-sm">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Nearby Places */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Nearby Places</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {nearbyPlaces.map((place, index) => (
                  <div key={index} className="bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{place.name}</h4>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-white text-sm">{place.rating}</span>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm mb-2">{place.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 text-sm">{place.distance}</span>
                      <button className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-colors text-sm">
                        Directions
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Weather & Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weather */}
              {weather && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Weather</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {weather.icon === 'sun' ? <Sun className="w-8 h-8 text-yellow-400" /> : <Moon className="w-8 h-8 text-blue-400" />}
                      <div>
                        <div className="text-2xl font-bold text-white">{weather.temperature}°C</div>
                        <div className="text-slate-400">{weather.condition}</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <Droplets className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                      <div className="text-white font-semibold">{weather.humidity}%</div>
                      <div className="text-slate-400 text-sm">Humidity</div>
                    </div>
                    <div className="text-center">
                      <Wind className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                      <div className="text-white font-semibold">{weather.windSpeed} km/h</div>
                      <div className="text-slate-400 text-sm">Wind</div>
                    </div>
                    <div className="text-center">
                      <Thermometer className="w-5 h-5 text-red-400 mx-auto mb-1" />
                      <div className="text-white font-semibold">{weather.temperature}°C</div>
                      <div className="text-slate-400 text-sm">Feels like</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Guide Tips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4">Guide Tips</h3>
                <div className="space-y-3">
                  {guideTips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-slate-300 text-sm">{tip}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Get Directions', icon: <Navigation className="w-5 h-5" />, color: 'text-blue-400' },
                  { label: 'Find Restaurants', icon: <Utensils className="w-5 h-5" />, color: 'text-orange-400' },
                  { label: 'Book Activity', icon: <Activity className="w-5 h-5" />, color: 'text-purple-400' },
                  { label: 'Emergency', icon: <AlertTriangle className="w-5 h-5" />, color: 'text-red-400' }
                ].map((action, index) => (
                  <button
                    key={index}
                    className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
                  >
                    <div className={action.color}>{action.icon}</div>
                    <span className="text-sm text-slate-300">{action.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideModePage; 