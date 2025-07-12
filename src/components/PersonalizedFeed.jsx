import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, UserPlus, UserCheck, Play, Download, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { useSubscription } from '../hooks/useSubscription';
import PostComments from './PostComments';
import SharePost from './SharePost';

const PersonalizedFeed = ({ onCreatePost }) => {
  const { user } = useAuth();
  const { formatPrice } = useCurrency();
  const { hasFeature } = useSubscription();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followedUsers, setFollowedUsers] = useState(new Set());
  const [selectedPostComments, setSelectedPostComments] = useState(null);
  const [selectedPostShare, setSelectedPostShare] = useState(null);

  // Données simulées pour les posts personnalisés
  const personalizedPosts = [
    {
      id: 'p1',
      author: {
        id: 'benge_official',
        name: 'Béngè Official',
        username: '@benge_official',
        avatar: '🏢',
        type: 'seller',
        verified: true,
        isCompany: true
      },
      content: "🎉 Nouvelle fonctionnalité ! Découvrez notre système de publications sociales qui permet aux membres de partager leurs expériences et de rester connectés avec la communauté Ubuntu. #Innovation #CommunautéUbuntu",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 156,
      comments: 23,
      shares: 45,
      liked: false,
      type: 'text',
      isPromoted: true
    },
    {
      id: 'p2',
      author: {
        id: 'marie_artisan',
        name: 'Marie Kouam',
        username: '@marie_artisan',
        avatar: '👩‍🎨',
        type: 'seller',
        verified: false
      },
      content: "Merci à tous mes clients pour leur confiance ! Mes nouveaux sacs en raphia sont maintenant disponibles. Chaque pièce raconte une histoire de notre patrimoine camerounais. 🇨🇲",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 89,
      comments: 12,
      shares: 8,
      liked: true,
      type: 'image',
      media: [
        { type: 'image', url: '/api/placeholder/400/300', alt: 'Sacs en raphia artisanaux' }
      ]
    },
    {
      id: 'p3',
      author: {
        id: 'jean_tech',
        name: 'Jean Mballa',
        username: '@jean_tech',
        avatar: '👨‍💻',
        type: 'buyer',
        verified: false
      },
      content: "Excellente expérience d'achat sur UmoKet ! J'ai trouvé exactement ce que je cherchais et le vendeur a été très professionnel. Le système de paiement solidaire est génial ! 💯",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      likes: 67,
      comments: 15,
      shares: 12,
      liked: false,
      type: 'text'
    },
    {
      id: 'p4',
      author: {
        id: 'fatou_cuisine',
        name: 'Fatou Diallo',
        username: '@fatou_cuisine',
        avatar: '👩‍🍳',
        type: 'seller',
        verified: true
      },
      content: "Nouveau tutoriel de cuisine disponible ! Apprenez à préparer le thieboudienne traditionnel avec des ingrédients locaux. Parfait pour les débutants ! 🍽️",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      likes: 234,
      comments: 56,
      shares: 89,
      liked: true,
      type: 'video',
      media: [
        { type: 'video', url: '/api/placeholder/400/300', duration: '2:45', thumbnail: '/api/placeholder/400/300' }
      ]
    },
    {
      id: 'p5',
      author: {
        id: 'paul_entrepreneur',
        name: 'Paul Nkomo',
        username: '@paul_entrepreneur',
        avatar: '👨‍💼',
        type: 'seller',
        verified: false
      },
      content: "Guide complet pour démarrer son business en ligne en Afrique. Toutes les étapes détaillées avec des exemples concrets et des conseils pratiques.",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      likes: 145,
      comments: 34,
      shares: 67,
      liked: false,
      type: 'pdf',
      media: [
        { type: 'pdf', url: '/api/placeholder/document', title: 'Guide Business en Ligne Afrique.pdf', size: '2.3 MB' }
      ]
    }
  ];

  useEffect(() => {
    // Simuler le chargement des posts
    setTimeout(() => {
      setPosts(personalizedPosts);
      setLoading(false);
    }, 1000);

    // Simuler les utilisateurs suivis
    setFollowedUsers(new Set(['marie_artisan', 'fatou_cuisine', 'benge_official']));
  }, []);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked, 
            likes: post.liked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const handleFollow = (userId) => {
    const newFollowedUsers = new Set(followedUsers);
    if (newFollowedUsers.has(userId)) {
      newFollowedUsers.delete(userId);
    } else {
      newFollowedUsers.add(userId);
    }
    setFollowedUsers(newFollowedUsers);
  };

  const handleShare = (sharedPost) => {
    // Ajouter le post partagé au début du fil
    setPosts([sharedPost, ...posts]);
    setSelectedPostShare(null);
    
    // Mettre à jour le compteur de partages du post original
    setPosts(posts.map(post => 
      post.id === sharedPost.originalPost?.id 
        ? { ...post, shares: post.shares + 1 }
        : post
    ));
  };

  const handleComment = (postId) => {
    setSelectedPostComments(postId);
  };

  const handleShareClick = (post) => {
    setSelectedPostShare(post);
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

  const renderMedia = (post) => {
    if (!post.media || post.media.length === 0) return null;

    const media = post.media[0];

    switch (media.type) {
      case 'image':
        return (
          <div className="mt-3 rounded-lg overflow-hidden">
            <img 
              src={media.url} 
              alt={media.alt || 'Image du post'} 
              className="w-full h-64 object-cover"
            />
          </div>
        );
      
      case 'video':
        return (
          <div className="mt-3 rounded-lg overflow-hidden relative">
            <img 
              src={media.thumbnail} 
              alt="Aperçu vidéo" 
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="bg-white bg-opacity-90 rounded-full p-3">
                <Play className="w-8 h-8 text-gray-800" />
              </div>
            </div>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
              {media.duration}
            </div>
          </div>
        );
      
      case 'pdf':
        return (
          <div className="mt-3 border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-2 rounded">
                <Download className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{media.title}</p>
                <p className="text-sm text-gray-500">{media.size}</p>
              </div>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                Télécharger
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const SkeletonPost = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
      <div className="flex items-start space-x-3">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/6 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📱 Votre Fil d'Actualité</h2>
          <p className="text-gray-600 mb-4">Découvrez les dernières publications de vos abonnements</p>
          {onCreatePost && (
            <button 
              onClick={onCreatePost}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              ✍️ Créer une publication
            </button>
          )}
        </div>
        {[...Array(3)].map((_, i) => (
          <SkeletonPost key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête du fil */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📱 Votre Fil d'Actualité</h2>
        <p className="text-gray-600 mb-4">
          Découvrez les dernières publications de vos abonnements et de la communauté UmoKet
        </p>
        {onCreatePost && (
          <button 
            onClick={onCreatePost}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            ✍️ Créer une publication
          </button>
        )}
      </div>

      {/* Posts */}
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* En-tête du post */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-xl">
                {post.author.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                  {post.author.verified && (
                    <span className="text-blue-500">✓</span>
                  )}
                  {post.author.isCompany && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                      Officiel
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    post.author.type === 'seller' 
                      ? 'bg-orange-100 text-orange-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {post.author.type === 'seller' ? 'Vendeur' : 'Acheteur'}
                  </span>
                  {post.isPromoted && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      Sponsorisé
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>{post.author.username}</span>
                  <span>•</span>
                  <span>{formatTimeAgo(post.timestamp)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Bouton suivre/ne plus suivre */}
              {post.author.id !== user?.id && (
                <button
                  onClick={() => handleFollow(post.author.id)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    followedUsers.has(post.author.id)
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {followedUsers.has(post.author.id) ? (
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
              
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreHorizontal className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Contenu du post */}
          <div className="mb-4">
            <p className="text-gray-900 leading-relaxed">{post.content}</p>
            {renderMedia(post)}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center space-x-2 transition-colors ${
                  post.liked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">{post.likes}</span>
              </button>
              
              <button
                onClick={() => handleComment(post.id)}
                className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{post.comments}</span>
              </button>
              
              <button
                onClick={() => handleShareClick(post)}
                className="flex items-center space-x-2 text-gray-500 hover:text-green-600 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span className="text-sm font-medium">{post.shares}</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Eye className="w-4 h-4" />
              <span>{(post.likes + post.comments + post.shares) * 3} vues</span>
            </div>
          </div>
        </div>
      ))}

      {/* Message de fin */}
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">🎉 Vous êtes à jour !</p>
        <p className="text-sm text-gray-400">
          Suivez plus d'utilisateurs pour découvrir plus de contenu
        </p>
      </div>

      {/* Modals d'interaction */}
      <PostComments
        postId={selectedPostComments}
        isOpen={!!selectedPostComments}
        onClose={() => setSelectedPostComments(null)}
        initialCommentCount={posts.find(p => p.id === selectedPostComments)?.comments || 0}
      />

      <SharePost
        post={selectedPostShare}
        isOpen={!!selectedPostShare}
        onClose={() => setSelectedPostShare(null)}
        onShare={handleShare}
      />
    </div>
  );
};

export default PersonalizedFeed;

