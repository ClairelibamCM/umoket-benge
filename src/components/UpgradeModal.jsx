import React from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { X, Crown, Zap, Star } from 'lucide-react';

const UpgradeModal = ({ isOpen, onClose, feature, userType, onViewPlans }) => {
  if (!isOpen) return null;

  const getFeatureInfo = () => {
    const features = {
      'virement-solidaire': {
        title: 'Virement Solidaire Direct',
        description: 'Envoyez des dons directs aux vendeurs en difficulté',
        requiredPlan: userType === 'buyer' ? 'Consommateur Sociétaire' : 'Entrepreneur Sociétaire',
        icon: Star,
        benefits: [
          'Aidez directement les vendeurs',
          'Suivi de votre impact personnel',
          'Historique détaillé des contributions',
          'Reconnaissance communautaire'
        ]
      },
      'split-payment': {
        title: 'Split Payment Ubuntu',
        description: 'Combinez vos achats avec des dons automatiques',
        requiredPlan: userType === 'buyer' ? 'Consommateur Sociétaire Plus' : 'Entrepreneur Sociétaire Plus',
        icon: Zap,
        benefits: [
          'Achat + don en une seule transaction',
          'Optimisation de votre impact',
          'Certificats Ubuntu numériques',
          'Prédictions d\'impact personnalisées'
        ]
      },
      'micro-investment': {
        title: 'Micro-Investissement',
        description: 'Investissez dans des projets de vendeurs prometteurs',
        requiredPlan: userType === 'buyer' ? 'Consommateur Sociétaire Plus' : 'Entrepreneur Sociétaire Plus',
        icon: Crown,
        benefits: [
          'Soutenez l\'entrepreneuriat local',
          'Retour sur investissement solidaire',
          'Participation aux succès',
          'Impact économique durable'
        ]
      },
      'community-insurance': {
        title: 'Assurance Communautaire',
        description: 'Protection avancée pour toutes vos transactions',
        requiredPlan: userType === 'buyer' ? 'Consommateur Premium' : 'Entrepreneur Premium',
        icon: Crown,
        benefits: [
          'Protection complète des transactions',
          'Résolution prioritaire des litiges',
          'Garantie de satisfaction',
          'Support dédié 24/7'
        ]
      },
      'kyc-verification': {
        title: 'Vérification KYC',
        description: 'Obtenez un badge de confiance vérifié',
        requiredPlan: userType === 'buyer' ? 'Consommateur Sociétaire Plus' : 'Entrepreneur Sociétaire Plus',
        icon: Crown,
        benefits: [
          'Badge "Vérifié" sur votre profil',
          'Confiance accrue des partenaires',
          'Accès aux services premium',
          'Transactions sécurisées'
        ]
      },
      'advanced-analytics': {
        title: 'Analyses Avancées',
        description: 'Rapports détaillés et insights personnalisés',
        requiredPlan: userType === 'buyer' ? 'Consommateur Premium' : 'Entrepreneur Premium',
        icon: Crown,
        benefits: [
          'Rapports d\'impact personnalisés',
          'Analyses de performance',
          'Prédictions de tendances',
          'Recommandations stratégiques'
        ]
      },
      'priority-support': {
        title: 'Support Prioritaire',
        description: 'Assistance dédiée et réponse rapide',
        requiredPlan: userType === 'buyer' ? 'Consommateur Sociétaire Plus' : 'Entrepreneur Sociétaire Plus',
        icon: Crown,
        benefits: [
          'Réponse sous 12h garantie',
          'Support par chat en direct',
          'Gestionnaire de compte dédié',
          'Résolution prioritaire'
        ]
      }
    };

    return features[feature] || {
      title: 'Fonctionnalité Premium',
      description: 'Cette fonctionnalité est réservée aux membres Pro',
      requiredPlan: 'Plan Premium',
      icon: Crown,
      benefits: ['Accès aux fonctionnalités avancées']
    };
  };

  const featureInfo = getFeatureInfo();
  const IconComponent = featureInfo.icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-2 right-2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <IconComponent className="h-8 w-8 text-orange-600" />
            </div>
            <CardTitle className="text-xl text-gray-900">
              {featureInfo.title}
            </CardTitle>
            <CardDescription className="mt-2">
              {featureInfo.description}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Message principal */}
          <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-orange-800 font-medium">
              Cette fonctionnalité est réservée aux membres{' '}
              <span className="font-bold">{featureInfo.requiredPlan}</span> et plus.
            </p>
          </div>

          {/* Avantages */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              Avec cette fonctionnalité, vous pourrez :
            </h4>
            <ul className="space-y-2">
              {featureInfo.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button 
              onClick={onViewPlans}
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              Voir les plans d'abonnement
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="w-full"
            >
              Continuer avec le plan gratuit
            </Button>
          </div>

          {/* Note */}
          <div className="text-xs text-gray-500 text-center">
            Vous pouvez changer de plan à tout moment depuis vos paramètres
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpgradeModal;

