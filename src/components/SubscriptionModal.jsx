import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { X, Check, Star, Crown, Zap, Shield } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext.jsx';

const SubscriptionModal = ({ isOpen, onClose, userType, onSubscribe }) => {
  const { formatAmount } = useCurrency();
  const [selectedPlan, setSelectedPlan] = useState(null);

  if (!isOpen) return null;

  // Plans pour les acheteurs
  const buyerPlans = [
    {
      id: 'buyer_free',
      name: 'Consommateur Standard',
      price: 0,
      period: 'Gratuit',
      description: 'Accès de base à la plateforme',
      icon: Star,
      color: 'gray',
      isPopular: false,
      isCurrent: true,
      features: [
        'Accès complet au catalogue de produits',
        'Contribution automatique à la Tirelire Ubuntu (0,5%)',
        'Création de compte et gestion du panier',
        'Suivi des commandes',
        'Visualisation de l\'impact global Ubuntu'
      ],
      limitations: [
        'Pas de vérification KYC',
        'Pas de transactions solidaires avancées'
      ]
    },
    {
      id: 'buyer_societal',
      name: 'Consommateur Sociétaire',
      price: 2000,
      period: 'par mois',
      description: 'Pour les acheteurs engagés',
      icon: Zap,
      color: 'blue',
      isPopular: false,
      isCurrent: false,
      features: [
        'Tous les avantages du plan Standard',
        'Virement Solidaire Direct aux vendeurs',
        'Historique détaillé de votre impact personnel',
        'Accès anticipé aux ventes flash',
        'Promotions limitées exclusives'
      ],
      limitations: [
        'Pas de vérification KYC'
      ]
    },
    {
      id: 'buyer_societal_plus',
      name: 'Consommateur Sociétaire Plus',
      price: 5000,
      period: 'par trimestre',
      description: 'Engagement renforcé avec KYC',
      icon: Crown,
      color: 'purple',
      isPopular: true,
      isCurrent: false,
      features: [
        'Tous les avantages du plan Sociétaire',
        'Split Payment Ubuntu (achat + don simultané)',
        'Micro-investissements dans des projets vendeurs',
        'Prédictions d\'impact personnalisées',
        'Certificats Ubuntu numériques',
        'Réductions exclusives sur une sélection',
        'Événements communautaires en ligne',
        'Vérification KYC disponible'
      ],
      limitations: []
    },
    {
      id: 'buyer_premium',
      name: 'Consommateur Premium',
      price: 10000,
      period: 'par an',
      description: 'L\'expérience Ubuntu complète',
      icon: Shield,
      color: 'gold',
      isPopular: false,
      isCurrent: false,
      features: [
        'Tous les avantages du plan Sociétaire Plus',
        'Assurance Communautaire pour vos transactions',
        'Rapports d\'impact personnalisés détaillés',
        'Badge "Ubuntu Hero" sur votre profil',
        'Accès VIP à toutes les ventes privées',
        'Invitations aux événements exclusifs',
        'Programme de parrainage avec récompenses accrues',
        'Support client dédié prioritaire',
        'Vérification KYC avec badge distinctif'
      ],
      limitations: []
    }
  ];

  // Plans pour les vendeurs
  const sellerPlans = [
    {
      id: 'seller_free',
      name: 'Entrepreneur Starter',
      price: 0,
      period: 'Gratuit',
      description: 'Pour débuter sur UmoKet',
      icon: Star,
      color: 'gray',
      isPopular: false,
      isCurrent: true,
      features: [
        'Publication de 5 produits maximum',
        'Apparition dans les résultats de base',
        'Section "Nouveaux Vendeurs"',
        'Forums de discussion de base',
        'Formation digitale de base',
        'Support email (48h)'
      ],
      limitations: [
        'Pas de vérification KYC',
        'Visibilité limitée'
      ]
    },
    {
      id: 'seller_societal',
      name: 'Entrepreneur Sociétaire',
      price: 5000,
      period: 'par trimestre',
      description: 'Développez votre activité',
      icon: Zap,
      color: 'blue',
      isPopular: false,
      isCurrent: false,
      features: [
        'Publication de 50 produits maximum',
        'Recherche avancée et mise en avant',
        'Section "Vendeurs à Aider" (si éligible)',
        'Forums dédiés aux vendeurs',
        'Mentors de la communauté',
        'Éligibilité aux micro-crédits Ubuntu',
        'Rapports de performance de base',
        'Support email (24h)'
      ],
      limitations: [
        'Pas de vérification KYC'
      ]
    },
    {
      id: 'seller_societal_plus',
      name: 'Entrepreneur Sociétaire Plus',
      price: 15000,
      period: 'par an',
      description: 'Croissance accélérée avec KYC',
      icon: Crown,
      color: 'purple',
      isPopular: true,
      isCurrent: false,
      features: [
        'Publication de 200 produits maximum',
        'Priorité dans les résultats de recherche',
        'Sections "Vendeurs Recommandés" et "Produits Populaires"',
        'Campagnes promotionnelles ciblées',
        'Accès prioritaire aux micro-crédits',
        'Ateliers de mentoring exclusifs',
        'Formations digitales avancées',
        '1 session photo produit offerte/an',
        'Services logistiques à tarifs préférentiels',
        'Support prioritaire (12h)',
        'Vérification KYC disponible'
      ],
      limitations: []
    },
    {
      id: 'seller_premium',
      name: 'Entrepreneur Premium',
      price: 35000,
      period: 'par an',
      description: 'Excellence entrepreneuriale',
      icon: Shield,
      color: 'gold',
      isPopular: false,
      isCurrent: false,
      features: [
        'Publication de 500 produits maximum',
        'Visibilité prioritaire page d\'accueil',
        'Bannières promotionnelles dédiées',
        'Événements spéciaux UmoKet',
        'Outils marketing personnalisés',
        'Accès garanti aux micro-crédits',
        'Programme de mentoring personnalisé',
        'Opportunités de leadership communautaire',
        'Formations illimitées',
        '2 sessions photo produit offertes/an',
        'Services logistiques prioritaires',
        'CRM intégré externalisé',
        'Support VIP 24/7 avec gestionnaire dédié',
        'Vérification KYC avec badge distinctif'
      ],
      limitations: []
    }
  ];

  const plans = userType === 'buyer' ? buyerPlans : sellerPlans;
  const colorClasses = {
    gray: 'border-gray-200 bg-gray-50',
    blue: 'border-blue-200 bg-blue-50',
    purple: 'border-purple-200 bg-purple-50',
    gold: 'border-yellow-200 bg-yellow-50'
  };

  const handleSubscribe = (planId) => {
    onSubscribe(planId);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Choisissez votre plan {userType === 'buyer' ? 'Acheteur' : 'Vendeur'}
            </h2>
            <p className="text-gray-600 mt-1">
              Sélectionnez le plan qui correspond le mieux à vos besoins
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Plans Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => {
              const IconComponent = plan.icon;
              return (
                <Card 
                  key={plan.id}
                  className={`relative ${colorClasses[plan.color]} ${
                    plan.isCurrent ? 'ring-2 ring-green-500' : ''
                  } ${plan.isPopular ? 'ring-2 ring-orange-500' : ''}`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-orange-500 text-white">
                        Populaire
                      </Badge>
                    </div>
                  )}
                  {plan.isCurrent && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-green-500 text-white">
                        Plan actuel
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4 ${
                      plan.color === 'gray' ? 'bg-gray-200' :
                      plan.color === 'blue' ? 'bg-blue-200' :
                      plan.color === 'purple' ? 'bg-purple-200' :
                      'bg-yellow-200'
                    }`}>
                      <IconComponent className={`h-6 w-6 ${
                        plan.color === 'gray' ? 'text-gray-600' :
                        plan.color === 'blue' ? 'text-blue-600' :
                        plan.color === 'purple' ? 'text-purple-600' :
                        'text-yellow-600'
                      }`} />
                    </div>
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {plan.description}
                    </CardDescription>
                    <div className="mt-4">
                      <div className="text-3xl font-bold text-gray-900">
                        {plan.price === 0 ? 'Gratuit' : formatAmount(plan.price)}
                      </div>
                      {plan.price > 0 && (
                        <div className="text-sm text-gray-500">{plan.period}</div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Fonctionnalités */}
                    <div className="space-y-2 mb-4">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start text-sm">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Limitations */}
                    {plan.limitations.length > 0 && (
                      <div className="space-y-2 mb-4 pt-2 border-t">
                        <div className="text-xs font-medium text-gray-500 uppercase">
                          Limitations
                        </div>
                        {plan.limitations.map((limitation, index) => (
                          <div key={index} className="flex items-start text-sm text-gray-500">
                            <X className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{limitation}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Bouton d'action */}
                    <Button
                      className={`w-full ${
                        plan.isCurrent 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : plan.color === 'blue' 
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : plan.color === 'purple'
                              ? 'bg-purple-600 hover:bg-purple-700'
                              : plan.color === 'gold'
                                ? 'bg-yellow-600 hover:bg-yellow-700'
                                : 'bg-gray-600 hover:bg-gray-700'
                      }`}
                      onClick={() => handleSubscribe(plan.id)}
                      disabled={plan.isCurrent}
                    >
                      {plan.isCurrent ? 'Plan actuel' : 
                       plan.price === 0 ? 'Continuer gratuitement' : 'Souscrire'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Note en bas */}
          <div className="mt-8 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 text-sm font-bold">i</span>
                </div>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-orange-800">
                  Vous pouvez changer de plan à tout moment
                </h4>
                <p className="text-sm text-orange-700 mt-1">
                  {userType === 'buyer' 
                    ? 'En tant qu\'acheteur, vous pouvez également devenir vendeur en souscrivant à un plan vendeur.'
                    : 'En tant que vendeur, vous avez automatiquement accès à toutes les fonctionnalités acheteur.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;

