import React, { useState, useEffect } from 'react';
import { UserPlus, UserCheck, Star, Package, Award, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import UserProfile from './UserProfile';

const SuggestedUsers = ({ maxUsers = 5, showTitle = true }) => {
  const { user } = useAuth();
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState(new Set());
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Données simulées pour les utilisateurs suggérés
  const allUsers = [
    {
      id: 'marie_artisan',
      name: 'Marie Kouam',
      username: '@marie_artisan',
      avatar: '👩‍🎨',
      type: 'seller',
      verified: false,
      location: 'Douala, Cameroun',
      bio: 'Artisane spécialisée dans les sacs en raphia traditionnels',
      stats: {
        followers: 1247,
        products: 23,
        rating: 4.8
      },
      badges: ['Artisan Vérifié', 'Top Vendeur'],
      reason: 'Populaire dans votre région'
    },
    {
      id: 'fatou_cuisine',
      name: 'Fatou Diallo',
      username: '@fatou_cuisine',
      avatar: '👩‍🍳',
      type: 'seller',
      verified: true,
      location: 'Dakar, Sénégal',
      bio: 'Chef cuisinière et formatrice culinaire ouest-africaine',
      stats: {
        followers: 3456,
        products: 45,
        rating: 4.9
      },
      badges: ['Chef Certifié', 'Influenceuse Culinaire'],
      reason: 'Tendance cette semaine'
    },
    {
      id: 'ibrahim_tech',
      name: 'Ibrahim Sow',
      username: '@ibrahim_tech',
      avatar: '👨‍💻',
      type: 'seller',
      verified: false,
      location: 'Bamako, Mali',
      bio: 'Développeur et créateur d\'outils numériques pour artisans',
      stats: {
        followers: 892,
        products: 12,
        rating: 4.7
      },
      badges: ['Innovateur Tech', 'Mentor'],
      reason: 'Basé sur vos intérêts'
    },
    {
      id: 'aisha_mode',
      name: 'Aisha Traoré',
      username: '@aisha_mode',
      avatar: '👗',
      type: 'seller',
      verified: true,
      location: 'Abidjan, Côte d\'Ivoire',
      bio: 'Styliste et créatrice de mode africaine contemporaine',
      stats: {
        followers: 2134,
        products: 67,
        rating: 4.8
      },
      badges: ['Styliste Certifiée', 'Créatrice Tendance'],
      reason: 'Recommandé par vos amis'
    },
    {
      id: 'omar_bijoux',
      name: 'Omar Benali',
      username: '@omar_bijoux',
      avatar: '💎',
      type: 'seller',
      verified: false,
      location: 'Casablanca, Maroc',
      bio: 'Bijoutier traditionnel spécialisé dans l\'argent berbère',
      stats: {
        followers: 756,
        products: 34,
        rating: 4.9
      },
      badges: ['Artisan Traditionnel', 'Qualité Premium'],
      reason: 'Nouveaux talents à découvrir'
    },
    {
      id: 'amina_critique',
      name: 'Amina Hassan',
      username: '@amina_critique',
      avatar: '📝',
      type: 'buyer',
      verified: false,
      location: 'Tunis, Tunisie',
      bio: 'Critique produits et ambassadrice de l\'artisanat africain',
      stats: {
        followers: 1567,
        reviews: 234,
        helpGiven: 45000
      },
      badges: ['Critique Expert', 'Ambassadrice Ubuntu'],
      reason: 'Avis de qualité'
    }
  ];

  useEffect(() => {
    // Simuler le chargement et la sélection d'utilisateurs suggérés
    setTimeout(() => {
      // Mélanger et sélectionner des utilisateurs
      const shuffled = [...allUsers].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, maxUsers);
      setSuggestedUsers(selected);
      
      // Simuler quelques utilisateurs déjà suivis
      setFollowedUsers(new Set(['fatou_cuisine', 'marie_artisan']));
      setLoading(false);
    }, 800);
  }, [maxUsers]);

  const handleFollow = (userId) => {
    const newFollowedUsers = new Set(followedUsers);
    if (newFollowedUsers.has(userId)) {
      newFollowedUsers.delete(userId);
    } else {
      newFollowedUsers.add(userId);
    }
    setFollowedUsers(newFollowedUsers);

    // Mettre à jour le nombre de followers de l'utilisateur
    setSuggestedUsers(users => 
      users.map(u => 
        u.id === userId 
          ? {
              ...u,
              stats: {
                ...u.stats,
                followers: newFollowedUsers.has(userId) 
                  ? u.stats.followers + 1 
                  : u.stats.followers - 1
              }
            }
          : u
      )
    );
  };

  const SkeletonUser = () => (
    <div className="flex items-center space-x-3 p-4 animate-pulse">
      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-1/3"></div>
      </div>
      <div className="w-16 h-8 bg-gray-300 rounded"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {showTitle && (
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Suggestions pour vous</h3>
          </div>
        )}
        <div className="divide-y divide-gray-100">
          {[...Array(maxUsers)].map((_, i) => (
            <SkeletonUser key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {showTitle && (
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">👥 Suggestions pour vous</h3>
            <p className="text-sm text-gray-500 mt-1">Découvrez de nouveaux créateurs et acheteurs</p>
          </div>
        )}
        
        <div className="divide-y divide-gray-100">
          {suggestedUsers.map((suggestedUser) => (
            <div key={suggestedUser.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-3">
                <button
                  onClick={() => setSelectedProfile(suggestedUser.id)}
                  className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-xl hover:scale-105 transition-transform"
                >
                  {suggestedUser.avatar}
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <button
                      onClick={() => setSelectedProfile(suggestedUser.id)}
                      className="font-medium text-gray-900 hover:text-orange-600 transition-colors truncate"
                    >
                      {suggestedUser.name}
                    </button>
                    {suggestedUser.verified && (
                      <span className="text-blue-500 text-sm">✓</span>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      suggestedUser.type === 'seller' 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {suggestedUser.type === 'seller' ? 'Vendeur' : 'Acheteur'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{suggestedUser.bio}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                    <div className="flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {suggestedUser.stats.followers.toLocaleString()} abonnés
                    </div>
                    {suggestedUser.type === 'seller' && (
                      <>
                        <div className="flex items-center">
                          <Package className="w-3 h-3 mr-1" />
                          {suggestedUser.stats.products} produits
                        </div>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 mr-1 text-yellow-500" />
                          {suggestedUser.stats.rating}
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {suggestedUser.badges.slice(0, 2).map((badge, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          <Award className="w-2 h-2 inline mr-1" />
                          {badge}
                        </span>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => handleFollow(suggestedUser.id)}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        followedUsers.has(suggestedUser.id)
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {followedUsers.has(suggestedUser.id) ? (
                        <>
                          <UserCheck className="w-3 h-3" />
                          <span>Suivi</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-3 h-3" />
                          <span>Suivre</span>
                        </>
                      )}
                    </button>
                  </div>
                  
                  <p className="text-xs text-blue-600 mt-2 font-medium">{suggestedUser.reason}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-100">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Voir plus de suggestions →
          </button>
        </div>
      </div>

      {/* Modal de profil utilisateur */}
      {selectedProfile && (
        <UserProfile
          userId={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}
    </>
  );
};

export default SuggestedUsers;

