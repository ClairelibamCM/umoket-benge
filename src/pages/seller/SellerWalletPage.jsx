import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { 
  Wallet, 
  Heart, 
  TrendingUp, 
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Gift,
  Calendar,
  Users
} from 'lucide-react';
import { useUserType } from '../../contexts/UserTypeContext.jsx';
import { useCurrency } from '../../contexts/CurrencyContext.jsx';

const SellerWalletPage = () => {
  const { currentProfile } = useUserType();
  const { formatAmount } = useCurrency();

  const transactions = [
    {
      id: 1,
      type: 'sale',
      description: 'Vente - Panier traditionnel',
      amount: 25000,
      date: '2024-06-20',
      buyer: 'Amadou Diop',
      status: 'completed'
    },
    {
      id: 2,
      type: 'ubuntu_aid',
      description: 'Aide Ubuntu reçue',
      amount: 1250,
      date: '2024-06-20',
      supporter: 'Fatima Ndiaye',
      status: 'completed'
    },
    {
      id: 3,
      type: 'sale',
      description: 'Vente - Tissu Wax',
      amount: 15000,
      date: '2024-06-19',
      buyer: 'Moussa Traoré',
      status: 'completed'
    },
    {
      id: 4,
      type: 'ubuntu_aid',
      description: 'Contribution communautaire',
      amount: 750,
      date: '2024-06-19',
      supporter: 'Aïcha Koné',
      status: 'completed'
    },
    {
      id: 5,
      type: 'withdrawal',
      description: 'Retrait vers Orange Money',
      amount: -30000,
      date: '2024-06-18',
      status: 'pending'
    }
  ];

  const monthlyStats = {
    salesRevenue: 450000,
    ubuntuAid: 25000,
    totalEarnings: 475000,
    withdrawals: 400000,
    pendingPayments: 15000
  };

  const getTransactionIcon = (type) => {
    switch(type) {
      case 'sale': return <ArrowUpRight className="h-4 w-4 text-green-600" />;
      case 'ubuntu_aid': return <Heart className="h-4 w-4 text-orange-600" />;
      case 'withdrawal': return <ArrowDownLeft className="h-4 w-4 text-blue-600" />;
      default: return <DollarSign className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTransactionColor = (type) => {
    switch(type) {
      case 'sale': return 'text-green-600';
      case 'ubuntu_aid': return 'text-orange-600';
      case 'withdrawal': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'completed': return 'Complété';
      case 'pending': return 'En attente';
      case 'failed': return 'Échoué';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon Portefeuille Vendeur</h1>
          <p className="text-gray-600">Gérez vos revenus et suivez l'aide Ubuntu reçue</p>
        </div>

        {/* Soldes principaux */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Revenus des Ventes</CardTitle>
              <DollarSign className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatAmount(monthlyStats.salesRevenue)}</div>
              <p className="text-xs opacity-90 mt-1">Ce mois-ci</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Aide Ubuntu Reçue</CardTitle>
              <Heart className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatAmount(monthlyStats.ubuntuAid)}</div>
              <p className="text-xs opacity-90 mt-1">Soutien communautaire</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Disponible</CardTitle>
              <Wallet className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatAmount(monthlyStats.totalEarnings - monthlyStats.withdrawals)}</div>
              <p className="text-xs opacity-90 mt-1">Prêt à retirer</p>
              <Button variant="secondary" size="sm" className="mt-3">
                Retirer
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">En Attente</CardTitle>
              <Calendar className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatAmount(monthlyStats.pendingPayments)}</div>
              <p className="text-xs opacity-90 mt-1">Paiements en cours</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analyses</TabsTrigger>
            <TabsTrigger value="ubuntu">Aide Ubuntu</TabsTrigger>
          </TabsList>

          {/* Historique des transactions */}
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Historique des Transactions</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exporter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{transaction.description}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(transaction.date).toLocaleDateString('fr-FR')}
                            {transaction.buyer && ` • ${transaction.buyer}`}
                            {transaction.supporter && ` • ${transaction.supporter}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className={`font-bold ${getTransactionColor(transaction.type)}`}>
                            {transaction.amount > 0 ? '+' : ''}{formatAmount(Math.abs(transaction.amount))}
                          </p>
                          <Badge className={getStatusColor(transaction.status)} variant="secondary">
                            {getStatusLabel(transaction.status)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline">
                    Voir plus de transactions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analyses financières */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Évolution des Revenus</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Graphique d'évolution des revenus mensuels</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Répartition des Revenus</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Ventes directes</span>
                      <span className="font-medium">{((monthlyStats.salesRevenue / monthlyStats.totalEarnings) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(monthlyStats.salesRevenue / monthlyStats.totalEarnings) * 100} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Aide Ubuntu</span>
                      <span className="font-medium">{((monthlyStats.ubuntuAid / monthlyStats.totalEarnings) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(monthlyStats.ubuntuAid / monthlyStats.totalEarnings) * 100} className="h-2" />

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        L'aide Ubuntu représente {((monthlyStats.ubuntuAid / monthlyStats.totalEarnings) * 100).toFixed(1)}% de vos revenus ce mois-ci, 
                        soit {monthlyStats.ubuntuAid.toLocaleString()} FCFA de soutien communautaire !
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Détail de l'aide Ubuntu */}
          <TabsContent value="ubuntu">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-orange-600" />
                    Soutien Ubuntu Reçu
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.filter(t => t.type === 'ubuntu_aid').map((aid, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                            <Heart className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{aid.supporter}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(aid.date).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-orange-600">+{aid.amount.toLocaleString()} FCFA</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-purple-600" />
                    Impact de l'Aide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">Nouveaux matériaux</h4>
                      <p className="text-sm text-green-700">
                        Grâce au soutien reçu, j'ai pu acheter de nouveaux matériaux pour diversifier mes créations.
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Amélioration de l'atelier</h4>
                      <p className="text-sm text-blue-700">
                        L'aide Ubuntu m'a permis d'améliorer mon espace de travail et d'augmenter ma productivité.
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <h4 className="font-medium text-purple-800 mb-2">Formation</h4>
                      <p className="text-sm text-purple-700">
                        J'ai pu suivre une formation en marketing digital grâce au soutien de la communauté.
                      </p>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600">
                    <Gift className="h-4 w-4 mr-2" />
                    Partager mon histoire d'impact
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SellerWalletPage;

