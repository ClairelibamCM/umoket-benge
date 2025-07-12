import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Send, 
  Heart, 
  MoreHorizontal, 
  Reply,
  Flag,
  Trash2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const PostComments = ({ postId, isOpen, onClose, initialCommentCount = 0 }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Données simulées pour les commentaires
  const commentsData = {
    'p1': [
      {
        id: 'c1',
        author: {
          id: 'marie_artisan',
          name: 'Marie Kouam',
          username: '@marie_artisan',
          avatar: '👩‍🎨',
          type: 'seller'
        },
        content: 'Merci pour ce retour ! Nous sommes ravis que cette fonctionnalité vous plaise. 😊',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        likes: 12,
        liked: false,
        replies: []
      },
      {
        id: 'c2',
        author: {
          id: 'jean_tech',
          name: 'Jean Mballa',
          username: '@jean_tech',
          avatar: '👨‍💻',
          type: 'buyer'
        },
        content: 'Excellente initiative ! Cela va vraiment améliorer l\'expérience utilisateur.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        likes: 8,
        liked: true,
        replies: [
          {
            id: 'r1',
            author: {
              id: 'fatou_cuisine',
              name: 'Fatou Diallo',
              username: '@fatou_cuisine',
              avatar: '👩‍🍳',
              type: 'seller'
            },
            content: 'Tout à fait d\'accord ! 👍',
            timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
            likes: 3,
            liked: false
          }
        ]
      }
    ],
    'p2': [
      {
        id: 'c3',
        author: {
          id: 'amina_critique',
          name: 'Amina Hassan',
          username: '@amina_critique',
          avatar: '📝',
          type: 'buyer'
        },
        content: 'Magnifique travail ! La qualité est vraiment exceptionnelle. Où peut-on commander ?',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        likes: 15,
        liked: false,
        replies: []
      }
    ]
  };

  useEffect(() => {
    if (isOpen) {
      // Simuler le chargement des commentaires
      setTimeout(() => {
        setComments(commentsData[postId] || []);
        setLoading(false);
      }, 500);
    }
  }, [isOpen, postId]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: `c${Date.now()}`,
      author: {
        id: user?.id || 'current_user',
        name: user?.name || 'Utilisateur Actuel',
        username: user?.username || '@current_user',
        avatar: user?.avatar || '👤',
        type: user?.type || 'buyer'
      },
      content: newComment,
      timestamp: new Date(),
      likes: 0,
      liked: false,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleSubmitReply = (commentId) => {
    if (!replyText.trim()) return;

    const reply = {
      id: `r${Date.now()}`,
      author: {
        id: user?.id || 'current_user',
        name: user?.name || 'Utilisateur Actuel',
        username: user?.username || '@current_user',
        avatar: user?.avatar || '👤',
        type: user?.type || 'buyer'
      },
      content: replyText,
      timestamp: new Date(),
      likes: 0,
      liked: false
    };

    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ));
    
    setReplyText('');
    setReplyingTo(null);
  };

  const handleLikeComment = (commentId, isReply = false, parentId = null) => {
    if (isReply) {
      setComments(comments.map(comment => 
        comment.id === parentId 
          ? {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === commentId
                  ? {
                      ...reply,
                      liked: !reply.liked,
                      likes: reply.liked ? reply.likes - 1 : reply.likes + 1
                    }
                  : reply
              )
            }
          : comment
      ));
    } else {
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? {
              ...comment,
              liked: !comment.liked,
              likes: comment.liked ? comment.likes - 1 : comment.likes + 1
            }
          : comment
      ));
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] flex flex-col">
        {/* En-tête */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            Commentaires ({comments.length + comments.reduce((acc, c) => acc + c.replies.length, 0)})
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <span className="text-gray-500 text-xl">×</span>
          </button>
        </div>

        {/* Zone de commentaire */}
        <div className="p-4 border-b border-gray-200">
          <form onSubmit={handleSubmitComment} className="flex space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-sm">
              {user?.avatar || '👤'}
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Écrivez votre commentaire..."
                className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                rows="3"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">
                  {newComment.length}/500 caractères
                </span>
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Publier</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Liste des commentaires */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse flex space-x-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
                    <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucun commentaire pour le moment</p>
              <p className="text-sm text-gray-400">Soyez le premier à commenter !</p>
            </div>
          ) : (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="space-y-3">
                  {/* Commentaire principal */}
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-sm">
                      {comment.author.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">{comment.author.name}</span>
                          <span className="text-sm text-gray-500">{comment.author.username}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            comment.author.type === 'seller' 
                              ? 'bg-orange-100 text-orange-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {comment.author.type === 'seller' ? 'Vendeur' : 'Acheteur'}
                          </span>
                          <span className="text-xs text-gray-500">{formatTimeAgo(comment.timestamp)}</span>
                        </div>
                        <p className="text-gray-900">{comment.content}</p>
                      </div>
                      
                      {/* Actions du commentaire */}
                      <div className="flex items-center space-x-4 mt-2 text-sm">
                        <button
                          onClick={() => handleLikeComment(comment.id)}
                          className={`flex items-center space-x-1 transition-colors ${
                            comment.liked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${comment.liked ? 'fill-current' : ''}`} />
                          <span>{comment.likes}</span>
                        </button>
                        
                        <button
                          onClick={() => setReplyingTo(comment.id)}
                          className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          <Reply className="w-4 h-4" />
                          <span>Répondre</span>
                        </button>
                        
                        <button className="text-gray-500 hover:text-gray-700">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Zone de réponse */}
                      {replyingTo === comment.id && (
                        <div className="mt-3 flex space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-xs">
                            {user?.avatar || '👤'}
                          </div>
                          <div className="flex-1">
                            <textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder={`Répondre à ${comment.author.name}...`}
                              className="w-full p-2 border border-gray-200 rounded text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                              rows="2"
                            />
                            <div className="flex items-center space-x-2 mt-2">
                              <button
                                onClick={() => handleSubmitReply(comment.id)}
                                disabled={!replyText.trim()}
                                className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700 disabled:opacity-50"
                              >
                                Répondre
                              </button>
                              <button
                                onClick={() => {
                                  setReplyingTo(null);
                                  setReplyText('');
                                }}
                                className="text-gray-500 hover:text-gray-700 text-sm"
                              >
                                Annuler
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Réponses */}
                      {comment.replies.length > 0 && (
                        <div className="mt-4 space-y-3 ml-4 border-l-2 border-gray-100 pl-4">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex space-x-2">
                              <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-xs">
                                {reply.author.avatar}
                              </div>
                              <div className="flex-1">
                                <div className="bg-gray-50 rounded p-2">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="font-medium text-gray-900 text-sm">{reply.author.name}</span>
                                    <span className="text-xs text-gray-500">{formatTimeAgo(reply.timestamp)}</span>
                                  </div>
                                  <p className="text-gray-900 text-sm">{reply.content}</p>
                                </div>
                                <div className="flex items-center space-x-3 mt-1">
                                  <button
                                    onClick={() => handleLikeComment(reply.id, true, comment.id)}
                                    className={`flex items-center space-x-1 text-xs transition-colors ${
                                      reply.liked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                                    }`}
                                  >
                                    <Heart className={`w-3 h-3 ${reply.liked ? 'fill-current' : ''}`} />
                                    <span>{reply.likes}</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
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

export default PostComments;

