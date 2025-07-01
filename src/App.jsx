import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import { UserTypeProvider, useUserType } from './contexts/UserTypeContext.jsx';
import { CurrencyProvider } from './contexts/CurrencyContext.jsx';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import HomePage from './pages/HomePage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import CatalogPage from './pages/CatalogPage.jsx';
import ImpactPage from './pages/ImpactPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ReferralPage from './pages/ReferralPage.jsx';

// Pages Acheteur
import WalletPage from './pages/buyer/WalletPage.jsx';
import UbuntuHeroesPage from './pages/buyer/UbuntuHeroesPage.jsx';
import MessagesPage from './pages/buyer/MessagesPage.jsx';
import PurchasesPage from './pages/buyer/PurchasesPage.jsx';

// Pages Vendeur
import SellerHomePage from './pages/seller/SellerHomePage.jsx';
import ProductsPage from './pages/seller/ProductsPage.jsx';
import SellerWalletPage from './pages/seller/SellerWalletPage.jsx';
import SponsorshipPage from './pages/seller/SponsorshipPage.jsx';
import SalesAnalyticsPage from './pages/seller/SalesAnalyticsPage.jsx';
import HelpRequestsPage from './pages/seller/HelpRequestsPage.jsx';
import ShopSettingsPage from './pages/seller/ShopSettingsPage.jsx';

import './App.css';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { isAuthenticated, user } = useAuth();
  const { userType, setUserType } = useUserType();

  // Gestion de la sélection du type d'utilisateur après connexion
  const [showUserTypeSelection, setShowUserTypeSelection] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !userType) {
      setShowUserTypeSelection(true);
    } else {
      setShowUserTypeSelection(false);
    }
  }, [isAuthenticated, userType]);

  const handleUserTypeSelection = (type) => {
    setUserType(type);
    setShowUserTypeSelection(false);
    // Rediriger vers la page d'accueil appropriée
    if (type === 'seller') {
      setCurrentPage('seller-home');
    } else {
      setCurrentPage('home');
    }
  };

  // Affichage de la sélection du type d'utilisateur
  if (showUserTypeSelection) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Choisissez votre profil</h2>
            <p className="text-gray-600">Comment souhaitez-vous utiliser UmoKet ?</p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => handleUserTypeSelection('buyer')}
              className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🛒</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Acheteur</h3>
                  <p className="text-sm text-gray-600">Je veux acheter des produits et soutenir la communauté</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => handleUserTypeSelection('seller')}
              className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-200 text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🏪</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Vendeur</h3>
                  <p className="text-sm text-gray-600">Je veux vendre mes produits et développer mon business</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    if (currentPage === 'auth') {
      return <AuthPage />;
    }

    if (currentPage === 'about') {
      return <AboutPage />;
    }

    if (currentPage === 'referral') {
      return <ReferralPage />;
    }

    // Pages pour les acheteurs
    if (!userType || userType === 'buyer') {
      switch (currentPage) {
        case 'home':
          return <HomePage />;
        case 'catalog':
          return <CatalogPage />;
        case 'dashboard':
          return <DashboardPage />;
        case 'wallet':
          return <WalletPage />;
        case 'impact':
          return <ImpactPage />;
        case 'purchases':
          return <PurchasesPage />;
        case 'messages':
          return <MessagesPage />;
        case 'heroes':
          return <UbuntuHeroesPage />;
        case 'settings':
          return <SettingsPage />;
        default:
          return <HomePage />;
      }
    }

    // Pages pour les vendeurs
    if (userType === 'seller') {
      switch (currentPage) {
        case 'seller-home':
          return <SellerHomePage />;
        case 'products':
          return <ProductsPage />;
        case 'seller-wallet':
          return <SellerWalletPage />;
        case 'sponsorship':
          return <SponsorshipPage />;
        case 'sales-analytics':
          return <SalesAnalyticsPage />;
        case 'messages':
          return <MessagesPage />;
        case 'help-requests':
          return <HelpRequestsPage />;
        case 'shop-settings':
          return <ShopSettingsPage />;
        default:
          return <SellerHomePage />;
      }
    }

    return <HomePage />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header setCurrentPage={setCurrentPage} />
      
      <div className="flex">
        <Sidebar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          isAuthenticated={isAuthenticated}
        />
        
        <main className="flex-1 min-h-screen pt-16">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <UserTypeProvider>
        <CurrencyProvider>
          <AppContent />
        </CurrencyProvider>
      </UserTypeProvider>
    </AuthProvider>
  );
}

export default App;

