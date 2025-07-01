import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  AlertCircle,
  Star,
  Camera,
  Lightbulb,
  BarChart3
} from 'lucide-react';
import { useCurrency } from '../../contexts/CurrencyContext.jsx';

const ProductsPage = () => {
  const { formatAmount } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    {
      id: 1,
      name: 'Panier en osier traditionnel',
      category: 'Artisanat',
      price: 25000,
      stock: 12,
      sales: 45,
      rating: 4.8,
      status: 'active',
      image: '/api/placeholder/80/80',
      lastSold: '2024-06-20',
      suggestions: ['Ajouter plus de photos', 'Améliorer la description']
    },
    {
      id: 2,
      name: 'Tissu Wax authentique',
      category: 'Textile',
      price: 15000,
      stock: 8,
      sales: 32,
      rating: 4.9,
      status: 'active',
      image: '/api/placeholder/80/80',
      lastSold: '2024-06-19',
      suggestions: ['Proposer des couleurs variées']
    },
    {
      id: 3,
      name: 'Épices locales mélangées',
      category: 'Alimentation',
      price: 8000,
      stock: 3,
      sales: 28,
      rating: 4.7,
      status: 'low_stock',
      image: '/api/placeholder/80/80',
      lastSold: '2024-06-18',
      suggestions: ['Stock faible - réapprovisionner', 'Créer un pack famille']
    },
    {
      id: 4,
      name: 'Collier perles traditionnelles',
      category: 'Bijoux',
      price: 12000,
      stock: 0,
      sales: 15,
      rating: 4.6,
      status: 'out_of_stock',
      image: '/api/placeholder/80/80',
      lastSold: '2024-06-10',
      suggestions: ['Rupture de stock - urgent', 'Proposer des variantes']
    }
  ];

  const categories = ['all', 'Artisanat', 'Textile', 'Alimentation', 'Bijoux', 'Décoration'];

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'active': return 'Actif';
      case 'low_stock': return 'Stock faible';
      case 'out_of_stock': return 'Rupture';
      default: return 'Inconnu';
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'active').length;
  const totalSales = products.reduce((sum, p) => sum + p.sales, 0);
  const averageRating = products.reduce((sum, p) => sum + p.rating, 0) / products.length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Produits</h1>
              <p className="text-gray-600">Gérez votre catalogue et optimisez vos ventes</p>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un produit
            </Button>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total produits</p>
                  <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
                </div>
                <Package className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Produits actifs</p>
                  <p className="text-2xl font-bold text-green-600">{activeProducts}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ventes totales</p>
                  <p className="text-2xl font-bold text-orange-600">{totalSales}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Note moyenne</p>
                  <p className="text-2xl font-bold text-purple-600">{averageRating.toFixed(1)}</p>
                </div>
                <Star className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Catalogue</TabsTrigger>
            <TabsTrigger value="optimization">Optimisation</TabsTrigger>
            <TabsTrigger value="analytics">Analyses</TabsTrigger>
          </TabsList>

          {/* Catalogue des produits */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <CardTitle>Catalogue des Produits</CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Rechercher un produit..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category === 'all' ? 'Toutes catégories' : category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-4">
                        {/* Image du produit */}
                        <div className="w-20 h-20 bg-gray-300 rounded-lg flex items-center justify-center">
                          <Camera className="h-8 w-8 text-gray-500" />
                        </div>

                        {/* Informations du produit */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                              <div className="flex items-center space-x-4 text-sm">
                                <span className="font-medium text-gray-900">
                                  {formatAmount(product.price)}
                                </span>
                                <span className="text-gray-600">Stock: {product.stock}</span>
                                <span className="text-gray-600">{product.sales} ventes</span>
                                <div className="flex items-center">
                                  <Star className="h-3 w-3 text-yellow-500 mr-1" />
                                  <span>{product.rating}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getStatusColor(product.status)}>
                                {getStatusLabel(product.status)}
                              </Badge>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                Modifier
                              </Button>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                Voir
                              </Button>
                            </div>
                          </div>

                          {/* Suggestions d'optimisation */}
                          {product.suggestions && product.suggestions.length > 0 && (
                            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                              <div className="flex items-start">
                                <Lightbulb className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-blue-800 mb-1">Suggestions d'amélioration :</p>
                                  <ul className="text-sm text-blue-700 space-y-1">
                                    {product.suggestions.map((suggestion, index) => (
                                      <li key={index}>• {suggestion}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Alertes de stock */}
                          {(product.status === 'low_stock' || product.status === 'out_of_stock') && (
                            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                              <div className="flex items-center">
                                <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                                <p className="text-sm text-red-800">
                                  {product.status === 'out_of_stock' 
                                    ? 'Produit en rupture de stock - action requise'
                                    : 'Stock faible - pensez à réapprovisionner'
                                  }
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Optimisation */}
          <TabsContent value="optimization">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                    Recommandations IA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-medium text-yellow-800 mb-2">Optimisation des prix</h4>
                      <p className="text-sm text-yellow-700">
                        Vos paniers traditionnels se vendent bien. Considérez une augmentation de 10% du prix.
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Nouveaux produits suggérés</h4>
                      <p className="text-sm text-blue-700">
                        Basé sur vos ventes, les clients pourraient être intéressés par des sets de table assortis.
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">Amélioration des photos</h4>
                      <p className="text-sm text-green-700">
                        Ajoutez des photos en situation d'usage pour augmenter les ventes de 25%.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actions Prioritaires</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                        <span className="text-sm font-medium text-red-800">Réapprovisionner colliers</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Action
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
                        <span className="text-sm font-medium text-yellow-800">Stock faible épices</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Action
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center">
                        <Camera className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-sm font-medium text-blue-800">Améliorer photos paniers</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Action
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analyses */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance des Ventes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Graphique des ventes par produit</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Évolution des Stocks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Graphique d'évolution des stocks</p>
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

export default ProductsPage;

