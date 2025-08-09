import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Calendar, 
  MapPin, 
  Plane, 
  Train, 
  Bus, 
  FileText, 
  Phone, 
  Heart,
  ArrowRight,
  ArrowLeft,
  Check
} from 'lucide-react';
import toast from 'react-hot-toast';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Basic Details
    fullName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    language: 'English',
    phone: '',
    
    // Step 2: Travel Preferences
    preferredTransport: '',
    
    // Step 3: Documents
    passportNumber: '',
    passportExpiry: '',
    visaNumber: '',
    visaExpiry: '',
    govtId: '',
    passengerType: '',
    
    // Step 4: Emergency Contact
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelationship: '',
    
    // Step 5: Consent
    termsAccepted: false,
    marketingAccepted: false,
  });

  const steps = [
    { id: 1, title: 'Basic Details', icon: <User className="w-5 h-5" /> },
    { id: 2, title: 'Travel Mode', icon: <Plane className="w-5 h-5" /> },
    { id: 3, title: 'Documents', icon: <FileText className="w-5 h-5" /> },
    { id: 4, title: 'Emergency Contact', icon: <Phone className="w-5 h-5" /> },
    { id: 5, title: 'Consent', icon: <Check className="w-5 h-5" /> },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const userData = {
        fullName: formData.fullName,
        contactNumber: formData.phone, // <-- This matches backend expectation
        ...formData
      };
      const result = await updateUser(userData);
      if (result.success) {
        toast.success('Profile completed successfully!');
        navigate('/chat');
      } else {
        toast.error('Failed to save profile');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to save profile');
      console.error('Onboarding error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Tell us about yourself</h2>
        <p className="text-slate-400">Help us personalize your travel experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Nationality</label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., Indian"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Preferred Language</label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Chinese">Chinese</option>
            <option value="Japanese">Japanese</option>
            <option value="Arabic">Arabic</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="+91 98765 43210"
          />
        </div>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Preferred Travel Mode</h2>
        <p className="text-slate-400">How do you usually prefer to travel?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { value: 'flight', label: 'Flight', icon: <Plane className="w-8 h-8" />, description: 'Air travel' },
          { value: 'train', label: 'Train', icon: <Train className="w-8 h-8" />, description: 'Rail travel' },
          { value: 'bus', label: 'Bus', icon: <Bus className="w-8 h-8" />, description: 'Road travel' },
        ].map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, preferredTransport: option.value }))}
            className={`p-6 rounded-xl border-2 transition-all duration-200 ${
              formData.preferredTransport === option.value
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
            }`}
          >
            <div className="text-center">
              <div className="text-slate-300 mb-3">{option.icon}</div>
              <h3 className="text-white font-semibold mb-1">{option.label}</h3>
              <p className="text-slate-400 text-sm">{option.description}</p>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Travel Documents</h2>
        <p className="text-slate-400">Please provide your travel document information</p>
      </div>

      <div className="space-y-6">
        {formData.preferredTransport === 'flight' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Passport Number</label>
                <input
                  type="text"
                  name="passportNumber"
                  value={formData.passportNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter passport number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Passport Expiry</label>
                <input
                  type="date"
                  name="passportExpiry"
                  value={formData.passportExpiry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Visa Number (if applicable)</label>
                <input
                  type="text"
                  name="visaNumber"
                  value={formData.visaNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter visa number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Visa Expiry</label>
                <input
                  type="date"
                  name="visaExpiry"
                  value={formData.visaExpiry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </>
        )}

        {(formData.preferredTransport === 'train' || formData.preferredTransport === 'bus') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Government ID</label>
              <input
                type="text"
                name="govtId"
                value={formData.govtId}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Aadhar, PAN, etc."
              />
            </div>
            {formData.preferredTransport === 'train' && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Passenger Type</label>
                <select
                  name="passengerType"
                  value={formData.passengerType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select type</option>
                  <option value="adult">Adult</option>
                  <option value="child">Child</option>
                  <option value="senior">Senior Citizen</option>
                </select>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Emergency Contact</h2>
        <p className="text-slate-400">Who should we contact in case of emergency?</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Contact Name</label>
          <input
            type="text"
            name="emergencyName"
            value={formData.emergencyName}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter contact name"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
            <input
              type="tel"
              name="emergencyPhone"
              value={formData.emergencyPhone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="+91 98765 43210"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Relationship</label>
            <input
              type="text"
              name="emergencyRelationship"
              value={formData.emergencyRelationship}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., Spouse, Parent"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderStep5 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Almost Done!</h2>
        <p className="text-slate-400">Please review and accept our terms</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="w-5 h-5 text-purple-500 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 focus:ring-2 mt-1"
          />
          <div className="text-sm text-slate-300">
            I agree to the{' '}
            <a href="/terms" className="text-purple-400 hover:text-purple-300 transition-colors">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            name="marketingAccepted"
            checked={formData.marketingAccepted}
            onChange={handleChange}
            className="w-5 h-5 text-purple-500 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 focus:ring-2 mt-1"
          />
          <div className="text-sm text-slate-300">
            I would like to receive travel updates and promotional offers (optional)
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 overflow-auto">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                  currentStep >= step.id
                    ? 'border-purple-500 bg-purple-500 text-white'
                    : 'border-slate-600 text-slate-400'
                }`}>
                  {currentStep > step.id ? <Check className="w-5 h-5" /> : step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 transition-all ${
                    currentStep > step.id ? 'bg-purple-500' : 'bg-slate-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h3 className="text-white font-semibold">{steps[currentStep - 1].title}</h3>
            <p className="text-slate-400 text-sm">Step {currentStep} of {steps.length}</p>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
          <AnimatePresence mode="wait">
            {renderCurrentStep()}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-600">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoading || !formData.termsAccepted}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Completing...' : 'Complete Setup'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;