import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { 
  Trophy, 
  Medal, 
  Star, 
  Target, 
  Users, 
  Heart,
  TrendingUp,
  Calendar,
  Gift,
  Crown
} from 'lucide-react';
import { useUserType } from '../../contexts/UserTypeContext.jsx';
import { useCurrency } from '../../contexts/CurrencyContext.jsx';

const UbuntuHeroesPage = () => {
  const { currentProfile } = useUserType();
  const { formatAmount } = useCurrency();
  const [activeChallenge, setActiveChallenge] = useState(null);

  const leaderboard = [
    { rank: 1, name: 'Amadou Diop', contributions: 45000, vendorsHelped: 15, badge: 'Légende Ubuntu' },
    { rank: 2, name: 'Fatima Ndiaye', contributions: 38500, vendorsHelped: 12, badge: 'Champion Ubuntu' },
    { rank: 3, name: 'Vous', contributions: 15750, vendorsHelped: 8, badge: 'Solidaire Actif' },
    { rank: 4, name: 'Moussa Traoré', contributions: 14200, vendorsHelped: 7, badge: 'Solidaire Actif' },
    { rank: 5, name: 'Aïcha Koné', contributions: 12800, vendorsHelped: 6, badge: 'Mentor Communautaire' }
  ];

  const challenges = [
    {
      id: 1,
      title: 'Défi du Mois : Héros Ubuntu',
      description: 'Aidez 3 nouveaux vendeurs ce mois',
      progress: 2,
      target: 3,
      reward: `Badge "Héros du Mois" + ${formatAmount(1000)} bonus`,
      deadline: '2024-06-30',
      difficulty: 'Moyen'
    },
    {
      id: 2,
      title: 'Marathon Solidaire',
      description: `Contribuez ${formatAmount(25000)} en 30 jours`,
      progress: 15750,
      target: 25000,
      reward: 'Badge "Marathon Ubuntu" + Certificat numérique',
      deadline: '2024-07-15',
      difficulty: 'Difficile'
    },
    {
      id: 3,
      title: 'Parrain Communautaire',
      description: 'Invitez 2 amis à rejoindre UmoKet',
      progress: 0,
      target: 2,
      reward: `${formatAmount(5000)} de bonus + Badge "Ambassadeur"`,
      deadline: '2024-07-01',
      difficulty: 'Facile'
    }
  ];

  const achievements = [
    { title: 'Premier Pas Ubuntu', description: 'Première contribution réalisée', date: '2024-05-01', icon: Heart },
    { title: 'Solidaire Régulier', description: '10 contributions en un mois', date: '2024-05-15', icon: Calendar },
    { title: 'Mentor Communautaire', description: 'Aidé 5 vendeurs différents', date: '2024-06-01', icon: Users },
    { title: 'Champion Ubuntu', description: `Atteint ${formatAmount(15000)} de contributions`, date: '2024-06-15', icon: Trophy }
  ];

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Medal className="h-5 w-5 text-amber-600" />;
      default: return <Star className="h-5 w-5 text-gray-400" />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Facile': return 'bg-green-100 text-green-800';
      case 'Moyen': return 'bg-yellow-100 text-yellow-800';
      case 'Difficile': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ubuntu Heroes</h1>
          <p className="text-gray-600">Rejoignez la communauté des héros solidaires et relevez des défis Ubuntu</p>
        </div>

        <Tabs defaultValue="leaderboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="leaderboard">Classement</TabsTrigger>
            <TabsTrigger value="challenges">Défis</TabsTrigger>
            <TabsTrigger value="achievements">Réussites</TabsTrigger>
          </TabsList>

          {/* Classement */}
          <TabsContent value="leaderboard">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Podium */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                    Classement Ubuntu du Mois
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaderboard.map((user, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center justify-between p-4 rounded-lg border ${
                          user.name === 'Vous' ? 'bg-orange-50 border-orange-200' : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="flex items-center justify-center w-8 h-8 mr-4">
                            {getRankIcon(user.rank)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-600">
                              {formatAmount(user.contributions)} • {user.vendorsHelped} vendeurs aidés
                            </p>
                          </div>
                        </div>
                        <Badge className={getDifficultyColor('Moyen')}>
                          {user.badge}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Statistiques personnelles */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                    Vos Statistiques
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg">
                      <div className="text-2xl font-bold">3ème</div>
                      <div className="text-sm opacity-90">Position actuelle</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">{currentProfile.totalContributions.toLocaleString()}</div>
                        <div className="text-xs text-blue-600">FCFA contribués</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">{currentProfile.vendorsHelped}</div>
                        <div className="text-xs text-green-600">Vendeurs aidés</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progression vers le 2ème</span>
                        <span>68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                      <p className="text-xs text-gray-500">
                        Plus que 22 750 FCFA pour rattraper Fatima !
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Défis */}
          <TabsContent value="challenges">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {challenges.map((challenge) => (
                <Card key={challenge.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{challenge.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>
                      </div>
                      <Badge className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progression</span>
                          <span>{challenge.id === 2 ? formatAmount(challenge.progress) : challenge.progress} / {challenge.id === 2 ? formatAmount(challenge.target) : challenge.target}</span>
                        </div>
                        <Progress 
                          value={(challenge.progress / challenge.target) * 100} 
                          className="h-3"
                        />
                      </div>
                      
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <div className="flex items-center mb-1">
                          <Gift className="h-4 w-4 text-yellow-600 mr-1" />
                          <span className="text-sm font-medium text-yellow-800">Récompense</span>
                        </div>
                        <p className="text-sm text-yellow-700">{challenge.reward}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Échéance: {new Date(challenge.deadline).toLocaleDateString('fr-FR')}
                        </span>
                        <Button 
                          size="sm" 
                          onClick={() => setActiveChallenge(challenge.id)}
                          className="bg-orange-500 hover:bg-orange-600"
                        >
                          Participer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Réussites */}
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Medal className="h-5 w-5 mr-2 text-purple-500" />
                  Vos Réussites Ubuntu
                </CardTitle>
                <p className="text-sm text-gray-600">Célébrez vos accomplissements solidaires</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => {
                    const IconComponent = achievement.icon;
                    return (
                      <div key={index} className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Obtenu le {new Date(achievement.date).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UbuntuHeroesPage;

