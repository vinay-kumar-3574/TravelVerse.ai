import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  Users, 
  Plus, 
  Settings, 
  LogOut, 
  Heart,
  MapPin,
  Calendar,
  CreditCard,
  Globe,
  Shield,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';

const Sidebar = ({ isOpen, onClose, user, familyMembers, onLogout }) => {
  const { addFamilyMember } = useChat();

  const navigationItems = [
    { icon: <Globe className="w-5 h-5" />, label: 'My Trips', href: '/dashboard' },
    { icon: <Users className="w-5 h-5" />, label: 'Family Members', href: '#family' },
    { icon: <MapPin className="w-5 h-5" />, label: 'Saved Places', href: '#places' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Itineraries', href: '#itineraries' },
    { icon: <CreditCard className="w-5 h-5" />, label: 'Bookings', href: '#bookings' },
    { icon: <Shield className="w-5 h-5" />, label: 'Emergency', href: '#emergency' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-80 bg-slate-800/95 backdrop-blur-xl border-r border-slate-700 z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">TravelVerse</span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-slate-700 transition-colors lg:hidden"
                >
                  <X className="w-5 h-5 text-slate-300" />
                </button>
              </div>

              {/* Profile Section */}
              <div className="mb-8">
                <div className="bg-slate-700/50 rounded-xl p-4 mb-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">
                        {user?.fullName || 'Traveler'}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {user?.email || 'traveler@example.com'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-slate-600/50 rounded-lg p-2">
                      <p className="text-slate-400">Nationality</p>
                      <p className="text-white font-medium">
                        {user?.nationality || 'Not set'}
                      </p>
                    </div>
                    <div className="bg-slate-600/50 rounded-lg p-2">
                      <p className="text-slate-400">Language</p>
                      <p className="text-white font-medium">
                        {user?.language || 'English'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="mb-8">
                <h3 className="text-slate-400 text-sm font-medium mb-3 uppercase tracking-wider">
                  Navigation
                </h3>
                <nav className="space-y-1">
                  {navigationItems.map((item, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Family Members */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">
                    Family Members
                  </h3>
                  <button className="p-1 rounded-lg hover:bg-slate-700 transition-colors">
                    <Plus className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
                
                <div className="space-y-2">
                  {familyMembers.length > 0 ? (
                    familyMembers.map((member, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">
                            {member.name}
                          </p>
                          <p className="text-slate-400 text-xs">
                            {member.relationship}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <Users className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                      <p className="text-slate-400 text-sm">
                        No family members added yet
                      </p>
                      <button className="text-purple-400 text-sm hover:text-purple-300 transition-colors mt-1">
                        Add family member
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Settings & Logout */}
              <div className="border-t border-slate-700 pt-6">
                <div className="space-y-1">
                  <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors">
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar; 