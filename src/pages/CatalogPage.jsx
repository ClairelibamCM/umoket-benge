import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Search, Filter, Heart, MapPin, AlertCircle } from 'lucide-react';
import marketImage from '../assets/w6Oe7NA4CSnv.jpeg';

const CatalogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showHelpNeeded, setShowHelpNeeded] = useState(false);

  const categories = [
    { id: 'all', name: 'Tous les produits' },
    { id: 'artisanat', name: 'Artisanat' },
    { id: 'textile', name: 'Textile' },
    { id: 'alimentation', name: 'Alimentation' },
    { id: 'bijoux', name: 'Bijoux' },
    { id: 'decoration', name: 'Décoration' }
  ];

  const products = [
    {
      id: 1,
      name: "Panier en osier traditionnel",
      price: "25 000 FCFA",
      seller: "Aminata Diallo",
      location: "Dakar, Sénégal",
      category: "artisanat",
      image: marketImage,
      helpNeeded: true,
      rating: 4.8,
      sales: 45,
      description: "Panier artisanal tissé à la main selon les techniques traditionnelles sénégalaises."
    },
    {
      id: 2,
      name: "Tissu Wax authentique",
      price: "15 000 FCFA",
      seller: "Kofi Asante",
      location: "Accra, Ghana",
      category: "textile",
      image: marketImage,
      helpNeeded: false,
      rating: 4.9,
      sales: 128,
      description: "Tissu Wax de haute qualité aux motifs traditionnels ghanéens."
    },
    {
      id: 3,
      name: "Épices locales mélangées",
      price: "8 000 FCFA",
      seller: "Fatou Keita",
      location: "Bamako, Mali",
      category: "alimentation",
      image: marketImage,
      helpNeeded: true,
      rating: 4.7,
      sales: 67,
      description: "Mélange d'épices traditionnelles maliennes pour sublimer vos plats."
    },
    {
      id: 4,
      name: "Collier en perles de verre",
      price: "12 000 FCFA",
      seller: "Adama Traoré",
      location: "Ouagadougou, Burkina Faso",
      category: "bijoux",
      image: marketImage,
      helpNeeded: false,
      rating: 4.6,
      sales: 34,
      description: "Collier artisanal en perles de verre colorées, pièce unique."
    },
    {
      id: 5,
      name: "Sculpture en bois d'ébène",
      price: "45 000 FCFA",
      seller: "Jean-Baptiste Ngozi",
      location: "Kinshasa, RDC",
      category: "decoration",
      image: marketImage,
      helpNeeded: true,
      rating: 4.9,
      sales: 12,
      description: "Sculpture traditionnelle en bois d'ébène représentant un masque ancestral."
    },
    {
      id: 6,
      name: "Sac en cuir tanné",
      price: "35 000 FCFA",
      seller: "Mariam Coulibaly",
      location: "Marrakech, Maroc",
      category: "artisanat",
      image: marketImage,
      helpNeeded: false,
      rating: 4.8,
      sales: 89,
      description: "Sac en cuir véritable tanné selon les méthodes traditionnelles marocaines."
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesHelpFilter = !showHelpNeeded || product.helpNeeded;
    
    return matchesSearch && matchesCategory && matchesHelpFilter;
  });

  const vendorsNeedingHelp = products.filter(p => p.helpNeeded);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Catalogue Produits</h1>
          
          {/* Barre de recherche */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Rechercher des produits, vendeurs..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant={showHelpNeeded ? "default" : "outline"}
              onClick={() => setShowHelpNeeded(!showHelpNeeded)}
              className={showHelpNeeded ? "bg-red-600 hover:bg-red-700" : "border-red-600 text-red-600 hover:bg-red-50"}
            >
              <AlertCircle className="mr-2 h-4 w-4" />
              Vendeurs à aider
            </Button>
          </div>

          {/* Filtres par catégorie */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? "bg-orange-600 hover:bg-orange-700" : ""}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Section Vendeurs à Aider */}
        {vendorsNeedingHelp.length > 0 && (
          <div className="mb-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                <AlertCircle className="mr-2 h-5 w-5" />
                Vendeurs ayant besoin d'aide ({vendorsNeedingHelp.length})
              </h2>
              <p className="text-red-700 mb-4">
                Ces vendeurs traversent une période difficile. Votre achat les aidera directement 
                grâce à la redistribution de la Tirelire Ubuntu.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {vendorsNeedingHelp.slice(0, 3).map((product) => (
                  <Card key={product.id} className="border-red-200 bg-white">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{product.seller}</h3>
                          <p className="text-xs text-gray-600 flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            {product.location}
                          </p>
                          <p className="text-xs text-red-600 font-medium">Aide nécessaire</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Grille de produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.helpNeeded && (
                  <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
                    Aide nécessaire
                  </Badge>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 left-2 bg-white/80 hover:bg-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-orange-600 font-bold text-xl">{product.price}</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-600">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.sales})</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-900">{product.seller}</p>
                  <p className="text-xs text-gray-600 flex items-center">
                    <MapPin className="mr-1 h-3 w-3" />
                    {product.location}
                  </p>
                </div>
                
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  Acheter maintenant
                </Button>
                
                <p className="text-xs text-gray-500 mt-2 text-center">
                  + 0,5% pour la Tirelire Ubuntu
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun produit trouvé pour votre recherche.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setShowHelpNeeded(false);
              }}
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;

