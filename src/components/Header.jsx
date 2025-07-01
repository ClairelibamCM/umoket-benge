import React from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Search, ShoppingCart, User, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import CurrencySelector from './CurrencySelector.jsx';

const Header = ({ setCurrentPage }) => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      setCurrentPage('auth');
    }
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
            <h1 className="text-2xl font-bold text-orange-600">UmoKet</h1>
            <span className="ml-2 text-sm text-gray-600">Marketplace Solidaire</span>
          </div>

          {/* Barre de recherche */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Rechercher des produits..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation et actions */}
          <div className="flex items-center space-x-4">
            {/* Sélecteur de devises */}
            <CurrencySelector />
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-600 hover:text-orange-600"
              onClick={() => setCurrentPage('about')}
            >
              À Propos
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-600 hover:text-orange-600"
              onClick={() => setCurrentPage('referral')}
            >
              Parrainage
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-600 hover:text-orange-600"
              onClick={() => setCurrentPage('impact')}
            >
              <Heart className="h-4 w-4 mr-1" />
              Mon Impact
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-orange-600">
              <ShoppingCart className="h-4 w-4 mr-1" />
              Panier
            </Button>
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Bonjour, {user?.name || 'Utilisateur'}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-600 hover:text-orange-600"
                  onClick={handleAuthClick}
                >
                  Déconnexion
                </Button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-600 hover:text-orange-600"
                onClick={handleAuthClick}
              >
                <User className="h-4 w-4 mr-1" />
                Connexion
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

