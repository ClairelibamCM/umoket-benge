import React, { createContext, useContext, useState } from 'react';

const UserTypeContext = createContext();

export const useUserType = () => {
  const context = useContext(UserTypeContext);
  if (!context) {
    throw new Error('useUserType must be used within a UserTypeProvider');
  }
  return context;
};

export const UserTypeProvider = ({ children }) => {
  const [userType, setUserType] = useState(null);
  const [userProfile, setUserProfile] = useState({
    buyer: {
      balance: 125000,
      ubuntuBalance: 15750,
      totalContributions: 15750,
      vendorsHelped: 8,
      badges: ['Champion Ubuntu', 'Solidaire Actif', 'Mentor Communautaire'],
      monthlyGoal: 20000,
      currentMonthContributions: 15750,
      favoriteVendors: ['aminata_diallo', 'kofi_asante', 'fatou_keita'],
      impactHistory: [
        { vendorId: 'aminata_diallo', amount: 3250, date: '2024-06-20', impact: 'Achat de nouveaux matériaux pour paniers' },
        { vendorId: 'kofi_asante', amount: 2100, date: '2024-06-18', impact: 'Extension de la gamme de tissus Wax' },
        { vendorId: 'fatou_keita', amount: 1800, date: '2024-06-15', impact: 'Amélioration de l\'emballage des épices' }
      ],
      predictions: [
        'Votre prochain achat aidera Aminata à acheter une nouvelle machine à tisser',
        'En achetant 3 produits ce mois, vous débloquerez le badge "Héros Ubuntu"',
        'Vos contributions permettront à 2 nouveaux vendeurs de rejoindre la plateforme'
      ]
    },
    seller: {
      revenue: 450000,
      ubuntuAid: 25000,
      sponsors: 12,
      products: 24,
      salesThisMonth: 18,
      growthGoals: [
        { title: 'Acheter une machine à coudre', target: 150000, current: 89000, deadline: '2024-08-01' },
        { title: 'Embaucher un assistant', target: 80000, current: 25000, deadline: '2024-07-15' }
      ],
      impactStories: [
        { title: 'Nouvelle machine grâce à Ubuntu', description: 'Avec l\'aide reçue, j\'ai pu acheter une machine qui a doublé ma production', date: '2024-05-15' }
      ]
    }
  });

  const switchUserType = (type) => {
    setUserType(type);
  };

  const updateUserProfile = (type, updates) => {
    setUserProfile(prev => ({
      ...prev,
      [type]: { ...prev[type], ...updates }
    }));
  };

  return (
    <UserTypeContext.Provider value={{
      userType,
      setUserType,
      userProfile,
      switchUserType,
      updateUserProfile,
      currentProfile: userProfile[userType]
    }}>
      {children}
    </UserTypeContext.Provider>
  );
};

export default UserTypeContext;

