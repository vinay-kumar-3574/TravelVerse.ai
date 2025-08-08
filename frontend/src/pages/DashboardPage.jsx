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
  IndianRupee
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { currentTrip, familyMembers } = useChat();
  const { currentLocation, getCurrentLocation } = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [weather, setWeather] = useState(null);
  const [budget, setBudget] = useState({
    total: 10000,
    spent: 3500,
    remaining: 6500,
    categories: {
      transport: 2000,
      accommodation: 1000,
      food: 300,
      activities: 200
    }
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Globe className="w-5 h-5" /> },
    { id: 'planner', label: 'Trip Planner', icon: <Calendar className="w-5 h-5" /> },
    { id: 'translator', label: 'Translator', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'budget', label: 'Budget', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'scenarios', label: 'What If', icon: <Zap className="w-5 h-5" /> },
    { id: 'sos', label: 'SOS', icon: <Shield className="w-5 h-5" /> },
    { id: 'summary', label: 'Summary', icon: <Activity className="w-5 h-5" /> }
  ];

  useEffect(() => {
    if (!currentLocation) {
      getCurrentLocation();
    }
    // Mock weather data
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

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Trip Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Days Left</h3>
            <Clock className="w-6 h-6 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">5</div>
          <p className="text-slate-400 text-sm">Return on Dec 25, 2024</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Current Location</h3>
            <MapPin className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-lg font-semibold text-white mb-2">Dubai, UAE</div>
          <p className="text-slate-400 text-sm">
            {currentLocation ? `${currentLocation.latitude.toFixed(4)}, ${currentLocation.longitude.toFixed(4)}` : 'Getting location...'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Group Size</h3>
            <Users className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">{familyMembers.length + 1}</div>
          <p className="text-slate-400 text-sm">Travelers</p>
        </motion.div>
      </div>

      {/* Weather Widget */}
      {weather && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Weather</h3>
            <div className="flex items-center space-x-2">
              {weather.icon === 'sun' ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-blue-400" />}
              <span className="text-white font-semibold">{weather.temperature}°C</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-4 h-4 text-red-400" />
              <span className="text-slate-300 text-sm">{weather.temperature}°C</span>
            </div>
            <div className="flex items-center space-x-2">
              <Droplets className="w-4 h-4 text-blue-400" />
              <span className="text-slate-300 text-sm">{weather.humidity}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <Wind className="w-4 h-4 text-gray-400" />
              <span className="text-slate-300 text-sm">{weather.windSpeed} km/h</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sun className="w-4 h-4 text-yellow-400" />
              <span className="text-slate-300 text-sm">{weather.condition}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Book Activity', icon: <Activity className="w-5 h-5" />, color: 'text-purple-400' },
            { label: 'Find Restaurant', icon: <Utensils className="w-5 h-5" />, color: 'text-orange-400' },
            { label: 'Take Photo', icon: <Camera className="w-5 h-5" />, color: 'text-pink-400' },
            { label: 'Shopping', icon: <ShoppingBag className="w-5 h-5" />, color: 'text-green-400' }
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
  );

  const renderTripPlanner = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Today's Itinerary</h3>
        <div className="space-y-4">
          {[
            { time: '09:00', activity: 'Breakfast at Hotel', location: 'Hotel Restaurant', icon: <Utensils className="w-4 h-4" /> },
            { time: '10:30', activity: 'Visit Burj Khalifa', location: 'Downtown Dubai', icon: <Camera className="w-4 h-4" /> },
            { time: '13:00', activity: 'Lunch at Mall', location: 'Dubai Mall', icon: <Utensils className="w-4 h-4" /> },
            { time: '15:00', activity: 'Desert Safari', location: 'Dubai Desert', icon: <Activity className="w-4 h-4" /> },
            { time: '19:00', activity: 'Dinner & Show', location: 'Dubai Opera', icon: <Activity className="w-4 h-4" /> }
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-slate-700/30">
              <div className="text-purple-400 font-semibold min-w-[60px]">{item.time}</div>
              <div className="text-purple-400">{item.icon}</div>
              <div className="flex-1">
                <div className="text-white font-medium">{item.activity}</div>
                <div className="text-slate-400 text-sm">{item.location}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderTranslator = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Language Translator</h3>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <select className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white">
              <option value="en">English</option>
              <option value="ar">Arabic</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
            </select>
            <button className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white">
              <ArrowRight className="w-4 h-4" />
            </button>
            <select className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white">
              <option value="ar">Arabic</option>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
            </select>
          </div>
          <textarea
            placeholder="Enter text to translate..."
            className="w-full h-32 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 resize-none"
          />
          <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all">
            Translate
          </button>
        </div>
      </motion.div>
    </div>
  );

  const renderBudget = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Budget Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{budget.total.toLocaleString()}</div>
            <div className="text-slate-400 text-sm">Total Budget</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{budget.spent.toLocaleString()}</div>
            <div className="text-slate-400 text-sm">Spent</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{budget.remaining.toLocaleString()}</div>
            <div className="text-slate-400 text-sm">Remaining</div>
          </div>
        </div>
        <div className="space-y-3">
          {Object.entries(budget.categories).map(([category, amount]) => (
            <div key={category} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <span className="text-slate-300 capitalize">{category}</span>
              </div>
              <span className="text-white font-semibold">{amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderScenarios = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">What If Scenarios</h3>
        <div className="space-y-4">
          {[
            { scenario: 'Flight gets delayed', action: 'Alternative routes', icon: <Plane className="w-5 h-5" /> },
            { scenario: 'Hotel overbooked', action: 'Nearby alternatives', icon: <Hotel className="w-5 h-5" /> },
            { scenario: 'Weather changes', action: 'Indoor activities', icon: <Thermometer className="w-5 h-5" /> },
            { scenario: 'Budget exceeded', action: 'Cost-cutting options', icon: <CreditCard className="w-5 h-5" /> }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30">
              <div className="flex items-center space-x-3">
                <div className="text-purple-400">{item.icon}</div>
                <div>
                  <div className="text-white font-medium">{item.scenario}</div>
                  <div className="text-slate-400 text-sm">{item.action}</div>
                </div>
              </div>
              <button className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-colors">
                View
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderSOS = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Emergency Contacts</h3>
        <div className="space-y-4">
          {[
            { name: 'Police', number: '999', icon: <Shield className="w-5 h-5" />, color: 'text-blue-400' },
            { name: 'Ambulance', number: '998', icon: <Phone className="w-5 h-5" />, color: 'text-red-400' },
            { name: 'Fire Department', number: '997', icon: <AlertTriangle className="w-5 h-5" />, color: 'text-orange-400' },
            { name: 'Hotel Front Desk', number: '+971-4-123-4567', icon: <Hotel className="w-5 h-5" />, color: 'text-green-400' }
          ].map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30">
              <div className="flex items-center space-x-3">
                <div className={contact.color}>{contact.icon}</div>
                <div>
                  <div className="text-white font-medium">{contact.name}</div>
                  <div className="text-slate-400 text-sm">{contact.number}</div>
                </div>
              </div>
              <button className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors">
                Call
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderSummary = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Trip Summary</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-lg bg-slate-700/30">
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-slate-400 text-sm">Places Visited</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-slate-700/30">
              <div className="text-2xl font-bold text-white">45</div>
              <div className="text-slate-400 text-sm">Photos Taken</div>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-white font-medium">Highlights</h4>
            <ul className="space-y-1 text-slate-300 text-sm">
              <li>• Burj Khalifa - World's tallest building</li>
              <li>• Desert Safari - Adventure experience</li>
              <li>• Dubai Mall - Shopping paradise</li>
              <li>• Palm Jumeirah - Iconic landmark</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'planner': return renderTripPlanner();
      case 'translator': return renderTranslator();
      case 'budget': return renderBudget();
      case 'scenarios': return renderScenarios();
      case 'sos': return renderSOS();
      case 'summary': return renderSummary();
      default: return renderOverview();
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
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">TravelVerse Dashboard</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
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

        {/* Tabs */}
        <div className="border-b border-slate-700">
          <div className="flex overflow-x-auto px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 