import React, { useState, useEffect } from 'react';
import { 
  User, 
  UserPlus, 
  UserCheck, 
  MapPin, 
  Calendar, 
  Star, 
  Package, 
  Heart, 
  MessageCircle,
  Share2,
  MoreHorizontal,
  Award,
  TrendingUp,
  Users
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCurrency } from '../contexts/CurrencyContext';

const UserProfile = ({ userId, onClose }) => {
  const { user } = useAuth();
  const { formatPrice } = useCurrency();
  const [profileData, setProfileData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userPosts, setUserPosts] = useState([]);

  // Données simulées pour les profils utilisateurs
  const profilesData = {
    'marie_artisan': {
      id: 'marie_artisan',
      name: 'Marie Kouam',
      username: '@marie_artisan',
      avatar: '👩‍🎨',
      type: 'seller',
      verified: false,
      location: 'Douala, Cameroun',
      joinDate: '2023-03-15',
      bio: 'Artisane passionnée spécialisée dans les sacs en raphia et accessoires traditionnels camerounais. Chaque pièce raconte une histoire de notre patrimoine.',
      stats: {
        followers: 1247,
        following: 89,
        posts: 156,
        products: 23,
        rating: 4.8,
        sales: 342
      },
      badges: ['Artisan Vérifié', 'Top Vendeur', 'Éco-responsable']
    },
    'jean_tech': {
      id: 'jean_tech',
      name: 'Jean Mballa',
      username: '@jean_tech',
      avatar: '👨‍💻',
      type: 'buyer',
      verified: false,
      location: 'Yaoundé, Cameroun',
      joinDate: '2023-06-20',
      bio: 'Passionné de technologie et fervent supporter de l\'économie locale. J\'aime découvrir et partager les meilleurs produits artisanaux.',
      stats: {
        followers: 456,
        following: 234,
        posts: 89,
        purchases: 67,
        reviews: 45,
        helpGiven: 12500
      },
      badges: ['Acheteur Fidèle', 'Critique Expert', 'Ambassadeur Ubuntu']
    },
    'fatou_cuisine': {
      id: 'fatou_cuisine',
      name: 'Fatou Diallo',
      username: '@fatou_cuisine',
      avatar: '👩‍🍳',
      type: 'seller',
      verified: true,
      location: 'Dakar, Sénégal',
      joinDate: '2022-11-10',
      bio: 'Chef cuisinière et formatrice culinaire. Je partage les secrets de la cuisine ouest-africaine traditionnelle et moderne.',
      stats: {
        followers: 3456,
        following: 145,
        posts: 234,
        products: 45,
        rating: 4.9,
        sales: 1234
      },
      badges: ['Chef Certifié', 'Influenceuse Culinaire', 'Mentor Ubuntu', 'Premium']
    },
    'benge_official': {
      id: 'benge_official',
      name: 'Béngè Official',
      username: '@benge_official',
      avatar: '🏢',
      type: 'seller',
      verified: true,
      isCompany: true,
      location: 'Cameroun',
      joinDate: '2022-01-01',
      bio: 'Plateforme officielle UmoKet - Connecter les communautés africaines à travers le commerce solidaire et l\'innovation technologique.',
      stats: {
        followers: 12456,
        following: 234,
        posts: 456,
        products: 0,
        rating: 5.0,
        impact: 2450000
      },
      badges: ['Compte Officiel', 'Innovateur Social', 'Leader Ubuntu']
    }
  };

  const postsData = {
    'marie_artisan': [
      {
        id: 'mp1',
        content: 'Nouveau modèle de sac en raphia disponible ! Inspiré des motifs traditionnels Bamiléké. 🇨🇲',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        likes: 89,
        comments: 12,
        shares: 8,
        type: 'image',
        media: [{ type: 'image', url: '/api/placeholder/400/300' }]
      },
      {
        id: 'mp2',
        content: 'Merci à tous mes clients pour leur confiance ! Vos retours me motivent chaque jour à créer de plus belles pièces.',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        likes: 156,
        comments: 23,
        shares: 15,
        type: 'text'
      }
    ],
    'jean_tech': [
      {
        id: 'jt1',
        content: 'Excellente expérience d\'achat sur UmoKet ! Le sac de Marie est magnifique et la qualité est au rendez-vous. Je recommande vivement ! 💯',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        likes: 67,
        comments: 15,
        shares: 12,
        type: 'text'
      }
    ],
    'fatou_cuisine': [
      {
        id: 'fc1',
        content: 'Nouveau tutoriel : Comment préparer le thieboudienne parfait ! Toutes les astuces de grand-mère révélées 🍽️',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        likes: 234,
        comments: 56,
        shares: 89,
        type: 'video',
        media: [{ type: 'video', duration: '2:45', thumbnail: '/api/placeholder/400/300' }]
      }
    ]
  };

  useEffect(() => {
    // Simuler le chargement du profil
    setTimeout(() => {
      const profile = profilesData[userId];
      const posts = postsData[userId] || [];
      
      if (profile) {
        setProfileData(profile);
        setUserPosts(posts);
        // Simuler le statut de suivi
        setIsFollowing(Math.random() > 0.5);
      }
      setLoading(false);
    }, 1000);
  }, [userId]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    // Mettre à jour le nombre de followers
    if (profileData) {
      setProfileData({
        ...profileData,
        stats: {
          ...profileData.stats,
          followers: isFollowing 
            ? profileData.stats.followers - 1 
            : profileData.stats.followers + 1
        }
      });
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}min`;
    if (hours < 24) return `${hours}h`;
    return `${days}j`;
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 animate-pulse">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
            <div className="flex-1">
              <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Profil non trouvé</h2>
          <p className="text-gray-600 mb-6">Ce profil utilisateur n'existe pas ou n'est plus disponible.</p>
          <button
            onClick={onClose}
            className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
          >
            Fermer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* En-tête du profil */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-3xl">
                {profileData.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
                  {profileData.verified && (
                    <span className="text-blue-500 text-xl">✓</span>
                  )}
                  {profileData.isCompany && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                      Officiel
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-2">{profileData.username}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {profileData.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Membre depuis {new Date(profileData.joinDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {profileData.id !== user?.id && (
                <button
                  onClick={handleFollow}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    isFollowing
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck className="w-4 h-4" />
                      <span>Suivi</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Suivre</span>
                    </>
                  )}
                </button>
              )}
              
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreHorizontal className="w-5 h-5 text-gray-500" />
              </button>
              
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <span className="text-gray-500 text-xl">×</span>
              </button>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {profileData.badges.map((badge, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                <Award className="w-3 h-3 inline mr-1" />
                {badge}
              </span>
            ))}
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{profileData.stats.followers.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Abonnés</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{profileData.stats.following.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Abonnements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{profileData.stats.posts}</div>
              <div className="text-sm text-gray-500">Publications</div>
            </div>
            <div className="text-center">
              {profileData.type === 'seller' ? (
                <>
                  <div className="text-2xl font-bold text-gray-900">{profileData.stats.rating}</div>
                  <div className="text-sm text-gray-500 flex items-center justify-center">
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    Note moyenne
                  </div>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-gray-900">{profileData.stats.reviews || 0}</div>
                  <div className="text-sm text-gray-500">Avis donnés</div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Publications récentes */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Publications récentes</h2>
          
          {userPosts.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">📝</div>
              <p className="text-gray-500">Aucune publication pour le moment</p>
            </div>
          ) : (
            <div className="space-y-6">
              {userPosts.map((post) => (
                <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{formatTimeAgo(post.timestamp)}</span>
                      {post.type !== 'text' && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {post.type === 'image' ? '📷 Photo' : post.type === 'video' ? '🎥 Vidéo' : '📄 Document'}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-900 mb-3">{post.content}</p>
                  
                  {post.media && post.media.length > 0 && (
                    <div className="mb-3">
                      {post.type === 'image' && (
                        <img 
                          src={post.media[0].url} 
                          alt="Publication" 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      )}
                      {post.type === 'video' && (
                        <div className="relative">
                          <img 
                            src={post.media[0].thumbnail} 
                            alt="Aperçu vidéo" 
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg">
                            <div className="bg-white bg-opacity-90 rounded-full p-2">
                              <span className="text-2xl">▶️</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Share2 className="w-4 h-4" />
                      <span>{post.shares}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

