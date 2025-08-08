import { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext();

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState('prompt');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        });
      });

      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp,
      };

      setCurrentLocation(location);
      setLocationPermission('granted');
      return location;
    } catch (err) {
      const errorMessage = err.code === 1 ? 'Location permission denied' :
                          err.code === 2 ? 'Location unavailable' :
                          err.code === 3 ? 'Location request timed out' :
                          'Failed to get location';
      
      setError(errorMessage);
      setLocationPermission('denied');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const requestLocationPermission = async () => {
    if (navigator.permissions) {
      try {
        const permission = await navigator.permissions.query({ name: 'geolocation' });
        setLocationPermission(permission.state);
        
        permission.onchange = () => {
          setLocationPermission(permission.state);
        };
      } catch (err) {
        console.error('Error checking location permission:', err);
      }
    }
  };

  const watchLocation = (callback) => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return null;
    }

    return navigator.geolocation.watchPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        };
        
        setCurrentLocation(location);
        if (callback) callback(location);
      },
      (err) => {
        const errorMessage = err.code === 1 ? 'Location permission denied' :
                            err.code === 2 ? 'Location unavailable' :
                            err.code === 3 ? 'Location request timed out' :
                            'Failed to get location';
        
        setError(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const value = {
    currentLocation,
    locationPermission,
    isLoading,
    error,
    getCurrentLocation,
    watchLocation,
    requestLocationPermission,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}; 