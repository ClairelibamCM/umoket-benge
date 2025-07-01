import React, { useState } from 'react';
import { 
  Home, 
  Search, 
  Wallet, 
  ShoppingBag, 
  Heart, 
  MessageCircle, 
  Trophy, 
  Settings, 
  Package, 
  Users, 
  BarChart3, 
  HelpCircle, 
  Store,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  UserPlus
} from 'lucide-react';
import { useUserType } from '../contexts/UserTypeContext.jsx';

const Sidebar = ({ currentPage, setCurrentPage, isAuthenticated }) => {
  const { userType } = useUserType();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Navigation items pour les acheteurs
  const buyerNavItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'catalog', label: 'Rechercher', icon: Search },
    { id: 'wallet', label: 'Mon Portefeuille', icon: Wallet },
    { id: 'purchases', label: 'Mes Achats', icon: ShoppingBag },
    { id: 'impact', label: 'Mon Impact', icon: Heart },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'heroes', label: 'Ubuntu Heroes', icon: Trophy },
    { id: 'referral', label: 'Parrainage', icon: UserPlus },
    { id: 'settings', label: 'Profil', icon: Settings }
  ];

  // Navigation items pour les vendeurs
  const sellerNavItems = [
    { id: 'seller-home', label: 'Accueil Business', icon: Home },
    { id: 'products', label: 'Mes Produits', icon: Package },
    { id: 'seller-wallet', label: 'Mon Portefeuille', icon: Wallet },
    { id: 'sponsorship', label: 'Mon Parrainage', icon: Users },
    { id: 'sales-analytics', label: 'Mes Ventes', icon: BarChart3 },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'help-requests', label: 'Demandes d\'Aide', icon: HelpCircle },
    { id: 'referral', label: 'Parrainage', icon: UserPlus },
    { id: 'shop-settings', label: 'Ma Boutique', icon: Store }
  ];

  // Navigation items génériques (non connecté)
  const genericNavItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'catalog', label: 'Catalogue', icon: Search },
    { id: 'about', label: 'À Propos', icon: Heart }
  ];

  const getNavItems = () => {
    if (!isAuthenticated) return genericNavItems;
    return userType === 'seller' ? sellerNavItems : buyerNavItems;
  };

  const navItems = getNavItems();

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <span className="font-bold text-gray-900">UmoKet</span>
          </div>
        )}
        
        {/* Toggle button pour desktop */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          )}
        </button>

        {/* Close button pour mobile */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                setIsMobileOpen(false); // Fermer le menu mobile après sélection
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-orange-100 text-orange-700 border border-orange-200'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
              title={isCollapsed ? item.label : ''}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-orange-600' : ''}`} />
              {!isCollapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            UmoKet v1.0
            <br />
            Marketplace Solidaire
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 flex items-center justify-center w-10 h-10 rounded-lg bg-white shadow-lg border border-gray-200"
      >
        <Menu className="h-5 w-5 text-gray-600" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-lg z-50 transition-all duration-300
        ${isCollapsed ? 'w-16' : 'w-64'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <SidebarContent />
      </div>

      {/* Spacer pour le contenu principal */}
      <div className={`hidden lg:block transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`} />
    </>
  );
};

export default Sidebar;

