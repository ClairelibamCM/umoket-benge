import React from 'react';
import { Button } from '@/components/ui/button.jsx';
import {
  Home,
  Search,
  BarChart3,
  Heart,
  Settings,
  Wallet,
  Trophy,
  MessageCircle,
  ShoppingBag,
  Package,
  Store,
  DollarSign,
  Users,
  Target
} from 'lucide-react';
import { useUserType } from '../contexts/UserTypeContext.jsx';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const { userType } = useUserType();

  const buyerNavItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'catalog', label: 'Rechercher', icon: Search },
    { id: 'wallet', label: 'Mon Portefeuille', icon: Wallet },
    { id: 'purchases', label: 'Mes Achats', icon: ShoppingBag },
    { id: 'impact', label: 'Mon Impact', icon: Heart },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'heroes', label: 'Ubuntu Heroes', icon: Trophy },
    { id: 'settings', label: 'Profil', icon: Settings }
  ];

  const sellerNavItems = [
    { id: 'home', label: 'Accueil Business', icon: Home },
    { id: 'products', label: 'Mes Produits', icon: Package },
    { id: 'seller-wallet', label: 'Mon Portefeuille', icon: DollarSign },
    { id: 'sponsorship', label: 'Mon Parrainage', icon: Users },
    { id: 'sales-analytics', label: 'Mes Ventes', icon: BarChart3 },
    { id: 'help-requests', label: 'Demandes d\'Aide', icon: Target },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'shop-settings', label: 'Ma Boutique', icon: Store }
  ];

  const navItems = userType === 'seller' ? sellerNavItems : buyerNavItems;

  if (!userType) {
    return null; // Ne rien afficher si le type d'utilisateur n'est pas encore défini
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 overflow-x-auto py-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center space-x-2 whitespace-nowrap ${
                  isActive 
                    ? 'bg-orange-500 text-white hover:bg-orange-600' 
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

