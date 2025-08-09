import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import { LocationProvider } from './context/LocationContext';
import { ThemeProvider } from './context/ThemeContext';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OnboardingPage from './pages/OnboardingPage';
import ChatPage from './pages/ChatPage';
import DashboardPage from './pages/DashboardPage';
import GuideModePage from './pages/GuideModePage';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
const MainLayout = ({ children }) => (
  <>
    <Navbar />
    <div className="flex-1">{children}</div>
    <Footer />
  </>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ChatProvider>
          <LocationProvider>
            <Router>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} /> {/* LandingPage has its own navbar */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/onboarding" element={<OnboardingPage />} />

                  {/* Protected Routes */}
                  <Route 
                    path="/chat" 
                    element={
                      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
                        <ProtectedRoute>
                          <MainLayout><ChatPage /></MainLayout>
                        </ProtectedRoute>
                      </div>
                    } 
                  />
                  <Route 
                    path="/dashboard" 
                    element={
                      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
                        <ProtectedRoute>
                          <MainLayout><DashboardPage /></MainLayout>
                        </ProtectedRoute>
                      </div>
                    } 
                  />
                  <Route 
                    path="/guide" 
                    element={
                      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
                        <ProtectedRoute>
                          <MainLayout><GuideModePage /></MainLayout>
                        </ProtectedRoute>
                      </div>
                    } 
                  />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>

                {/* Toast Notifications */}
                <Toaster 
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#1e293b',
                      color: '#f8fafc',
                      border: '1px solid #475569',
                    },
                  }}
                />
            </Router>
          </LocationProvider>
        </ChatProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
