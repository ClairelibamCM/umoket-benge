// Modèle de données pour les fonctionnalités sociales UmoKet

// Données simulées pour les posts
export const posts = [
  {
    id: 1,
    userId: 'benge_official',
    userType: 'vendor',
    userName: 'Béngè Official',
    userAvatar: '/api/placeholder/40/40',
    userPlan: 'premium',
    content: "🎉 Bienvenue sur UmoKet ! Nous sommes fiers de lancer cette plateforme qui révolutionne le commerce solidaire en Afrique. Chaque achat aide un vendeur en difficulté grâce à notre Tirelire Ubuntu.",
    mediaType: 'text',
    mediaUrls: [],
    timestamp: new Date('2024-12-15T10:00:00'),
    likes: 127,
    comments: 23,
    reposts: 45,
    isLiked: false,
    isReposted: false
  },
  {
    id: 2,
    userId: 'marie_artisan',
    userType: 'vendor',
    userName: 'Marie Artisan',
    userAvatar: '/api/placeholder/40/40',
    userPlan: 'sociétaire_plus',
    content: "Mes nouveaux bijoux en perles traditionnelles sont maintenant disponibles ! Merci à la communauté UmoKet pour votre soutien continu. 💎✨",
    mediaType: 'image',
    mediaUrls: ['/api/placeholder/400/300'],
    timestamp: new Date('2024-12-15T08:30:00'),
    likes: 89,
    comments: 12,
    reposts: 8,
    isLiked: true,
    isReposted: false
  },
  {
    id: 3,
    userId: 'jean_acheteur',
    userType: 'buyer',
    userName: 'Jean Dupont',
    userAvatar: '/api/placeholder/40/40',
    userPlan: 'sociétaire',
    content: "Excellente expérience d'achat sur UmoKet ! J'ai acheté des épices locales et le vendeur était très professionnel. En plus, j'ai contribué à la Tirelire Ubuntu. 👍",
    mediaType: 'text',
    mediaUrls: [],
    timestamp: new Date('2024-12-15T07:15:00'),
    likes: 34,
    comments: 5,
    reposts: 2,
    isLiked: false,
    isReposted: false
  },
  {
    id: 4,
    userId: 'fatou_couture',
    userType: 'vendor',
    userName: 'Fatou Couture',
    userAvatar: '/api/placeholder/40/40',
    userPlan: 'premium',
    content: "Voici ma dernière création : une robe traditionnelle moderne. Processus de création en vidéo !",
    mediaType: 'video',
    mediaUrls: ['/api/placeholder/400/300'],
    timestamp: new Date('2024-12-14T16:45:00'),
    likes: 156,
    comments: 28,
    reposts: 19,
    isLiked: true,
    isReposted: true
  },
  {
    id: 5,
    userId: 'amadou_tech',
    userType: 'vendor',
    userName: 'Amadou Tech',
    userAvatar: '/api/placeholder/40/40',
    userPlan: 'sociétaire',
    content: "Nouveau stock d'accessoires tech disponible ! Livraison rapide dans toute la région.",
    mediaType: 'text',
    mediaUrls: [],
    timestamp: new Date('2024-12-14T14:20:00'),
    likes: 67,
    comments: 9,
    reposts: 4,
    isLiked: false,
    isReposted: false
  }
];

// Données simulées pour les commentaires
export const comments = [
  {
    id: 1,
    postId: 1,
    userId: 'marie_artisan',
    userName: 'Marie Artisan',
    userAvatar: '/api/placeholder/30/30',
    content: "Merci Béngè pour cette belle initiative ! Fière de faire partie de cette communauté.",
    timestamp: new Date('2024-12-15T10:15:00')
  },
  {
    id: 2,
    postId: 1,
    userId: 'jean_acheteur',
    userName: 'Jean Dupont',
    userAvatar: '/api/placeholder/30/30',
    content: "Excellente plateforme ! J'ai déjà fait plusieurs achats.",
    timestamp: new Date('2024-12-15T10:30:00')
  },
  {
    id: 3,
    postId: 2,
    userId: 'aisha_cliente',
    userName: 'Aisha Cliente',
    userAvatar: '/api/placeholder/30/30',
    content: "Magnifiques bijoux ! Comment puis-je passer commande ?",
    timestamp: new Date('2024-12-15T09:00:00')
  }
];

// Données simulées pour les abonnements (following)
export const followings = [
  {
    followerId: 'jean_acheteur',
    followingId: 'marie_artisan',
    timestamp: new Date('2024-12-10T00:00:00')
  },
  {
    followerId: 'jean_acheteur',
    followingId: 'benge_official',
    timestamp: new Date('2024-12-08T00:00:00')
  },
  {
    followerId: 'marie_artisan',
    followingId: 'benge_official',
    timestamp: new Date('2024-12-05T00:00:00')
  },
  {
    followerId: 'fatou_couture',
    followingId: 'benge_official',
    timestamp: new Date('2024-12-07T00:00:00')
  }
];

// Données simulées pour les likes
export const likes = [
  { postId: 1, userId: 'marie_artisan' },
  { postId: 1, userId: 'fatou_couture' },
  { postId: 2, userId: 'jean_acheteur' },
  { postId: 2, userId: 'benge_official' },
  { postId: 4, userId: 'jean_acheteur' },
  { postId: 4, userId: 'marie_artisan' }
];

// Données simulées pour les repartages
export const reposts = [
  {
    id: 1,
    originalPostId: 4,
    userId: 'jean_acheteur',
    additionalContent: "Superbe travail ! À découvrir absolument.",
    timestamp: new Date('2024-12-14T17:00:00')
  }
];

// Alertes et notifications pour le fil public
export const publicAlerts = [
  {
    id: 1,
    type: 'new_products',
    content: "15 vendeurs ont ajouté 47 nouveaux produits cette semaine",
    timestamp: new Date('2024-12-15T00:00:00'),
    icon: '🛍️'
  },
  {
    id: 2,
    type: 'community_impact',
    content: "2,4M FCFA redistribués cette semaine grâce à la Tirelire Ubuntu",
    timestamp: new Date('2024-12-14T00:00:00'),
    icon: '💝'
  },
  {
    id: 3,
    type: 'new_vendors',
    content: "8 nouveaux vendeurs ont rejoint la communauté cette semaine",
    timestamp: new Date('2024-12-13T00:00:00'),
    icon: '👥'
  }
];

// Limites de contenu par plan d'abonnement
export const contentLimits = {
  // Plans Acheteur
  'standard': {
    textLimit: 280, // comme Twitter
    canUploadImages: false,
    canUploadVideos: false,
    canUploadPDFs: false,
    maxImages: 0,
    maxVideoLength: 0, // en secondes
    maxPDFSize: 0 // en MB
  },
  'sociétaire': {
    textLimit: 500,
    canUploadImages: true,
    canUploadVideos: false,
    canUploadPDFs: false,
    maxImages: 2,
    maxVideoLength: 0,
    maxPDFSize: 0
  },
  'sociétaire_plus': {
    textLimit: 1000,
    canUploadImages: true,
    canUploadVideos: false,
    canUploadPDFs: false,
    maxImages: 4,
    maxVideoLength: 0,
    maxPDFSize: 0
  },
  'premium': {
    textLimit: 2000,
    canUploadImages: true,
    canUploadVideos: true,
    canUploadPDFs: true,
    maxImages: 8,
    maxVideoLength: 60, // 1 minute
    maxPDFSize: 10 // 10 MB
  },
  
  // Plans Vendeur (mêmes limites que les acheteurs correspondants)
  'starter': {
    textLimit: 280,
    canUploadImages: false,
    canUploadVideos: false,
    canUploadPDFs: false,
    maxImages: 0,
    maxVideoLength: 0,
    maxPDFSize: 0
  }
};

// Fonctions utilitaires pour la gestion des données sociales
export const socialUtils = {
  // Obtenir les posts pour un utilisateur spécifique
  getPostsByUser: (userId) => {
    return posts.filter(post => post.userId === userId);
  },

  // Obtenir le fil d'actualité pour un utilisateur (posts des personnes qu'il suit)
  getFeedForUser: (userId) => {
    const userFollowings = followings
      .filter(f => f.followerId === userId)
      .map(f => f.followingId);
    
    return posts
      .filter(post => userFollowings.includes(post.userId))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  // Obtenir le fil public (posts sélectionnés pour les visiteurs)
  getPublicFeed: () => {
    // Retourner les posts de Béngè et quelques retours d'expérience
    return posts
      .filter(post => 
        post.userId === 'benge_official' || 
        (post.userType === 'buyer' && post.likes > 20)
      )
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 5); // Limiter à 5 posts pour le fil public
  },

  // Obtenir les commentaires d'un post
  getCommentsForPost: (postId) => {
    return comments
      .filter(comment => comment.postId === postId)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  },

  // Vérifier si un utilisateur suit un autre utilisateur
  isFollowing: (followerId, followingId) => {
    return followings.some(f => 
      f.followerId === followerId && f.followingId === followingId
    );
  },

  // Obtenir les limites de contenu pour un plan
  getContentLimits: (plan) => {
    return contentLimits[plan] || contentLimits['standard'];
  },

  // Formater la date relative
  formatRelativeTime: (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}j`;
    return new Date(timestamp).toLocaleDateString('fr-FR');
  }
};

