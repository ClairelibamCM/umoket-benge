import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { 
  Target, 
  Plus, 
  Heart, 
  Users,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Lightbulb,
  BookOpen,
  Handshake
} from 'lucide-react';
import { useCurrency } from '../../contexts/CurrencyContext.jsx';

const HelpRequestsPage = () => {
  const { formatAmount } = useCurrency();
  const [newRequestType, setNewRequestType] = useState('microcredit');

  const activeRequests = [
    {
      id: 1,
      type: 'microcredit',
      title: 'Achat d\'une machine à coudre industrielle',
      description: 'J\'ai besoin d\'une machine à coudre plus performante pour augmenter ma production de vêtements traditionnels.',
      amount: 150000,
      raised: 89000,
      supporters: 12,
      deadline: '2024-08-01',
      status: 'active',
      category: 'Équipement'
    },
    {
      id: 2,
      type: 'coaching',
      title: 'Formation en marketing digital',
      description: 'Je souhaite apprendre à mieux promouvoir mes produits sur les réseaux sociaux et en ligne.',
      amount: 50000,
      raised: 25000,
      supporters: 8,
      deadline: '2024-07-15',
      status: 'active',
      category: 'Formation'
    }
  ];

  const completedRequests = [
    {
      id: 3,
      type: 'microcredit',
      title: 'Matériaux pour nouveaux produits',
      description: 'Achat de matières premières pour diversifier ma gamme de paniers.',
      amount: 75000,
      raised: 75000,
      supporters: 15,
      completedDate: '2024-05-20',
      status: 'completed',
      category: 'Matériaux',
      impact: 'Grâce à cette aide, j\'ai pu créer 3 nouveaux modèles de paniers qui représentent maintenant 40% de mes ventes.'
    }
  ];

  const coachingPrograms = [
    {
      id: 1,
      title: 'Marketing Digital pour Artisans',
      description: 'Apprenez à promouvoir vos créations sur les réseaux sociaux',
      duration: '4 semaines',
      price: 25000,
      mentor: 'Fatou Sow',
      rating: 4.9,
      students: 156,
      available: true
    },
    {
      id: 2,
      title: 'Gestion Financière pour PME',
      description: 'Maîtrisez la comptabilité et la gestion de trésorerie',
      duration: '6 semaines',
      price: 35000,
      mentor: 'Mamadou Ba',
      rating: 4.8,
      students: 203,
      available: true
    },
    {
      id: 3,
      title: 'Développement Produit et Innovation',
      description: 'Créez de nouveaux produits qui répondent aux besoins du marché',
      duration: '8 semaines',
      price: 45000,
      mentor: 'Aïcha Traoré',
      rating: 4.9,
      students: 89,
      available: false
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'active': return 'En cours';
      case 'completed': return 'Complété';
      case 'pending': return 'En attente';
      default: return 'Inconnu';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'active': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'microcredit': return <DollarSign className="h-5 w-5 text-green-600" />;
      case 'coaching': return <BookOpen className="h-5 w-5 text-blue-600" />;
      default: return <Target className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Demandes d'Aide</h1>
              <p className="text-gray-600">Accédez aux micro-crédits et programmes de coaching Ubuntu</p>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle demande
            </Button>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Aide totale reçue</p>
                  <p className="text-2xl font-bold">150 000</p>
                  <p className="text-xs opacity-75">FCFA</p>
                </div>
                <Heart className="h-8 w-8 opacity-90" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Demandes actives</p>
                  <p className="text-2xl font-bold">{activeRequests.length}</p>
                </div>
                <Target className="h-8 w-8 opacity-90" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Supporters</p>
                  <p className="text-2xl font-bold">35</p>
                </div>
                <Users className="h-8 w-8 opacity-90" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Taux de réussite</p>
                  <p className="text-2xl font-bold">100%</p>
                </div>
                <CheckCircle className="h-8 w-8 opacity-90" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Demandes Actives</TabsTrigger>
            <TabsTrigger value="coaching">Coaching</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
          </TabsList>

          {/* Demandes actives */}
          <TabsContent value="active">
            <div className="space-y-6">
              {activeRequests.map((request) => {
                const progressPercentage = (request.raised / request.amount) * 100;
                const daysLeft = Math.ceil((new Date(request.deadline) - new Date()) / (1000 * 60 * 60 * 24));
                
                return (
                  <Card key={request.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            {getTypeIcon(request.type)}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 mb-1">{request.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                            <div className="flex items-center space-x-4">
                              <Badge variant="outline">{request.category}</Badge>
                              <Badge className={getStatusColor(request.status)}>
                                {getStatusIcon(request.status)}
                                <span className="ml-1">{getStatusLabel(request.status)}</span>
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Progression */}
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Progression</span>
                            <span className="text-sm font-medium">
                              {formatAmount(request.raised)} / {formatAmount(request.amount)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-orange-500 h-3 rounded-full transition-all duration-300" 
                              style={{ width: `${progressPercentage}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-500">
                              {Math.round(progressPercentage)}% complété
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatAmount(request.amount - request.raised)} restants
                            </span>
                          </div>
                        </div>

                        {/* Informations supplémentaires */}
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Supporters</p>
                            <p className="font-bold text-blue-600">{request.supporters}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Jours restants</p>
                            <p className="font-bold text-orange-600">{daysLeft}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Échéance</p>
                            <p className="font-medium text-gray-900">
                              {new Date(request.deadline).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Modifier
                            </Button>
                            <Button variant="outline" size="sm">
                              Partager
                            </Button>
                          </div>
                          <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                            Voir les détails
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {/* Bouton pour nouvelle demande */}
              <Card className="border-dashed border-2 border-gray-300 hover:border-orange-400 transition-colors">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">Créer une nouvelle demande</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Demandez un micro-crédit ou un accompagnement pour développer votre activité
                  </p>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    Commencer
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Programmes de coaching */}
          <TabsContent value="coaching">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {coachingPrograms.map((program) => (
                <Card key={program.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">{program.title}</h3>
                        <p className="text-sm text-gray-600">{program.description}</p>
                      </div>
                      {!program.available && (
                        <Badge variant="outline" className="text-red-600 border-red-200">
                          Complet
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Mentor</p>
                          <p className="font-medium text-gray-900">{program.mentor}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Durée</p>
                          <p className="font-medium text-gray-900">{program.duration}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 text-blue-500 mr-1" />
                            <span className="text-sm text-gray-600">{program.students} étudiants</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm text-gray-600">{program.rating}/5</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">{program.price.toLocaleString()} FCFA</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <Button 
                          className="w-full bg-blue-500 hover:bg-blue-600"
                          disabled={!program.available}
                        >
                          <Handshake className="h-4 w-4 mr-2" />
                          {program.available ? 'Demander ce coaching' : 'Liste d\'attente'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Historique */}
          <TabsContent value="history">
            <div className="space-y-6">
              {completedRequests.map((request) => (
                <Card key={request.id} className="border-green-200 bg-green-50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">{request.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                          <div className="flex items-center space-x-4">
                            <Badge variant="outline">{request.category}</Badge>
                            <Badge className={getStatusColor(request.status)}>
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Complété
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Montant obtenu</p>
                          <p className="font-bold text-green-600">{request.raised.toLocaleString()} FCFA</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Supporters</p>
                          <p className="font-bold text-blue-600">{request.supporters}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Complété le</p>
                          <p className="font-medium text-gray-900">
                            {new Date(request.completedDate).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>

                      {request.impact && (
                        <div className="p-4 bg-white border border-green-200 rounded-lg">
                          <div className="flex items-start">
                            <Lightbulb className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-green-800 mb-1">Impact réalisé :</p>
                              <p className="text-sm text-green-700">{request.impact}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HelpRequestsPage;

