import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { Heart, Users, TrendingUp, Award, MapPin, Calendar, Star } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext.jsx';
import marketImage from '../assets/w6Oe7NA4CSnv.jpeg';

const ImpactPage = () => {
  const { formatAmount } = useCurrency();
  
  const impactStats = {
    totalContributions: 15750,
    vendorsHelped: 8,
    monthlyGoal: 20000,
    currentMonth: 15750,
    badges: 3
  };

  const helpedVendors = [
    {
      id: 1,
      name: "Aminata Diallo",
      location: "Dakar, Sénégal",
      specialty: "Artisanat traditionnel",
      helpReceived: 3250,
      image: marketImage,
      story: "Grâce à votre aide, Aminata a pu acheter de nouveaux matériaux pour ses paniers et augmenter sa production de 40%.",
      lastHelp: "Il y a 2 jours",
      totalOrders: 5
    },
    {
      id: 2,
      name: "Fatou Keita",
      location: "Bamako, Mali",
      specialty: "Épices et condiments",
      helpReceived: 2100,
      image: marketImage,
      story: "Votre soutien a permis à Fatou de diversifier sa gamme d'épices et d'atteindre de nouveaux clients.",
      lastHelp: "Il y a 1 semaine",
      totalOrders: 3
    },
    {
      id: 3,
      name: "Jean-Baptiste Ngozi",
      location: "Kinshasa, RDC",
      specialty: "Sculpture sur bois",
      helpReceived: 1800,
      image: marketImage,
      story: "Grâce à la Tirelire Ubuntu, Jean-Baptiste a pu investir dans de nouveaux outils de sculpture.",
      lastHelp: "Il y a 2 semaines",
      totalOrders: 2
    }
  ];

  const successStories = [
    {
      id: 1,
      vendor: "Mariam Coulibaly",
      location: "Marrakech, Maroc",
      achievement: "A ouvert sa deuxième boutique",
      description: "Après 6 mois de soutien via la Tirelire Ubuntu, Mariam a pu ouvrir une seconde boutique et embaucher 3 employés.",
      image: marketImage,
      date: "Mars 2024"
    },
    {
      id: 2,
      vendor: "Kofi Asante",
      location: "Accra, Ghana",
      achievement: "Production multipliée par 3",
      description: "Le soutien reçu a permis à Kofi d'investir dans de nouveaux métiers à tisser et de tripler sa production.",
      image: marketImage,
      date: "Février 2024"
    }
  ];

  const badges = [
    {
      id: 1,
      name: "Premier Pas Ubuntu",
      description: "Première contribution à la Tirelire Ubuntu",
      earned: true,
      date: "Janvier 2024"
    },
    {
      id: 2,
      name: "Soutien Régulier",
      description: "10 contributions en un mois",
      earned: true,
      date: "Février 2024"
    },
    {
      id: 3,
      name: "Champion Ubuntu",
      description: "20 000 FCFA de contributions",
      earned: false,
      progress: 78.75
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon Impact</h1>
          <p className="text-gray-600">Découvrez comment vos achats transforment des vies</p>
        </div>

        {/* Statistiques d'impact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contribué</CardTitle>
              <Heart className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{formatAmount(impactStats.totalContributions)}</div>
              <p className="text-xs text-gray-600">Via la Tirelire Ubuntu</p>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendeurs Aidés</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{impactStats.vendorsHelped}</div>
              <p className="text-xs text-gray-600">Entrepreneurs soutenus</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Badges Gagnés</CardTitle>
              <Award className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{impactStats.badges}</div>
              <p className="text-xs text-gray-600">Récompenses Ubuntu</p>
            </CardContent>
          </Card>
        </div>

        {/* Progression mensuelle */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
              Progression du Mois
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Objectif mensuel: {formatAmount(20000)}</span>
                <span className="text-sm text-gray-600">{formatAmount(impactStats.currentMonth)} / {formatAmount(impactStats.monthlyGoal)}</span>
              </div>
              <Progress value={(impactStats.currentMonth / impactStats.monthlyGoal) * 100} className="w-full" />
              <p className="text-sm text-gray-600">
                Plus que {formatAmount(impactStats.monthlyGoal - impactStats.currentMonth)} pour débloquer le badge "Champion Ubuntu" !
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vendeurs aidés */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Vendeurs que vous avez aidés</h2>
            <div className="space-y-6">
              {helpedVendors.map((vendor) => (
                <Card key={vendor.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={vendor.image} 
                        alt={vendor.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{vendor.name}</h3>
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            +{formatAmount(vendor.helpReceived)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 flex items-center mb-1">
                          <MapPin className="mr-1 h-3 w-3" />
                          {vendor.location}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">{vendor.specialty}</p>
                        <p className="text-sm text-gray-800 mb-3">{vendor.story}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            Dernière aide: {vendor.lastHelp}
                          </span>
                          <span>{vendor.totalOrders} commande(s)</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Success Stories et Badges */}
          <div className="space-y-8">
            {/* Success Stories */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Success Stories</h2>
              <div className="space-y-6">
                {successStories.map((story) => (
                  <Card key={story.id} className="overflow-hidden border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <img 
                          src={story.image} 
                          alt={story.vendor}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <h3 className="font-semibold">{story.achievement}</h3>
                          </div>
                          <p className="text-sm font-medium text-gray-900 mb-1">{story.vendor}</p>
                          <p className="text-xs text-gray-600 mb-2">{story.location} • {story.date}</p>
                          <p className="text-sm text-gray-700">{story.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Mes Badges Ubuntu</h2>
              <div className="space-y-4">
                {badges.map((badge) => (
                  <Card key={badge.id} className={`${badge.earned ? 'border-yellow-200 bg-yellow-50' : 'border-gray-200'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          badge.earned ? 'bg-yellow-500' : 'bg-gray-300'
                        }`}>
                          <Award className={`h-6 w-6 ${badge.earned ? 'text-white' : 'text-gray-500'}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${badge.earned ? 'text-yellow-800' : 'text-gray-600'}`}>
                            {badge.name}
                          </h3>
                          <p className="text-sm text-gray-600">{badge.description}</p>
                          {badge.earned && badge.date && (
                            <p className="text-xs text-yellow-700">Obtenu en {badge.date}</p>
                          )}
                          {!badge.earned && badge.progress && (
                            <div className="mt-2">
                              <Progress value={badge.progress} className="w-full h-2" />
                              <p className="text-xs text-gray-500 mt-1">{badge.progress.toFixed(1)}% complété</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <Card className="mt-8 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Continuez à faire la différence</h2>
            <p className="text-lg mb-6">
              Chaque achat sur UmoKet contribue à construire une économie plus solidaire. 
              Ensemble, nous transformons des vies !
            </p>
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              Découvrir plus de produits
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImpactPage;

