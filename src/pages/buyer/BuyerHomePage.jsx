import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { 
  ShoppingBag, 
  Heart, 
  TrendingUp, 
  Users, 
  Star,
  ArrowUpRight,
  Calendar,
  Target,
  Gift,
  Edit3,
  Wallet,
  Award
} from 'lucide-react';
import { useUserType } from '../../contexts/UserTypeContext.jsx';
import { useCurrency } from '../../contexts/CurrencyContext.jsx';
import PersonalizedFeed from '../../components/PersonalizedFeed.jsx';
import CreatePost from '../../components/CreatePost.jsx';
import SuggestedUsers from '../../components/SuggestedUsers.jsx';

const BuyerHomePage = () => {
  const { currentProfile } = useUserType();
  const { formatAmount } = useCurrency();
  const [showCreatePost, setShowCreatePost] = useState(false);

  const todayStats = {
    purchases: 2,
    savings: 12000,
    ubuntuContribution: 3500,
    newRecommendations: 8
  };

  const recentPurchases = [
    { 
      product: 'Panier en osier', 
      seller: 'Aminata D.', 
      amount: 25000, 
      status: 'Livré',
      rating: 5,
      time: '2j' 
    },
    { 
      product: 'Tissu Wax', 
      seller: 'Kofi A.', 
      amount: 15000, 
      status: 'En transit',
      rating: null,
      time: '1j' 
    },
    { 
      product: 'Épices mélangées', 
      seller: 'Fatou K.', 
      amount: 8000, 
      status: 'Préparation',
      rating: null,
      time: '3h' 
    }
  ];

  const monthlyGoal = {
    target: 50000,
    current: 32000,
    percentage: 64
  };

  const recommendations = [
    { name: 'Sac à main artisanal', price: 35000, seller: 'Marie K.', rating: 4.8 },
    { name: 'Bijoux traditionnels', price: 18000, seller: 'Aisha M.', rating: 4.9 },
    { name: 'Poterie décorative', price: 22000, seller: 'Ibrahim S.', rating: 4.7 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête de bienvenue */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bonjour ! Découvrez vos recommandations du jour
          </h1>
          <p className="text-gray-600">Voici un aperçu de vos achats et de votre impact communautaire</p>
        </div>

        {/* Statistiques du jour */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Achats Aujourd'hui</p>
                  <p className="text-2xl font-bold text-gray-900">{todayStats.purchases}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+15% vs hier</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Économies Réalisées</p>
                  <p className="text-2xl font-bold text-gray-900">{formatAmount(todayStats.savings)}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <ArrowUpRight className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">Grâce aux promotions</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Contribution Ubuntu</p>
                  <p className="text-2xl font-bold text-gray-900">{formatAmount(todayStats.ubuntuContribution)}</p>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <Heart className="h-4 w-4 text-orange-500 mr-1" />
                <span className="text-sm text-orange-600">Impact solidaire</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Nouvelles Recommandations</p>
                  <p className="text-2xl font-bold text-gray-900">{todayStats.newRecommendations}</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-purple-500 mr-1" />
                <span className="text-sm text-purple-600">Basées sur vos goûts</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Objectif mensuel */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-green-600" />
                Objectif d'Achat Mensuel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progression</span>
                  <span className="text-sm text-gray-500">
                    {formatAmount(monthlyGoal.current)} / {formatAmount(monthlyGoal.target)}
                  </span>
                </div>
                <Progress value={monthlyGoal.percentage} className="h-3" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-600 font-medium">{monthlyGoal.percentage}% atteint</span>
                  <span className="text-gray-500">
                    {formatAmount(monthlyGoal.target - monthlyGoal.current)} restants
                  </span>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-800">
                    🎯 Excellent ! Vous êtes en bonne voie pour atteindre votre objectif mensuel. 
                    Continuez vos achats solidaires !
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achats récents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Achats Récents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPurchases.map((purchase, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{purchase.product}</p>
                      <p className="text-xs text-gray-500">par {purchase.seller}</p>
                      <div className="flex items-center mt-1">
                        <Badge 
                          variant={purchase.status === 'Livré' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {purchase.status}
                        </Badge>
                        {purchase.rating && (
                          <div className="flex items-center ml-2">
                            {[...Array(purchase.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 text-yellow-500 fill-current" />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{formatAmount(purchase.amount)}</p>
                      <p className="text-xs text-gray-500">{purchase.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recommandations personnalisées */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-purple-600" />
                Recommandations Pour Vous
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendations.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      <ShoppingBag className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-medium text-sm mb-1">{item.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">par {item.seller}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">{formatAmount(item.price)}</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        <span className="text-xs">{item.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
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
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Parcourir les produits
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="h-4 w-4 mr-2" />
                  Mes favoris
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Mes statistiques
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setShowCreatePost(true)}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Partager une expérience
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

export default BuyerHomePage;

