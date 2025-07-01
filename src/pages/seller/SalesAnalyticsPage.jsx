import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Package,
  Users,
  Star,
  Calendar,
  Download,
  Filter,
  Heart,
  Target
} from 'lucide-react';
import { useCurrency } from '../../contexts/CurrencyContext.jsx';

const SalesAnalyticsPage = () => {
  const { formatAmount } = useCurrency();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const salesData = {
    totalRevenue: 450000,
    totalSales: 45,
    averageOrderValue: 10000,
    conversionRate: 3.2,
    ubuntuImpact: 25000,
    topProducts: [
      { name: 'Panier traditionnel', sales: 15, revenue: 375000, growth: 12 },
      { name: 'Tissu Wax', sales: 12, revenue: 180000, growth: 8 },
      { name: 'Épices mélangées', sales: 10, revenue: 80000, growth: -5 },
      { name: 'Collier perles', sales: 8, revenue: 96000, growth: 15 }
    ],
    monthlyTrends: [
      { month: 'Jan', sales: 28, revenue: 320000 },
      { month: 'Fév', sales: 32, revenue: 380000 },
      { month: 'Mar', sales: 35, revenue: 410000 },
      { month: 'Avr', sales: 38, revenue: 425000 },
      { month: 'Mai', sales: 42, revenue: 445000 },
      { month: 'Juin', sales: 45, revenue: 450000 }
    ]
  };

  const impactMetrics = {
    helpReceived: 25000,
    productivityIncrease: 35,
    newCustomers: 12,
    customerRetention: 78,
    communityRating: 4.8
  };

  const customerInsights = [
    { segment: 'Clients fidèles', count: 18, percentage: 40, avgSpend: 15000 },
    { segment: 'Nouveaux clients', count: 12, percentage: 27, avgSpend: 8000 },
    { segment: 'Clients occasionnels', count: 15, percentage: 33, avgSpend: 6000 }
  ];

  const getGrowthIcon = (growth) => {
    return growth > 0 ? <TrendingUp className="h-4 w-4 text-green-600" /> : <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  const getGrowthColor = (growth) => {
    return growth > 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Ventes - Analytics</h1>
              <p className="text-gray-600">Analysez vos performances et l'impact de l'aide Ubuntu</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
                <option value="quarter">Ce trimestre</option>
                <option value="year">Cette année</option>
              </select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </div>

        {/* Métriques principales */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Revenus</p>
                  <p className="text-2xl font-bold">{formatAmount(salesData.totalRevenue)}</p>
                </div>
                <DollarSign className="h-8 w-8 opacity-90" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Ventes</p>
                  <p className="text-2xl font-bold">{salesData.totalSales}</p>
                </div>
                <Package className="h-8 w-8 opacity-90" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Panier Moyen</p>
                  <p className="text-2xl font-bold">{formatAmount(salesData.averageOrderValue)}</p>
                </div>
                <BarChart3 className="h-8 w-8 opacity-90" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Aide Ubuntu</p>
                  <p className="text-2xl font-bold">{formatAmount(salesData.ubuntuImpact)}</p>
                </div>
                <Heart className="h-8 w-8 opacity-90" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Conversion</p>
                  <p className="text-2xl font-bold">{salesData.conversionRate}%</p>
                </div>
                <Target className="h-8 w-8 opacity-90" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="products">Produits</TabsTrigger>
            <TabsTrigger value="customers">Clients</TabsTrigger>
            <TabsTrigger value="impact">Impact Ubuntu</TabsTrigger>
          </TabsList>

          {/* Vue d'ensemble */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Évolution des Ventes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Graphique d'évolution des ventes mensuelles</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Répartition des Revenus</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Graphique en secteurs des revenus par catégorie</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Tendances Mensuelles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesData.monthlyTrends.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{trend.month} 2024</p>
                          <p className="text-sm text-gray-600">{trend.sales} ventes</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{formatAmount(trend.revenue)}</p>
                        <p className="text-sm text-gray-600">Revenus</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analyse des produits */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Performance des Produits</CardTitle>
                <p className="text-sm text-gray-600">Analysez les performances de chaque produit</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesData.topProducts.map((product, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-600">{product.sales} ventes ce mois</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getGrowthIcon(product.growth)}
                          <span className={`text-sm font-medium ${getGrowthColor(product.growth)}`}>
                            {product.growth > 0 ? '+' : ''}{product.growth}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Revenus</p>
                          <p className="font-bold text-gray-900">{formatAmount(product.revenue)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Prix moyen</p>
                          <p className="font-medium text-gray-900">{formatAmount(Math.round(product.revenue / product.sales))}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Part des ventes</p>
                          <p className="font-medium text-gray-900">{Math.round((product.sales / salesData.totalSales) * 100)}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analyse des clients */}
          <TabsContent value="customers">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Segmentation Clients</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customerInsights.map((segment, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900">{segment.segment}</h3>
                          <Badge variant="outline">{segment.percentage}%</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Nombre</p>
                            <p className="font-bold text-blue-600">{segment.count}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Dépense moyenne</p>
                            <p className="font-bold text-green-600">{segment.avgSpend.toLocaleString()} FCFA</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Métriques Clients</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Taux de fidélisation</span>
                        <span className="font-medium">{impactMetrics.customerRetention}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${impactMetrics.customerRetention}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Note communautaire</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="font-medium">{impactMetrics.communityRating}/5</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Nouveaux clients ce mois</h4>
                      <p className="text-2xl font-bold text-blue-600">{impactMetrics.newCustomers}</p>
                      <p className="text-sm text-blue-700">+25% par rapport au mois dernier</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Impact Ubuntu */}
          <TabsContent value="impact">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-orange-600" />
                    Impact de l'Aide Ubuntu
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <h4 className="font-medium text-orange-800 mb-2">Aide totale reçue</h4>
                      <p className="text-2xl font-bold text-orange-600">{impactMetrics.helpReceived.toLocaleString()} FCFA</p>
                      <p className="text-sm text-orange-700">Ce mois-ci</p>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">Augmentation de productivité</h4>
                      <p className="text-2xl font-bold text-green-600">+{impactMetrics.productivityIncrease}%</p>
                      <p className="text-sm text-green-700">Grâce au soutien Ubuntu</p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Utilisation de l'aide</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Matériaux (60%)</span>
                          <span>15 000 FCFA</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Équipement (25%)</span>
                          <span>6 250 FCFA</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Formation (15%)</span>
                          <span>3 750 FCFA</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Corrélation Aide-Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Graphique montrant la corrélation entre l'aide reçue et les performances de vente</p>
                  </div>
                  
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">Insight clé</h4>
                    <p className="text-sm text-yellow-700">
                      L'aide Ubuntu a contribué à une augmentation de 35% de votre productivité et 
                      a permis d'attirer {impactMetrics.newCustomers} nouveaux clients ce mois.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SalesAnalyticsPage;

