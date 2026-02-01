import React, { createContext, useContext, useState, useEffect } from 'react';
import { authUtils, authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    if (authUtils.isLoggedIn()) {
      try {
        const response = await authAPI.verifyToken();
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        authUtils.removeToken();
        setIsAuthenticated(false);
        setUser(null);
      }
    }
    setLoading(false);
  };

  const login = async (credentials) => {
    const response = await authAPI.login(credentials);
    authUtils.setToken(response.data.token);
    setIsAuthenticated(true);
    setUser(response.data.user);
    return response.data.user;
  };

  const logout = () => {
    authUtils.removeToken();
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};