import { useState, useEffect } from 'react';
import { authUtils, authAPI } from '../services/api';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    if (authUtils.isLoggedIn()) {
      try {
        await authAPI.verifyToken();
        setIsAuthenticated(true);
      } catch (error) {
        authUtils.removeToken();
        setIsAuthenticated(false);
      }
    }
    setLoading(false);
  };

  return { isAuthenticated, loading };
};