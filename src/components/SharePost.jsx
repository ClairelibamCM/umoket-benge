import React, { useState } from 'react';
import { 
  Share2, 
  Copy, 
  MessageCircle, 
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Link,
  Check
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SharePost = ({ post, isOpen, onClose, onShare }) => {
  const { user } = useAuth();
  const [shareMessage, setShareMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  const postUrl = `https://umoket.com/post/${post?.id}`;
  const shareText = `Découvrez cette publication de ${post?.author?.name} sur UmoKet : "${post?.content?.substring(0, 100)}${post?.content?.length > 100 ? '...' : ''}"`;

  const shareOptions = [
    {
      id: 'repost',
      name: 'Republier sur UmoKet',
      icon: Share2,
      color: 'bg-orange-600 hover:bg-orange-700',
      description: 'Partager avec vos abonnés'
    },
    {
      id: 'copy',
      name: 'Copier le lien',
      icon: copied ? Check : Copy,
      color: 'bg-gray-600 hover:bg-gray-700',
      description: 'Copier l\'URL de la publication'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-600 hover:bg-green-700',
      description: 'Partager via WhatsApp'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Partager sur Facebook'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-600 hover:bg-sky-700',
      description: 'Partager sur Twitter'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      description: 'Partager sur LinkedIn'
    },
    {
      id: 'email',
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-600 hover:bg-gray-700',
      description: 'Partager par email'
    }
  ];

  const handleShare = async (optionId) => {
    setSharing(true);

    try {
      switch (optionId) {
        case 'repost':
          // Republier sur UmoKet
          const repost = {
            id: `repost_${Date.now()}`,
            type: 'repost',
            originalPost: post,
            author: {
              id: user?.id || 'current_user',
              name: user?.name || 'Utilisateur Actuel',
              username: user?.username || '@current_user',
              avatar: user?.avatar || '👤',
              type: user?.type || 'buyer'
            },
            content: shareMessage || `${user?.name || 'Utilisateur'} a partagé cette publication`,
            timestamp: new Date(),
            likes: 0,
            comments: 0,
            shares: 0,
            liked: false
          };
          
          if (onShare) {
            onShare(repost);
          }
          break;

        case 'copy':
          await navigator.clipboard.writeText(postUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          break;

        case 'whatsapp':
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + postUrl)}`;
          window.open(whatsappUrl, '_blank');
          break;

        case 'facebook':
          const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
          window.open(facebookUrl, '_blank');
          break;

        case 'twitter':
          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(postUrl)}`;
          window.open(twitterUrl, '_blank');
          break;

        case 'linkedin':
          const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
          window.open(linkedinUrl, '_blank');
          break;

        case 'email':
          const emailUrl = `mailto:?subject=${encodeURIComponent('Publication UmoKet')}&body=${encodeURIComponent(shareText + '\n\n' + postUrl)}`;
          window.open(emailUrl);
          break;

        default:
          break;
      }

      // Fermer le modal après partage (sauf pour copy et repost)
      if (optionId !== 'copy' && optionId !== 'repost') {
        setTimeout(() => {
          onClose();
        }, 1000);
      } else if (optionId === 'repost') {
        onClose();
      }

    } catch (error) {
      console.error('Erreur lors du partage:', error);
    } finally {
      setSharing(false);
    }
  };

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        {/* En-tête */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Share2 className="w-5 h-5 mr-2" />
            Partager la publication
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <span className="text-gray-500 text-xl">×</span>
          </button>
        </div>

        {/* Aperçu de la publication */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white">
              {post.author.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-gray-900">{post.author.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  post.author.type === 'seller' 
                    ? 'bg-orange-100 text-orange-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {post.author.type === 'seller' ? 'Vendeur' : 'Acheteur'}
                </span>
              </div>
              <p className="text-gray-700 text-sm line-clamp-3">{post.content}</p>
            </div>
          </div>
        </div>

        {/* Zone de message pour republication */}
        <div className="p-4 border-b border-gray-200">
          <textarea
            value={shareMessage}
            onChange={(e) => setShareMessage(e.target.value)}
            placeholder="Ajoutez un commentaire (optionnel)..."
            className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            rows="3"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">
              {shareMessage.length}/280 caractères
            </span>
          </div>
        </div>

        {/* Options de partage */}
        <div className="p-4">
          <div className="grid grid-cols-1 gap-2">
            {shareOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => handleShare(option.id)}
                  disabled={sharing}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${option.color} text-white hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <IconComponent className="w-5 h-5" />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{option.name}</div>
                    <div className="text-sm opacity-90">{option.description}</div>
                  </div>
                  {sharing && <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Statistiques de partage */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Share2 className="w-4 h-4" />
              <span>{post.shares} partages</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments} commentaires</span>
            </div>
          </div>
        </div>

        {/* Message de confirmation */}
        {copied && (
          <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-2 rounded-lg text-sm">
            ✓ Lien copié !
          </div>
        )}
      </div>
    </div>
  );
};

export default SharePost;

