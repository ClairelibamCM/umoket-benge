import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { 
  TrendingUp, 
  DollarSign, 
  Heart, 
  Users, 
  Package,
  Star,
  ArrowUpRight,
  Calendar,
  Target,
  Gift,
  Edit3
} from 'lucide-react';
import { useUserType } from '../../contexts/UserTypeContext.jsx';
import { useCurrency } from '../../contexts/CurrencyContext.jsx';
import PersonalizedFeed from '../../components/PersonalizedFeed.jsx';
import CreatePost from '../../components/CreatePost.jsx';
import SuggestedUsers from '../../components/SuggestedUsers.jsx';

const SellerHomePage = () => {
  const { currentProfile } = useUserType();
  const { formatAmount } = useCurrency();
  const [showCreatePost, setShowCreatePost] = useState(false);

  const todayStats = {
    sales: 3,
    revenue: 45000,
    ubuntuSupport: 1250,
    newMessages: 5
  };

  const recentSupport = [
    { supporter: 'Amadou D.', amount: 250, message: 'Continuez votre excellent travail !', time: '2h' },
    { supporter: 'Fatima N.', amount: 500, message: 'Vos produits sont magnifiques', time: '4h' },
    { supporter: 'Moussa T.', amount: 300, message: 'Merci pour la qualité', time: '6h' }
  ];

  const upcomingGoals = currentProfile.growthGoals || [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête de bienvenue */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bonjour ! Bienvenue sur votre espace business
          </h1>
          <p className="text-gray-600">Voici un aperçu de votre activité et du soutien reçu aujourd'hui</p>
        </div>

        {/* Statistiques du jour */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Ventes aujourd'hui</p>
                  <p className="text-2xl font-bold">{todayStats.sales}</p>
                </div>
                <Package className="h-8 w-8 opacity-90" />
              </div>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span className="text-xs">+2 vs hier</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Revenus du jour</p>
                  <p className="text-2xl font-bold">{formatAmount(todayStats.revenue)}</p>
                </div>
                <DollarSign className="h-8 w-8 opacity-90" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Soutien Ubuntu reçu</p>
                  <p className="text-2xl font-bold">{formatAmount(todayStats.ubuntuSupport)}</p>
                </div>
                <Heart className="h-8 w-8 opacity-90" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Nouveaux messages</p>
                  <p className="text-2xl font-bold">{todayStats.newMessages}</p>
                </div>
                <Users className="h-8 w-8 opacity-90" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Objectifs de croissance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-green-600" />
                Mes Objectifs de Croissance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {upcomingGoals.map((goal, index) => {
                  const progressPercentage = (goal.current / goal.target) * 100;
                  const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">{goal.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {daysLeft} jours restants
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progression</span>
                          <span className="font-medium">
                            {formatAmount(goal.current)} / {formatAmount(goal.target)}
                          </span>
                        </div>
                        <Progress value={progressPercentage} className="h-3" />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{Math.round(progressPercentage)}% complété</span>
                          <span>{formatAmount(goal.target - goal.current)} restants</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                <Button variant="outline" className="w-full mt-4">
                  <Target className="h-4 w-4 mr-2" />
                  Définir un nouvel objectif
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Soutien reçu récemment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-orange-600" />
                Soutien Ubuntu Récent
              </CardTitle>
              <p className="text-sm text-gray-600">Vos derniers soutiens de la communauté</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSupport.map((support, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <Heart className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900">{support.supporter}</p>
                        <div className="text-right">
                          <p className="font-bold text-orange-600">+{formatAmount(support.amount)}</p>
                          <p className="text-xs text-gray-500">Il y a {support.time}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{support.message}</p>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  Voir tout le soutien reçu
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analyses rapides */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Performance des ventes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance des Ventes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Cette semaine</span>
                  <span className="font-medium">12 ventes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Semaine dernière</span>
                  <span className="font-medium">8 ventes</span>
                </div>
                <div className="flex items-center justify-between text-green-600">
                  <span className="text-sm">Croissance</span>
                  <span className="font-bold">+50%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Produits populaires */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Produits Populaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Panier traditionnel</span>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-yellow-500 mr-1" />
                    <span className="text-xs">4.8</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tissu Wax premium</span>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-yellow-500 mr-1" />
                    <span className="text-xs">4.9</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Épices mélangées</span>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-yellow-500 mr-1" />
                    <span className="text-xs">4.7</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions rapides */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions Rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Package className="h-4 w-4 mr-2" />
                  Ajouter un produit
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Voir les analyses
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Gift className="h-4 w-4 mr-2" />
                  Demander de l'aide
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setShowCreatePost(true)}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Créer une publication
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Utilisateurs suggérés */}
        <div className="mt-8">
          <SuggestedUsers maxUsers={5} />
        </div>

        {/* Fil d'actualité personnalisé */}
        <div className="mt-8">
          <PersonalizedFeed onCreatePost={() => setShowCreatePost(true)} />
        </div>
      </div>

      {/* Modal de création de post */}
      {showCreatePost && (
        <CreatePost 
          onClose={() => setShowCreatePost(false)}
          onPostCreated={(newPost) => {
            setShowCreatePost(false);
            // Ici on pourrait ajouter le nouveau post au fil d'actualité
            console.log('Nouveau post créé:', newPost);
          }}
        />
      )}
    </div>
  );
};

export default SellerHomePage;

