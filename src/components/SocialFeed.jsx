import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Repeat2, Share, Play, FileText, Calendar, User } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { socialUtils, publicAlerts } from '../data/socialData.js';

const SocialFeed = ({ feedType = 'public', userId = null }) => {
  const { formatAmount } = useCurrency();
  const { user, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeedData();
  }, [feedType, userId]);

  const loadFeedData = () => {
    setLoading(true);
    
    try {
      let feedPosts = [];
      
      switch (feedType) {
        case 'public':
          feedPosts = socialUtils.getPublicFeed();
          setAlerts(publicAlerts);
          break;
        case 'personal':
          if (userId) {
            feedPosts = socialUtils.getFeedForUser(userId);
          }
          break;
        case 'user':
          if (userId) {
            feedPosts = socialUtils.getPostsByUser(userId);
          }
          break;
        default:
          feedPosts = socialUtils.getPublicFeed();
      }
      
      setPosts(feedPosts);
    } catch (error) {
      console.error('Erreur lors du chargement du fil:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = (postId) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  };

  const handleRepost = (postId) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isReposted: !post.isReposted,
              reposts: post.isReposted ? post.reposts - 1 : post.reposts + 1
            }
          : post
      )
    );
  };

  const renderMediaContent = (post) => {
    switch (post.mediaType) {
      case 'image':
        return (
          <div className="mt-3">
            <img 
              src={post.mediaUrls[0]} 
              alt="Contenu du post" 
              className="w-full rounded-lg max-h-96 object-cover"
            />
          </div>
        );
      case 'video':
        return (
          <div className="mt-3 relative">
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <Play className="w-16 h-16 text-gray-500" />
            </div>
            <p className="text-sm text-gray-500 mt-1">Vidéo (1 min max)</p>
          </div>
        );
      case 'pdf':
        return (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg border flex items-center space-x-3">
            <FileText className="w-8 h-8 text-red-500" />
            <div>
              <p className="font-medium text-gray-900">Document PDF</p>
              <p className="text-sm text-gray-500">Cliquez pour télécharger</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderPost = (post) => (
    <div key={post.id} className="bg-white rounded-lg shadow-sm border p-4 mb-4">
      {/* En-tête du post */}
      <div className="flex items-start space-x-3">
        <img 
          src={post.userAvatar} 
          alt={post.userName}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-gray-900">{post.userName}</h3>
            <span className={`px-2 py-1 text-xs rounded-full ${
              post.userType === 'vendor' 
                ? 'bg-orange-100 text-orange-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {post.userType === 'vendor' ? 'Vendeur' : 'Acheteur'}
            </span>
            <span className="text-xs text-gray-500">
              {socialUtils.formatRelativeTime(post.timestamp)}
            </span>
          </div>
          
          {/* Contenu textuel */}
          <p className="mt-2 text-gray-800 leading-relaxed">{post.content}</p>
          
          {/* Contenu média */}
          {renderMediaContent(post)}
          
          {/* Actions */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t">
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => handleLike(post.id)}
                className={`flex items-center space-x-2 transition-colors ${
                  post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm">{post.likes}</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">{post.comments}</span>
              </button>
              
              <button 
                onClick={() => handleRepost(post.id)}
                className={`flex items-center space-x-2 transition-colors ${
                  post.isReposted ? 'text-green-500' : 'text-gray-500 hover:text-green-500'
                }`}
              >
                <Repeat2 className="w-5 h-5" />
                <span className="text-sm">{post.reposts}</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-500 transition-colors">
                <Share className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAlert = (alert) => (
    <div key={alert.id} className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 mb-4 border-l-4 border-orange-500">
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{alert.icon}</span>
        <div>
          <p className="text-gray-800 font-medium">{alert.content}</p>
          <p className="text-sm text-gray-600 mt-1">
            {socialUtils.formatRelativeTime(alert.timestamp)}
          </p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-lg shadow-sm border p-4 animate-pulse">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Titre de la section */}
      {feedType === 'public' && (
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-orange-500" />
            Nouvelles & Actualités
          </h2>
          <p className="text-gray-600">
            Découvrez les dernières actualités de la communauté UmoKet et les retours d'expérience de nos membres.
          </p>
        </div>
      )}

      {/* Alertes (uniquement pour le fil public) */}
      {feedType === 'public' && alerts.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Alertes Communauté</h3>
          {alerts.map(renderAlert)}
        </div>
      )}

      {/* Posts */}
      {posts.length > 0 ? (
        <div>
          {feedType === 'public' && (
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Retours d'Expérience</h3>
          )}
          {posts.map(renderPost)}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune publication</h3>
          <p className="text-gray-600">
            {feedType === 'public' 
              ? "Aucune publication disponible pour le moment."
              : "Suivez d'autres utilisateurs pour voir leurs publications ici."
            }
          </p>
        </div>
      )}

      {/* Invitation à s'inscrire pour le fil public */}
      {feedType === 'public' && !isAuthenticated && (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-6 text-white text-center mt-6">
          <h3 className="text-xl font-bold mb-2">Rejoignez la Communauté UmoKet !</h3>
          <p className="mb-4">
            Inscrivez-vous pour accéder à plus de contenu, suivre vos vendeurs préférés et partager vos propres expériences.
          </p>
          <button className="bg-white text-orange-500 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            S'inscrire maintenant
          </button>
        </div>
      )}
    </div>
  );
};

export default SocialFeed;

