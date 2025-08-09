import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../features/Auth/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('travelverse_token');
        if (token) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        }
      } catch (err) {
        localStorage.removeItem('travelverse_token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      const { user: userData, token } = await authService.login(credentials);
      localStorage.setItem('travelverse_token', token);
      setUser(userData);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const signup = async (userData) => {
    try {
      setError(null);
      const { user: newUser, token } = await authService.signup(userData);
      localStorage.setItem('travelverse_token', token);
      setUser(newUser);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('travelverse_token');
    setUser(null);
    setError(null);
  };

  const updateUser = async (userData) => {
    try {
      setError(null);
      const response = await authService.completeOnboarding(userData);
      setUser(response.data.user);
      return { success: true };
    } catch (err) {
      setError(err.message);
      throw new Error(err.message);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 