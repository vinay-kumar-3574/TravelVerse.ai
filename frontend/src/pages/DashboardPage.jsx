import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { useLocation } from '../context/LocationContext';
// Modular dashboard components
import TripOverview from '../features/Dashboard/Overview/TripOverview';
import WeatherWidget from '../features/Dashboard/Overview/WeatherWidget';
import UpcomingEventsWidget from '../features/Dashboard/Overview/UpcomingEventsWidget';
import DayPlanner from '../features/Dashboard/Planner/DayPlanner';
import TranslatorBox from '../features/Dashboard/Translator/TranslatorBox';
import BudgetChart from '../features/Dashboard/BudgetPlanner/BudgetChart';
import BudgetForm from '../features/Dashboard/BudgetPlanner/BudgetForm';
import ScenarioSelector from '../features/Dashboard/WhatIfScenarios/ScenarioSelector';
import ScenarioResult from '../features/Dashboard/WhatIfScenarios/ScenarioResult';
import SOSButton from '../features/Dashboard/SOS/SOSButton';
import SOSContacts from '../features/Dashboard/SOS/SOSContacts';
import TripSummary from '../features/Dashboard/Summary/TripSummary';
import DownloadSummaryButton from '../features/Dashboard/Summary/DownloadSummaryButton';
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <TripOverview
          daysLeft={5}
          returnDate="Dec 25, 2024"
          location={currentLocation ? `${currentLocation.latitude.toFixed(4)}, ${currentLocation.longitude.toFixed(4)}` : 'Getting location...'}
          travelers={familyMembers.length + 1}
        />
      </motion.div>

      {weather && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <WeatherWidget weather={weather} />
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <UpcomingEventsWidget events={[{ title: 'Desert Safari', time: 'Today 3:00 PM' }, { title: 'Dinner & Show', time: '7:00 PM' }]} />
      </motion.div>
    </div>
  );

  const renderTripPlanner = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Today's Itinerary</h3>
        <DayPlanner
          items={[
            { time: '09:00', activity: 'Breakfast at Hotel', location: 'Hotel Restaurant' },
            { time: '10:30', activity: 'Visit Burj Khalifa', location: 'Downtown Dubai' },
            { time: '13:00', activity: 'Lunch at Mall', location: 'Dubai Mall' },
            { time: '15:00', activity: 'Desert Safari', location: 'Dubai Desert' },
            { time: '19:00', activity: 'Dinner & Show', location: 'Dubai Opera' }
          ]}
        />
      </div>
    </div>
  );

  const renderTranslator = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Language Translator</h3>
        <TranslatorBox />
      </div>
    </div>
  );

  const renderBudget = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
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
        <BudgetChart categories={budget.categories} />
        <div className="mt-6">
          <h4 className="text-white font-medium mb-2">Adjust Budget</h4>
          <BudgetForm initial={budget.categories} onChange={(next)=>{
            setBudget((b)=> ({ ...b, categories: next, spent: Object.values(next).reduce((a,c)=>a+c,0), remaining: b.total - Object.values(next).reduce((a,c)=>a+c,0) }))
          }} />
        </div>
      </div>
    </div>
  );

  const renderScenarios = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">What If Scenarios</h3>
        <ScenarioSelector onSelect={(s)=> setScenario({ title: s, actions: defaultScenarioActions[s] || [] })} />
        <div className="mt-4">
          <ScenarioResult title={scenario.title} actions={scenario.actions} />
        </div>
      </div>
    </div>
  );

  const renderSOS = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">Emergency</h3>
        <SOSButton onClick={()=>{/* wire sos */}} />
        <SOSContacts contacts={[
          { name: 'Police', number: '999' },
          { name: 'Ambulance', number: '998' },
          { name: 'Fire Department', number: '997' },
          { name: 'Hotel Front Desk', number: '+971-4-123-4567' },
        ]} />
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">Trip Summary</h3>
        <TripSummary places={[ 'Burj Khalifa', 'Desert Safari', 'Dubai Mall', 'Palm Jumeirah' ]} expenses={budget.categories} />
        <DownloadSummaryButton data={{ places: [ 'Burj Khalifa', 'Desert Safari' ], expenses: budget.categories }} />
      </div>
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