import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { 
  Users, 
  Heart, 
  Star, 
  MessageCircle,
  Gift,
  TrendingUp,
  Calendar,
  Award,
  UserPlus
} from 'lucide-react';
import { useCurrency } from '../../contexts/CurrencyContext.jsx';

const SponsorshipPage = () => {
  const { formatAmount } = useCurrency();
  
  const sponsors = [
    {
      id: 1,
      name: 'Amadou Diop',
      avatar: '/api/placeholder/50/50',
      totalSupport: 8500,
      supportCount: 12,
      joinDate: '2024-05-15',
      lastSupport: '2024-06-20',
      level: 'Champion',
      message: 'Vos créations sont exceptionnelles ! Continuez ainsi.'
    },
    {
      id: 2,
      name: 'Fatima Ndiaye',
      avatar: '/api/placeholder/50/50',
      totalSupport: 6200,
      supportCount: 8,
      joinDate: '2024-05-20',
      lastSupport: '2024-06-19',
      level: 'Supporter',
      message: 'J\'adore vos paniers, ils décorent parfaitement ma maison.'
    },
    {
      id: 3,
      name: 'Moussa Traoré',
      avatar: '/api/placeholder/50/50',
      totalSupport: 4800,
      supportCount: 6,
      joinDate: '2024-06-01',
      lastSupport: '2024-06-18',
      level: 'Ami',
      message: 'Merci pour la qualité de vos produits !'
    },
    {
      id: 4,
      name: 'Aïcha Koné',
      avatar: '/api/placeholder/50/50',
      totalSupport: 3500,
      supportCount: 5,
      joinDate: '2024-06-05',
      lastSupport: '2024-06-17',
      level: 'Ami',
      message: 'Vos épices sont délicieuses, ma famille les adore.'
    }
  ];

  const communityStats = {
    totalSponsors: sponsors.length,
    totalSupport: sponsors.reduce((sum, sponsor) => sum + sponsor.totalSupport, 0),
    averageSupport: sponsors.reduce((sum, sponsor) => sum + sponsor.totalSupport, 0) / sponsors.length,
    monthlyGrowth: 25
  };

  const supportLevels = [
    { name: 'Ami', min: 1000, max: 4999, color: 'bg-blue-100 text-blue-800', icon: Heart },
    { name: 'Supporter', min: 5000, max: 9999, color: 'bg-green-100 text-green-800', icon: Star },
    { name: 'Champion', min: 10000, max: Infinity, color: 'bg-purple-100 text-purple-800', icon: Award }
  ];

  const getLevelInfo = (totalSupport) => {
    return supportLevels.find(level => totalSupport >= level.min && totalSupport <= level.max) || supportLevels[0];
  };

  const recentActivities = [
    { type: 'new_sponsor', name: 'Aïcha Koné', action: 'a rejoint vos parrains', time: '2 jours', amount: null },
    { type: 'support', name: 'Amadou Diop', action: 'vous a soutenu', time: '3 jours', amount: 500 },
    { type: 'message', name: 'Fatima Ndiaye', action: 'vous a envoyé un message', time: '5 jours', amount: null },
    { type: 'support', name: 'Moussa Traoré', action: 'vous a soutenu', time: '1 semaine', amount: 300 }
  ];

  const getActivityIcon = (type) => {
    switch(type) {
      case 'new_sponsor': return <UserPlus className="h-4 w-4 text-green-600" />;
      case 'support': return <Heart className="h-4 w-4 text-orange-600" />;
      case 'message': return <MessageCircle className="h-4 w-4 text-blue-600" />;
      default: return <Gift className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon Parrainage</h1>
          <p className="text-gray-600">Découvrez qui vous soutient et renforcez vos liens avec la communauté</p>
        </div>

        {/* Statistiques de la communauté */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total Parrains</p>
                  <p className="text-2xl font-bold">{communityStats.totalSponsors}</p>
                </div>
                <Users className="h-8 w-8 opacity-90" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Soutien Total</p>
                  <p className="text-2xl font-bold">{formatAmount(communityStats.totalSupport)}</p>
                </div>
                <Heart className="h-8 w-8 opacity-90" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Soutien Moyen</p>
                  <p className="text-2xl font-bold">{formatAmount(Math.round(communityStats.averageSupport))}</p>
                </div>
                <TrendingUp className="h-8 w-8 opacity-90" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Croissance</p>
                  <p className="text-2xl font-bold">+{communityStats.monthlyGrowth}%</p>
                  <p className="text-xs opacity-75">Ce mois</p>
                </div>
                <Calendar className="h-8 w-8 opacity-90" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des parrains */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-purple-600" />
                  Mes Parrains
                </CardTitle>
                <p className="text-sm text-gray-600">Les membres de la communauté qui vous soutiennent</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sponsors.map((sponsor) => {
                    const levelInfo = getLevelInfo(sponsor.totalSupport);
                    const LevelIcon = levelInfo.icon;
                    
                    return (
                      <div key={sponsor.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h3 className="font-medium text-gray-900">{sponsor.name}</h3>
                                <p className="text-sm text-gray-600">
                                  Parrain depuis le {new Date(sponsor.joinDate).toLocaleDateString('fr-FR')}
                                </p>
                              </div>
                              <Badge className={levelInfo.color}>
                                <LevelIcon className="h-3 w-3 mr-1" />
                                {sponsor.level}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-3">
                              <div>
                                <p className="text-sm text-gray-600">Soutien total</p>
                                <p className="font-bold text-orange-600">{formatAmount(sponsor.totalSupport)}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Nombre de soutiens</p>
                                <p className="font-medium text-gray-900">{sponsor.supportCount}</p>
                              </div>
                            </div>

                            {sponsor.message && (
                              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                                <p className="text-sm text-gray-700 italic">"{sponsor.message}"</p>
                              </div>
                            )}

                            <div className="flex items-center justify-between">
                              <p className="text-xs text-gray-500">
                                Dernier soutien : {new Date(sponsor.lastSupport).toLocaleDateString('fr-FR')}
                              </p>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <MessageCircle className="h-4 w-4 mr-1" />
                                  Message
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Heart className="h-4 w-4 mr-1" />
                                  Remercier
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activités récentes et niveaux */}
          <div className="space-y-6">
            {/* Niveaux de parrainage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-yellow-500" />
                  Niveaux de Parrainage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportLevels.map((level, index) => {
                    const LevelIcon = level.icon;
                    const sponsorsAtLevel = sponsors.filter(s => getLevelInfo(s.totalSupport).name === level.name).length;
                    
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${level.color.replace('text-', 'bg-').replace('800', '500')}`}>
                            <LevelIcon className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{level.name}</p>
                            <p className="text-xs text-gray-600">
                              {formatAmount(level.min)}+
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline">
                          {sponsorsAtLevel} parrain{sponsorsAtLevel > 1 ? 's' : ''}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Activités récentes */}
            <Card>
              <CardHeader>
                <CardTitle>Activités Récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.name}</span> {activity.action}
                          {activity.amount && (
                            <span className="font-bold text-orange-600"> (+{formatAmount(activity.amount)})</span>
                          )}
                        </p>
                        <p className="text-xs text-gray-500">Il y a {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle>Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    <Heart className="h-4 w-4 mr-2" />
                    Remercier tous mes parrains
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Envoyer une mise à jour
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Gift className="h-4 w-4 mr-2" />
                    Partager une réussite
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorshipPage;

