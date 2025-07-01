import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Heart, 
  Star,
  Calendar,
  MapPin,
  TrendingUp,
  Download,
  Eye,
  Package
} from 'lucide-react';
import { useUserType } from '../../contexts/UserTypeContext.jsx';
import { useCurrency } from '../../contexts/CurrencyContext.jsx';

const PurchasesPage = () => {
  const { currentProfile } = useUserType();
  const { formatAmount } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const purchases = [
    {
      id: 'CMD001',
      date: '2024-06-20',
      vendor: 'Aminata Diallo',
      vendorLocation: 'Dakar, Sénégal',
      items: [
        { name: 'Panier en osier traditionnel', price: 25000, quantity: 1, image: '/api/placeholder/60/60' }
      ],
      total: 25000,
      ubuntuContribution: 125,
      status: 'Livré',
      rating: 5,
      impact: 'Votre achat a permis à Aminata d\'acheter de nouveaux matériaux pour ses créations'
    },
    {
      id: 'CMD002',
      date: '2024-06-18',
      vendor: 'Kofi Asante',
      vendorLocation: 'Accra, Ghana',
      items: [
        { name: 'Tissu Wax authentique', price: 15000, quantity: 2, image: '/api/placeholder/60/60' }
      ],
      total: 30000,
      ubuntuContribution: 150,
      status: 'En transit',
      rating: null,
      impact: 'Votre contribution Ubuntu aide Kofi à développer sa gamme de tissus'
    },
    {
      id: 'CMD003',
      date: '2024-06-15',
      vendor: 'Fatou Keita',
      vendorLocation: 'Bamako, Mali',
      items: [
        { name: 'Épices locales mélangées', price: 8000, quantity: 3, image: '/api/placeholder/60/60' }
      ],
      total: 24000,
      ubuntuContribution: 120,
      status: 'Livré',
      rating: 4,
      impact: 'Grâce à votre soutien, Fatou a pu améliorer l\'emballage de ses produits'
    }
  ];

  const impactStats = {
    totalSpent: purchases.reduce((sum, purchase) => sum + purchase.total, 0),
    totalUbuntuContributions: purchases.reduce((sum, purchase) => sum + purchase.ubuntuContribution, 0),
    vendorsSupported: [...new Set(purchases.map(p => p.vendor))].length,
    averageRating: purchases.filter(p => p.rating).reduce((sum, p) => sum + p.rating, 0) / purchases.filter(p => p.rating).length
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Livré': return 'bg-green-100 text-green-800';
      case 'En transit': return 'bg-blue-100 text-blue-800';
      case 'En préparation': return 'bg-yellow-100 text-yellow-800';
      case 'Annulé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = purchase.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         purchase.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'delivered') return matchesSearch && purchase.status === 'Livré';
    if (selectedFilter === 'pending') return matchesSearch && purchase.status !== 'Livré';
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Achats</h1>
          <p className="text-gray-600">Suivez vos commandes et découvrez l'impact de vos achats</p>
        </div>

        {/* Statistiques d'impact */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total dépensé</p>
                  <p className="text-2xl font-bold">{formatAmount(impactStats.totalSpent)}</p>
                </div>
                <ShoppingBag className="h-8 w-8 opacity-90" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Contributions Ubuntu</p>
                  <p className="text-2xl font-bold">{formatAmount(impactStats.totalUbuntuContributions)}</p>
                </div>
                <Heart className="h-8 w-8 opacity-90" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Vendeurs soutenus</p>
                  <p className="text-2xl font-bold">{impactStats.vendorsSupported}</p>
                </div>
                <TrendingUp className="h-8 w-8 opacity-90" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Note moyenne</p>
                  <p className="text-2xl font-bold">{impactStats.averageRating.toFixed(1)}/5</p>
                </div>
                <Star className="h-8 w-8 opacity-90" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="purchases" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="purchases">Historique des achats</TabsTrigger>
            <TabsTrigger value="impact">Impact détaillé</TabsTrigger>
          </TabsList>

          {/* Historique des achats */}
          <TabsContent value="purchases">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <CardTitle className="flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Historique des commandes
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <select
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="all">Toutes les commandes</option>
                      <option value="delivered">Livrées</option>
                      <option value="pending">En cours</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {filteredPurchases.map((purchase) => (
                    <div key={purchase.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      {/* En-tête de la commande */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-medium text-gray-900">Commande #{purchase.id}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(purchase.date).toLocaleDateString('fr-FR')} • {purchase.vendor}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(purchase.status)}>
                            {purchase.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Détails
                          </Button>
                        </div>
                      </div>

                      {/* Articles */}
                      <div className="space-y-3 mb-4">
                        {purchase.items.map((item, index) => (
                          <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                            <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-900">{formatAmount(item.price)}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Résumé et impact */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-6">
                          <div>
                            <p className="text-sm text-gray-600">Total</p>
                            <p className="font-bold text-lg">{formatAmount(purchase.total)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Contribution Ubuntu</p>
                            <p className="font-medium text-orange-600">+{formatAmount(purchase.ubuntuContribution)}</p>
                          </div>
                          {purchase.rating && (
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="text-sm font-medium">{purchase.rating}/5</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {purchase.status === 'Livré' && !purchase.rating && (
                            <Button variant="outline" size="sm">
                              Noter
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Facture
                          </Button>
                        </div>
                      </div>

                      {/* Impact */}
                      {purchase.impact && (
                        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                          <div className="flex items-start">
                            <Heart className="h-4 w-4 text-orange-600 mr-2 mt-0.5" />
                            <p className="text-sm text-orange-800">{purchase.impact}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Impact détaillé */}
          <TabsContent value="impact">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Graphique d'évolution */}
              <Card>
                <CardHeader>
                  <CardTitle>Évolution de vos contributions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Graphique d'évolution des contributions Ubuntu</p>
                  </div>
                </CardContent>
              </Card>

              {/* Impact par vendeur */}
              <Card>
                <CardHeader>
                  <CardTitle>Impact par vendeur</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...new Set(purchases.map(p => p.vendor))].map((vendor, index) => {
                      const vendorPurchases = purchases.filter(p => p.vendor === vendor);
                      const totalContribution = vendorPurchases.reduce((sum, p) => sum + p.ubuntuContribution, 0);
                      const totalSpent = vendorPurchases.reduce((sum, p) => sum + p.total, 0);
                      
                      return (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium text-sm">
                                {vendor.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{vendor}</p>
                              <p className="text-sm text-gray-600">
                                {vendorPurchases.length} commande{vendorPurchases.length > 1 ? 's' : ''}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-orange-600">+{totalContribution} FCFA</p>
                            <p className="text-sm text-gray-500">{totalSpent.toLocaleString()} FCFA total</p>
                          </div>
                        </div>
                      );
                    })}
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

export default PurchasesPage;

