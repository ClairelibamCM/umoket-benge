import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { 
  Heart, 
  Users, 
  TrendingUp, 
  Shield, 
  Globe, 
  Lightbulb,
  Target,
  Award,
  BookOpen,
  Handshake
} from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          À Propos d'UmoKet
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          La première marketplace africaine à redistribution automatique, 
          fondée sur la philosophie Ubuntu : "Je suis parce que nous sommes"
        </p>
      </div>

      {/* Philosophie Ubuntu */}
      <Card className="mb-12 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-700">
            <BookOpen className="mr-3 h-6 w-6" />
            La Philosophie Ubuntu
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-lg text-gray-700 leading-relaxed">
            <p className="mb-4">
              <strong>"Ubuntu"</strong> est une philosophie africaine millénaire qui signifie 
              <em> "Je suis parce que nous sommes"</em>. Elle exprime l'idée fondamentale que 
              notre humanité est interconnectée et que nous ne pouvons prospérer individuellement 
              que si notre communauté prospère également.
            </p>
            <p>
              UmoKet incarne cette philosophie en créant un écosystème où chaque transaction 
              contribue automatiquement au bien-être collectif, transformant le commerce 
              en un acte de solidarité.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <Users className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Interconnexion</h3>
              <p className="text-sm text-gray-600">
                Nous sommes tous liés dans un réseau de soutien mutuel
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <Heart className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Solidarité</h3>
              <p className="text-sm text-gray-600">
                Chaque achat devient un geste de soutien à la communauté
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Prospérité Partagée</h3>
              <p className="text-sm text-gray-600">
                Le succès individuel contribue au succès collectif
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pourquoi UmoKet */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700">
            <Target className="mr-3 h-6 w-6" />
            Pourquoi UmoKet ?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Les Défis de l'Entrepreneuriat Africain</h3>
              <div className="space-y-3 text-gray-600">
                <p>
                  L'Afrique regorge d'entrepreneurs talentueux, mais ils font face à des obstacles majeurs :
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Accès limité au financement et au crédit</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Infrastructures de paiement insuffisantes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Manque de visibilité et de réseaux</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Prédominance des transactions en espèces</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Les Méfaits du Cash</h3>
              <div className="space-y-3 text-gray-600">
                <p>
                  Les transactions en espèces freinent le développement économique :
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Risques de fraude et de vol élevés</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Absence de traçabilité des transactions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Coûts de gestion et de sécurité élevés</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Limitation de l'accès au crédit formel</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notre Solution */}
      <Card className="mb-12 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center text-green-700">
            <Lightbulb className="mr-3 h-6 w-6" />
            Notre Solution : UmoKet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg text-gray-700 mb-6">
            UmoKet transforme le commerce en ligne en intégrant automatiquement 
            la solidarité dans chaque transaction. Notre plateforme crée un 
            écosystème où l'achat devient un acte de soutien communautaire.
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <Heart className="h-10 w-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Tirelire Ubuntu</h3>
              <p className="text-sm text-gray-600">
                0,5% de chaque achat aide automatiquement les vendeurs en difficulté
              </p>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <Shield className="h-10 w-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Sécurité</h3>
              <p className="text-sm text-gray-600">
                Transactions numériques sécurisées et assurance communautaire
              </p>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <TrendingUp className="h-10 w-10 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Micro-Investissement</h3>
              <p className="text-sm text-gray-600">
                Investissez dans la croissance des entrepreneurs africains
              </p>
            </div>
            
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <Users className="h-10 w-10 text-orange-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Communauté</h3>
              <p className="text-sm text-gray-600">
                Réseau de soutien mutuel entre acheteurs et vendeurs
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Impact et Statistiques */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-700">
            <Award className="mr-3 h-6 w-6" />
            Notre Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">2,500+</div>
              <div className="text-gray-600">Vendeurs Aidés</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-green-600 mb-2">45M</div>
              <div className="text-gray-600">FCFA Redistribués</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-orange-600 mb-2">15,000+</div>
              <div className="text-gray-600">Utilisateurs Actifs</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Client</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vision et Mission */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-700">
              <Globe className="mr-3 h-6 w-6" />
              Notre Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              Créer un écosystème économique africain où chaque transaction 
              renforce la solidarité communautaire, permettant à tous les 
              entrepreneurs de prospérer ensemble dans un esprit Ubuntu.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center text-green-700">
              <Handshake className="mr-3 h-6 w-6" />
              Notre Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              Démocratiser l'accès au commerce numérique en Afrique tout en 
              intégrant des mécanismes automatiques de soutien mutuel qui 
              transforment chaque achat en acte de solidarité.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Valeurs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-gray-900">Nos Valeurs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <Heart className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Ubuntu</h3>
              <p className="text-gray-600">
                Nous croyons en l'interconnexion de tous les êtres humains 
                et en la force de la solidarité communautaire.
              </p>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Transparence</h3>
              <p className="text-gray-600">
                Toutes nos opérations sont transparentes, traçables 
                et vérifiables par la communauté.
              </p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                Nous innovons constamment pour créer des solutions 
                qui servent l'intérêt collectif.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;

