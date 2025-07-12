import { useAuth } from '../contexts/AuthContext.jsx';

export const useSubscription = () => {
  const { user, openSubscriptionModal } = useAuth();

  // Définir les fonctionnalités disponibles par plan
  const planFeatures = {
    // Plans Acheteur
    'buyer_free': [
      'basic_shopping',
      'ubuntu_contribution',
      'order_tracking'
    ],
    'buyer_societal': [
      'basic_shopping',
      'ubuntu_contribution',
      'order_tracking',
      'virement-solidaire',
      'impact_history',
      'flash_sales'
    ],
    'buyer_societal_plus': [
      'basic_shopping',
      'ubuntu_contribution',
      'order_tracking',
      'virement-solidaire',
      'impact_history',
      'flash_sales',
      'split-payment',
      'micro-investment',
      'kyc-verification',
      'exclusive_discounts',
      'community_events'
    ],
    'buyer_premium': [
      'basic_shopping',
      'ubuntu_contribution',
      'order_tracking',
      'virement-solidaire',
      'impact_history',
      'flash_sales',
      'split-payment',
      'micro-investment',
      'kyc-verification',
      'exclusive_discounts',
      'community_events',
      'community-insurance',
      'advanced-analytics',
      'priority-support',
      'vip_access',
      'referral_rewards'
    ],

    // Plans Vendeur
    'seller_free': [
      'basic_selling',
      'product_listing_5',
      'basic_search',
      'community_forums',
      'basic_training'
    ],
    'seller_societal': [
      'basic_selling',
      'product_listing_50',
      'advanced_search',
      'community_forums',
      'basic_training',
      'vendor_forums',
      'mentorship',
      'microcredit_eligible',
      'performance_reports'
    ],
    'seller_societal_plus': [
      'basic_selling',
      'product_listing_200',
      'advanced_search',
      'community_forums',
      'basic_training',
      'vendor_forums',
      'mentorship',
      'microcredit_eligible',
      'performance_reports',
      'priority_search',
      'promotional_campaigns',
      'advanced_training',
      'photo_session',
      'logistics_discounts',
      'kyc-verification',
      'priority-support'
    ],
    'seller_premium': [
      'basic_selling',
      'product_listing_500',
      'advanced_search',
      'community_forums',
      'basic_training',
      'vendor_forums',
      'mentorship',
      'microcredit_eligible',
      'performance_reports',
      'priority_search',
      'promotional_campaigns',
      'advanced_training',
      'photo_session',
      'logistics_discounts',
      'kyc-verification',
      'priority-support',
      'homepage_visibility',
      'marketing_tools',
      'guaranteed_microcredit',
      'personal_mentoring',
      'leadership_opportunities',
      'unlimited_training',
      'crm_integration',
      'vip_support',
      'advanced-analytics'
    ]
  };

  // Obtenir le plan actuel de l'utilisateur
  const getCurrentPlan = () => {
    if (!user) return null;
    
    // Construire l'ID du plan basé sur le type d'utilisateur et l'abonnement
    const planId = `${user.userType}_${user.subscription || 'free'}`;
    return planId;
  };

  // Vérifier si une fonctionnalité est disponible
  const hasFeature = (featureName) => {
    const currentPlan = getCurrentPlan();
    if (!currentPlan) return false;
    
    const features = planFeatures[currentPlan] || [];
    return features.includes(featureName);
  };

  // Obtenir le plan minimum requis pour une fonctionnalité
  const getRequiredPlan = (featureName) => {
    const userType = user?.userType || 'buyer';
    
    // Chercher le plan minimum qui inclut cette fonctionnalité
    const plans = Object.keys(planFeatures).filter(plan => plan.startsWith(userType));
    
    for (const plan of plans) {
      if (planFeatures[plan].includes(featureName)) {
        return plan;
      }
    }
    
    return null;
  };

  // Vérifier si l'utilisateur peut accéder à une fonctionnalité
  const canAccess = (featureName) => {
    return hasFeature(featureName);
  };

  // Obtenir les limites du plan actuel
  const getPlanLimits = () => {
    const currentPlan = getCurrentPlan();
    
    const limits = {
      'buyer_free': { products: 0, transactions: 'unlimited' },
      'buyer_societal': { products: 0, transactions: 'unlimited' },
      'buyer_societal_plus': { products: 0, transactions: 'unlimited' },
      'buyer_premium': { products: 0, transactions: 'unlimited' },
      
      'seller_free': { products: 5, transactions: 'unlimited' },
      'seller_societal': { products: 50, transactions: 'unlimited' },
      'seller_societal_plus': { products: 200, transactions: 'unlimited' },
      'seller_premium': { products: 500, transactions: 'unlimited' }
    };
    
    return limits[currentPlan] || { products: 0, transactions: 'unlimited' };
  };

  return {
    user,
    currentPlan: getCurrentPlan(),
    hasFeature,
    canAccess,
    getRequiredPlan,
    getPlanLimits,
    openSubscriptionModal
  };
};

export default useSubscription;

