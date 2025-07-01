import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { Wallet, Heart, ShoppingBag, TrendingUp, Users, Gift } from 'lucide-react';

const DashboardPage = () => {
  const userStats = {
    balance: "125 000 FCFA",
    totalContributions: "15 750 FCFA",
    ordersCount: 23,
    vendorsHelped: 8
  };

  const recentContributions = [
    {
      id: 1,
      vendor: "Aminata Diallo",
      amount: "125 FCFA",
      date: "Aujourd'hui",
      product: "Panier en osier"
    },
    {
      id: 2,
      vendor: "Kofi Asante",
      amount: "75 FCFA",
      date: "Hier",
      product: "Tissu Wax"
    },
    {
      id: 3,
      vendor: "Fatou Keita",
      amount: "40 FCFA",
      date: "Il y a 2 jours",
      product: "Épices locales"
    }
  ];

  const recentOrders = [
    {
      id: "CMD001",
      date: "Aujourd'hui",
      total: "25 000 FCFA",
      status: "En cours",
      items: 2
    },
    {
      id: "CMD002",
      date: "Hier",
      total: "15 000 FCFA",
      status: "Livré",
      items: 1
    },
    {
      id: "CMD003",
      date: "Il y a 3 jours",
      total: "8 000 FCFA",
      status: "Livré",
      items: 1
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
          <p className="text-gray-600">Bienvenue sur votre espace personnel</p>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Solde</CardTitle>
              <Wallet className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{userStats.balance}</div>
              <p className="text-xs text-gray-600">Disponible pour vos achats</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contributions Ubuntu</CardTitle>
              <Heart className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{userStats.totalContributions}</div>
              <p className="text-xs text-gray-600">Total redistribué</p>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commandes</CardTitle>
              <ShoppingBag className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{userStats.ordersCount}</div>
              <p className="text-xs text-gray-600">Commandes passées</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendeurs Aidés</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{userStats.vendorsHelped}</div>
              <p className="text-xs text-gray-600">Entrepreneurs soutenus</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contributions récentes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="mr-2 h-5 w-5 text-orange-600" />
                Contributions Ubuntu Récentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentContributions.map((contribution) => (
                  <div key={contribution.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{contribution.vendor}</p>
                      <p className="text-sm text-gray-600">{contribution.product}</p>
                      <p className="text-xs text-gray-500">{contribution.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-orange-600">+{contribution.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 border-orange-600 text-orange-600 hover:bg-orange-50">
                Voir toutes les contributions
              </Button>
            </CardContent>
          </Card>

          {/* Commandes récentes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5 text-green-600" />
                Commandes Récentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Commande #{order.id}</p>
                      <p className="text-sm text-gray-600">{order.items} article(s)</p>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{order.total}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'Livré' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 border-green-600 text-green-600 hover:bg-green-50">
                Voir toutes les commandes
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Objectif Ubuntu */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
              Objectif Ubuntu du Mois
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Progression vers 20 000 FCFA de contributions</span>
                <span className="text-sm text-gray-600">15 750 / 20 000 FCFA</span>
              </div>
              <Progress value={78.75} className="w-full" />
              <p className="text-sm text-gray-600">
                Plus que 4 250 FCFA pour atteindre votre objectif mensuel et débloquer 
                un badge spécial "Ubuntu Champion" !
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;

