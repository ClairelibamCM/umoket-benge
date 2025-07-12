import React from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Heart, TrendingUp, Users, ShoppingBag } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext.jsx';
import SocialFeed from '../components/SocialFeed.jsx';
import marketImage from '../assets/w6Oe7NA4CSnv.jpeg';

const HomePage = () => {
  const { formatAmount } = useCurrency();
  
  const featuredProducts = [
    {
      id: 1,
      name: "Panier en osier traditionnel",
      price: 25000,
      seller: "Aminata Diallo",
      location: "Dakar, Sénégal",
      image: "/api/placeholder/300/200",
      helpNeeded: true
    },
    {
      id: 2,
      name: "Tissu Wax authentique",
      price: 15000,
      seller: "Kofi Asante",
      location: "Accra, Ghana",
      image: "/api/placeholder/300/200",
      helpNeeded: false
    },
    {
      id: 3,
      name: "Épices locales mélangées",
      price: 8000,
      seller: "Fatou Keita",
      location: "Bamako, Mali",
      image: "/api/placeholder/300/200",
      helpNeeded: true
    }
  ];

  const impactStats = {
    totalContributions: 2450000,
    vendorsHelped: 127,
    todayImpact: 45000
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bienvenue sur UmoKet
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              La première marketplace africaine à redistribution automatique. 
              Chaque achat aide un vendeur en difficulté grâce à la Tirelire Ubuntu.
            </p>
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Commencer à acheter
            </Button>
          </div>
        </div>
      </div>

      {/* Impact du jour */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Impact du jour</h2>
          <p className="text-gray-600">Ensemble, nous construisons une économie plus solidaire</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center justify-center text-orange-600">
                <Heart className="mr-2 h-6 w-6" />
                Contributions Totales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">{formatAmount(impactStats.totalContributions)}</p>
              <p className="text-gray-600">Redistribués aux vendeurs</p>
            </CardContent>
          </Card>

          <Card className="text-center border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center justify-center text-green-600">
                <Users className="mr-2 h-6 w-6" />
                Vendeurs Aidés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">{impactStats.vendorsHelped}</p>
              <p className="text-gray-600">Entrepreneurs soutenus</p>
            </CardContent>
          </Card>

          <Card className="text-center border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center justify-center text-blue-600">
                <TrendingUp className="mr-2 h-6 w-6" />
                Impact Aujourd'hui
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">{formatAmount(impactStats.todayImpact)}</p>
              <p className="text-gray-600">Générés aujourd'hui</p>
            </CardContent>
          </Card>
        </div>

        {/* Carrousel des Nouvelles et Actualités */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nouvelles & Actualités</h2>
            <p className="text-gray-600">Restez informé des dernières nouvelles de la communauté UmoKet</p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-lg">
              <div className="flex transition-transform duration-500 ease-in-out">
                {/* Article 1 */}
                <div className="w-full flex-shrink-0">
                  <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <span className="inline-block bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm mb-4">
                            Nouvelle Fonctionnalité
                          </span>
                          <h3 className="text-2xl font-bold mb-4">
                            Lancement du système de parrainage UmoKet !
                          </h3>
                          <p className="text-purple-100 mb-6">
                            Invitez vos amis et gagnez des crédits Ubuntu pour chaque nouveau membre qui rejoint la communauté. 
                            Plus vous parrainez, plus vous contribuez à l'expansion de notre mission solidaire.
                          </p>
                          <Button className="bg-white text-purple-600 hover:bg-purple-50">
                            Découvrir le parrainage
                          </Button>
                        </div>
                        <div className="hidden md:block ml-8">
                          <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                            <Users className="h-16 w-16 text-white" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Article 2 */}
                <div className="w-full flex-shrink-0">
                  <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <span className="inline-block bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm mb-4">
                            Impact Communautaire
                          </span>
                          <h3 className="text-2xl font-bold mb-4">
                            Plus de 2,4 millions FCFA redistribués !
                          </h3>
                          <p className="text-green-100 mb-6">
                            Grâce à votre engagement, la Tirelire Ubuntu a permis d'aider 127 vendeurs en difficulté. 
                            Chaque achat compte et contribue à bâtir une économie plus équitable.
                          </p>
                          <Button className="bg-white text-green-600 hover:bg-green-50">
                            Voir mon impact
                          </Button>
                        </div>
                        <div className="hidden md:block ml-8">
                          <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                            <Heart className="h-16 w-16 text-white" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Article 3 */}
                <div className="w-full flex-shrink-0">
                  <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <span className="inline-block bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm mb-4">
                            Nouveaux Vendeurs
                          </span>
                          <h3 className="text-2xl font-bold mb-4">
                            Découvrez nos nouveaux artisans !
                          </h3>
                          <p className="text-orange-100 mb-6">
                            Cette semaine, 15 nouveaux vendeurs ont rejoint UmoKet avec des produits authentiques 
                            d'Afrique de l'Ouest. Explorez leurs créations uniques et soutenez leur entrepreneuriat.
                          </p>
                          <Button className="bg-white text-orange-600 hover:bg-orange-50">
                            Découvrir les nouveautés
                          </Button>
                        </div>
                        <div className="hidden md:block ml-8">
                          <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                            <ShoppingBag className="h-16 w-16 text-white" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Indicateurs de navigation */}
            <div className="flex justify-center mt-6 space-x-2">
              <button className="w-3 h-3 rounded-full bg-purple-600"></button>
              <button className="w-3 h-3 rounded-full bg-gray-300"></button>
              <button className="w-3 h-3 rounded-full bg-gray-300"></button>
            </div>
          </div>
        </div>

        {/* Produits en vedette */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Produits en vedette</h2>
            <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
              Voir tout le catalogue
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={marketImage} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.helpNeeded && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                      Aide nécessaire
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-orange-600 font-bold text-xl mb-2">{formatAmount(product.price)}</p>
                  <p className="text-gray-600 text-sm mb-1">Vendu par {product.seller}</p>
                  <p className="text-gray-500 text-xs mb-4">{product.location}</p>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    Acheter maintenant
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Fil d'actualité social */}
        <div className="mb-12">
          <SocialFeed feedType="public" />
        </div>

        {/* Section Ubuntu */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">La Tirelire Ubuntu en action</h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            Ubuntu signifie "Je suis parce que nous sommes". Chaque achat sur UmoKet contribue 
            automatiquement à 0,5% à notre Tirelire Ubuntu, redistribuée aux vendeurs qui en ont le plus besoin.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            En savoir plus sur Ubuntu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

