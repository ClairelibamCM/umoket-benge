import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { InfoButton } from '../../components/Modal';
import { Wallet, TrendingUp, Heart, Users, ArrowUpRight, ArrowDownRight, Gift, Shield, Coins, DollarSign, Plus } from 'lucide-react';
import { useUserType } from '../../contexts/UserTypeContext.jsx';
import { useCurrency } from '../../contexts/CurrencyContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';

// Import des composants de transaction
import SolidaryTransfer from '../../components/SolidaryTransfer';
import SplitPaymentUbuntu from '../../components/SplitPaymentUbuntu';
import MicroInvestment from '../../components/MicroInvestment';
import CommunityInsurance from '../../components/CommunityInsurance';

// Import des composants sociaux
import SocialFeed from '../../components/SocialFeed';
import CreatePost from '../../components/CreatePost';

const WalletPage = () => {
  const { userType } = useUserType();
  const { formatAmount } = useCurrency();
  const { user } = useAuth();
  const [activeModal, setActiveModal] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [activeTab, setActiveTab] = useState('wallet'); // 'wallet' ou 'social'

  // Données de démonstration pour le portefeuille
  const walletData = {
    mainBalance: 125000, // FCFA
    ubuntuBalance: 15750, // FCFA
    monthlyGoal: 20000,
    currentContribution: 15750,
    badges: [
      { name: 'Champion Ubuntu', color: 'bg-orange-500', icon: '🏆' },
      { name: 'Solidaire Actif', color: 'bg-green-500', icon: '🤝' },
      { name: 'Mentor Communautaire', color: 'bg-blue-500', icon: '👨‍🏫' }
    ],
    recentTransactions: [
      { type: 'contribution', amount: 2500, vendor: 'Aminata Diallo', date: '2024-12-20', impact: 'Aide au stock' },
      { type: 'contribution', amount: 1800, vendor: 'Kofi Asante', date: '2024-12-19', impact: 'Formation digitale' },
      { type: 'purchase', amount: 45000, vendor: 'Fatou Boutique', date: '2024-12-18', impact: 'Contribution: 225 FCFA' },
      { type: 'contribution', amount: 3200, vendor: 'Ibrahim Tech', date: '2024-12-17', impact: 'Équipement' }
    ]
  };

  const progressPercentage = (walletData.currentContribution / walletData.monthlyGoal) * 100;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Mon Portefeuille Ubuntu</h1>
        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
          Acheteur Solidaire
        </Badge>
      </div>

      {/* Soldes Principaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800 flex items-center gap-2">
              Solde Principal
              <InfoButton 
                title="Solde Principal"
                className="ml-2"
              >
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Votre solde principal représente l'argent disponible pour vos achats sur UmoKet.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Fonctionnement :</h4>
                    <ul className="space-y-2 text-sm text-blue-700">
                      <li>• Rechargez votre compte via Mobile Money, carte bancaire ou virement</li>
                      <li>• Utilisez ce solde pour tous vos achats sur la plateforme</li>
                      <li>• 0,5% de chaque achat alimente automatiquement la Tirelire Ubuntu</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Avantages :</h4>
                    <ul className="space-y-2 text-sm text-green-700">
                      <li>• Transactions rapides et sécurisées</li>
                      <li>• Pas de frais cachés</li>
                      <li>• Historique détaillé de tous vos achats</li>
                    </ul>
                  </div>
                </div>
              </InfoButton>
            </CardTitle>
            <Wallet className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {formatAmount(walletData.mainBalance)}
            </div>
            <p className="text-xs text-blue-600 mt-1">
              Disponible pour vos achats
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800 flex items-center gap-2">
              Tirelire Ubuntu
              <InfoButton 
                title="Tirelire Ubuntu"
                className="ml-2"
              >
                <div className="space-y-4">
                  <p className="text-gray-700">
                    La Tirelire Ubuntu est le cœur de la solidarité sur UmoKet. Elle collecte automatiquement 0,5% de chaque transaction pour aider les vendeurs en difficulté.
                  </p>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">Philosophie Ubuntu :</h4>
                    <p className="text-sm text-orange-700">
                      "Je suis parce que nous sommes" - Chaque achat que vous effectuez contribue au bien-être de la communauté entrepreneuriale africaine.
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Comment ça marche :</h4>
                    <ul className="space-y-2 text-sm text-green-700">
                      <li>• 0,5% de chaque achat alimente automatiquement cette tirelire</li>
                      <li>• Les fonds sont redistribués aux vendeurs selon leurs besoins</li>
                      <li>• Vous pouvez suivre l'impact de vos contributions en temps réel</li>
                      <li>• Possibilité de faire des dons directs supplémentaires</li>
                    </ul>
                  </div>
                </div>
              </InfoButton>
            </CardTitle>
            <Heart className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {formatAmount(walletData.ubuntuBalance)}
            </div>
            <p className="text-xs text-green-600 mt-1">
              Contributions solidaires accumulées
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Objectif Solidaire du Mois */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Objectif Solidaire du Mois
            <InfoButton 
              title="Objectif Solidaire du Mois"
            >
              <div className="space-y-4">
                <p className="text-gray-700">
                  Fixez-vous un objectif mensuel de contribution à la communauté Ubuntu et suivez votre progression.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Pourquoi se fixer un objectif ?</h4>
                  <ul className="space-y-2 text-sm text-purple-700">
                    <li>• Maximiser votre impact social</li>
                    <li>• Débloquer des badges et récompenses</li>
                    <li>• Inspirer d'autres membres de la communauté</li>
                    <li>• Contribuer de manière structurée au développement entrepreneurial</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Récompenses :</h4>
                  <ul className="space-y-2 text-sm text-yellow-700">
                    <li>• Badge "Objectif Atteint" chaque mois</li>
                    <li>• Réductions sur vos prochains achats</li>
                    <li>• Accès prioritaire aux nouveaux produits</li>
                    <li>• Reconnaissance dans le classement Ubuntu Heroes</li>
                  </ul>
                </div>
              </div>
            </InfoButton>
          </CardTitle>
          <CardDescription>
            Votre engagement solidaire ce mois-ci
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{formatAmount(walletData.currentContribution)}</span>
              <span>{formatAmount(walletData.monthlyGoal)}</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-sm text-gray-600">
              {progressPercentage.toFixed(1)}% de votre objectif mensuel atteint
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Badges Ubuntu */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Mes Badges Ubuntu
            <InfoButton 
              title="Badges Ubuntu"
            >
              <div className="space-y-4">
                <p className="text-gray-700">
                  Les badges Ubuntu reconnaissent votre engagement et votre impact dans la communauté solidaire.
                </p>
                <div className="space-y-3">
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-orange-800 flex items-center gap-2">
                      🏆 Champion Ubuntu
                    </h4>
                    <p className="text-sm text-orange-700">Décerné aux membres qui ont aidé plus de 10 vendeurs</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-green-800 flex items-center gap-2">
                      🤝 Solidaire Actif
                    </h4>
                    <p className="text-sm text-green-700">Attribué pour une contribution mensuelle régulière</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-blue-800 flex items-center gap-2">
                      👨‍🏫 Mentor Communautaire
                    </h4>
                    <p className="text-sm text-blue-700">Récompense l'accompagnement d'autres entrepreneurs</p>
                  </div>
                </div>
              </div>
            </InfoButton>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {walletData.badges.map((badge, index) => (
              <Badge key={index} className={`${badge.color} text-white px-3 py-1`}>
                <span className="mr-2">{badge.icon}</span>
                {badge.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nouvelles Transactions Solidaires */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions Solidaires</CardTitle>
          <CardDescription>
            Découvrez nos nouveaux services pour maximiser votre impact Ubuntu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Button
                onClick={() => setActiveModal('solidary-transfer')}
                className="h-20 w-full flex flex-col items-center justify-center bg-orange-600 hover:bg-orange-700 text-white"
              >
                <ArrowUpRight className="h-6 w-6 mb-1" />
                <span className="text-sm">Virement Solidaire</span>
              </Button>
              <InfoButton 
                title="Virement Solidaire Direct"
                className="absolute top-2 right-2"
              >
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Envoyez de l'argent directement à un vendeur de votre choix pour l'aider dans son activité.
                  </p>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">Fonctionnement :</h4>
                    <ul className="space-y-2 text-sm text-orange-700">
                      <li>• Sélectionnez un vendeur dans la liste</li>
                      <li>• Choisissez le montant à envoyer</li>
                      <li>• Effectuez le virement depuis votre portefeuille</li>
                      <li>• Suivez l'impact de votre aide en temps réel</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Avantages :</h4>
                    <ul className="space-y-2 text-sm text-green-700">
                      <li>• Impact direct et immédiat</li>
                      <li>• Renforcement des liens communautaires</li>
                      <li>• Transparence totale sur l'utilisation des fonds</li>
                    </ul>
                  </div>
                </div>
              </InfoButton>
            </div>

            <div className="relative">
              <Button
                onClick={() => setActiveModal('split-payment')}
                className="h-20 w-full flex flex-col items-center justify-center bg-green-600 hover:bg-green-700 text-white"
              >
                <DollarSign className="h-6 w-6 mb-1" />
                <span className="text-sm">Split Payment</span>
              </Button>
              <InfoButton 
                title="Split Payment Ubuntu"
                className="absolute top-2 right-2"
              >
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Divisez votre paiement entre l'achat du produit et une contribution supplémentaire au vendeur.
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Fonctionnement :</h4>
                    <ul className="space-y-2 text-sm text-green-700">
                      <li>• Lors du checkout, activez le Split Payment</li>
                      <li>• Choisissez le pourcentage de contribution supplémentaire</li>
                      <li>• Une partie va au produit, une partie comme don au vendeur</li>
                      <li>• Impact visible immédiatement dans votre historique</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Avantages :</h4>
                    <ul className="space-y-2 text-sm text-blue-700">
                      <li>• Maximise l'aide au vendeur</li>
                      <li>• Simple et intégré au processus d'achat</li>
                      <li>• Contribution automatique à la Tirelire Ubuntu</li>
                    </ul>
                  </div>
                </div>
              </InfoButton>
            </div>

            <div className="relative">
              <Button
                onClick={() => setActiveModal('micro-investment')}
                className="h-20 w-full flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700 text-white"
              >
                <TrendingUp className="h-6 w-6 mb-1" />
                <span className="text-sm">Micro-Investissement</span>
              </Button>
              <InfoButton 
                title="Micro-Investissement"
                className="absolute top-2 right-2"
              >
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Investissez dans des projets de croissance de vendeurs et recevez un retour sur investissement.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Fonctionnement :</h4>
                    <ul className="space-y-2 text-sm text-blue-700">
                      <li>• Parcourez les projets de développement disponibles</li>
                      <li>• Choisissez un projet qui vous inspire</li>
                      <li>• Investissez selon vos moyens (Bronze, Silver, Gold)</li>
                      <li>• Recevez des retours selon la réussite du projet</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Avantages :</h4>
                    <ul className="space-y-2 text-sm text-purple-700">
                      <li>• Retour financier potentiel</li>
                      <li>• Impact économique durable</li>
                      <li>• Participation active au développement entrepreneurial</li>
                    </ul>
                  </div>
                </div>
              </InfoButton>
            </div>

            <div className="relative">
              <Button
                onClick={() => setActiveModal('community-insurance')}
                className="h-20 w-full flex flex-col items-center justify-center bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Shield className="h-6 w-6 mb-1" />
                <span className="text-sm">Assurance Communautaire</span>
              </Button>
              <InfoButton 
                title="Assurance Communautaire"
                className="absolute top-2 right-2"
              >
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Protégez vos transactions et celles de la communauté grâce à un système d'assurance mutuelle.
                  </p>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Fonctionnement :</h4>
                    <ul className="space-y-2 text-sm text-purple-700">
                      <li>• Choisissez votre plan d'assurance (Basique, Standard, Premium)</li>
                      <li>• Contribuez mensuellement au fonds commun</li>
                      <li>• Bénéficiez d'une protection contre les fraudes et problèmes</li>
                      <li>• Aidez à protéger toute la communauté</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Avantages :</h4>
                    <ul className="space-y-2 text-sm text-green-700">
                      <li>• Protection collective</li>
                      <li>• Coûts réduits grâce à la mutualisation</li>
                      <li>• Renforcement de la confiance dans la plateforme</li>
                    </ul>
                  </div>
                </div>
              </InfoButton>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historique des Contributions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Historique des Contributions
            <InfoButton 
              title="Historique des Contributions"
            >
              <div className="space-y-4">
                <p className="text-gray-700">
                  Suivez en détail toutes vos contributions à la communauté Ubuntu et leur impact direct.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Types de contributions :</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• <strong>Automatiques :</strong> 0,5% de chaque achat</li>
                    <li>• <strong>Volontaires :</strong> Dons directs aux vendeurs</li>
                    <li>• <strong>Micro-investissements :</strong> Financement de projets de croissance</li>
                    <li>• <strong>Parrainage :</strong> Aide aux nouveaux entrepreneurs</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Impact mesurable :</h4>
                  <p className="text-sm text-green-700">
                    Chaque contribution est tracée et vous pouvez voir concrètement comment elle a aidé un vendeur : reconstitution de stock, formation, équipement, etc.
                  </p>
                </div>
              </div>
            </InfoButton>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {walletData.recentTransactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'contribution' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {transaction.type === 'contribution' ? (
                      <Heart className="h-5 w-5 text-green-600" />
                    ) : (
                      <Coins className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.vendor}</p>
                    <p className="text-sm text-gray-600">{transaction.impact}</p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'contribution' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {transaction.type === 'contribution' ? '+' : '-'}{formatAmount(transaction.amount)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modales pour les nouvelles transactions */}
      {activeModal === 'solidary-transfer' && (
        <SolidaryTransfer onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'split-payment' && (
        <SplitPaymentUbuntu onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'micro-investment' && (
        <MicroInvestment onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'community-insurance' && (
        <CommunityInsurance onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
};

export default WalletPage;

