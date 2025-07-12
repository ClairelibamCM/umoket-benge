import React, { createContext, useContext, useState } from 'react';

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
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [justRegistered, setJustRegistered] = useState(false);

  const login = (email, password) => {
    // Simulation de connexion
    setIsAuthenticated(true);
    setUser({
      email: email,
      name: 'Utilisateur Test',
      subscription: 'free', // Plan gratuit par défaut
      userType: 'buyer' // Type par défaut
    });
  };

  const register = (email, password, userData) => {
    // Simulation d'inscription
    setIsAuthenticated(true);
    setUser({
      email: email,
      name: `${userData.firstName} ${userData.lastName}`,
      username: userData.username,
      phone: userData.phone,
      city: userData.city,
      country: userData.country,
      subscription: 'free', // Plan gratuit par défaut
      userType: userData.userType
    });
    setJustRegistered(true);
    setShowSubscriptionModal(true); // Afficher le modal après inscription
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setJustRegistered(false);
    setShowSubscriptionModal(false);
  };

  const updateSubscription = (planId) => {
    if (user) {
      setUser({
        ...user,
        subscription: planId
      });
    }
  };

  const closeSubscriptionModal = () => {
    setShowSubscriptionModal(false);
    setJustRegistered(false);
  };

  const openSubscriptionModal = () => {
    setShowSubscriptionModal(true);
  };

  const value = {
    isAuthenticated,
    user,
    showSubscriptionModal,
    justRegistered,
    login,
    register,
    logout,
    updateSubscription,
    closeSubscriptionModal,
    openSubscriptionModal
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

