import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { HelpCircle, X, BookOpen, Lightbulb, Heart, Users } from 'lucide-react';

const HelpTooltip = ({ concept, children, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const conceptExplanations = {
    "virement_solidaire": {
      title: "Virement Solidaire Direct",
      icon: <Heart className="h-5 w-5 text-orange-600" />,
      description: "Envoyez de l'argent directement à un vendeur que vous souhaitez soutenir, sans obligation d'achat.",
      benefits: [
        "Aide directe aux entrepreneurs en difficulté",
        "Renforce les liens communautaires",
        "Transparence totale sur l'utilisation des fonds",
        "Contribution à l'économie solidaire"
      ],
      howItWorks: "Sélectionnez un vendeur, choisissez le montant, et votre don sera transféré directement dans son portefeuille Ubuntu."
    },
    "split_payment": {
      title: "Split Payment Ubuntu",
      icon: <Users className="h-5 w-5 text-blue-600" />,
      description: "Divisez automatiquement votre paiement entre votre achat et une contribution solidaire.",
      benefits: [
        "Achat + don en une seule transaction",
        "Contribution automatique à la Tirelire Ubuntu",
        "Simplicité et transparence",
        "Impact social sans effort supplémentaire"
      ],
      howItWorks: "Lors de votre achat, une partie (0,5% par défaut) est automatiquement versée à la Tirelire Ubuntu pour aider d'autres vendeurs."
    },
    "micro_investissement": {
      title: "Micro-Investissement",
      icon: <Lightbulb className="h-5 w-5 text-green-600" />,
      description: "Investissez de petites sommes dans des projets de croissance de vendeurs et recevez des retours.",
      benefits: [
        "Rendements attractifs (5-15% annuels)",
        "Soutien direct à l'entrepreneuriat",
        "Diversification de votre portefeuille",
        "Impact social mesurable"
      ],
      howItWorks: "Choisissez un projet (extension d'atelier, e-commerce, etc.), investissez selon vos moyens, et suivez la progression."
    },
    "assurance_communautaire": {
      title: "Assurance Communautaire",
      icon: <Users className="h-5 w-5 text-purple-600" />,
      description: "Protection collective contre les fraudes et problèmes de transaction grâce à la solidarité communautaire.",
      benefits: [
        "Protection mutuelle contre les risques",
        "Coûts réduits grâce à la mutualisation",
        "Résolution rapide des conflits",
        "Confiance renforcée dans les transactions"
      ],
      howItWorks: "Tous les membres contribuent mensuellement à un fonds commun qui protège chacun en cas de problème."
    },
    "tirelire_ubuntu": {
      title: "Tirelire Ubuntu",
      icon: <Heart className="h-5 w-5 text-orange-600" />,
      description: "Fonds collectif alimenté par les micro-contributions automatiques pour aider les vendeurs en difficulté.",
      benefits: [
        "Solidarité automatique et transparente",
        "Aide ciblée aux vendeurs qui en ont besoin",
        "Renforcement de l'écosystème entrepreneurial",
        "Impact collectif mesurable"
      ],
      howItWorks: "Chaque achat génère une micro-contribution (0,5%) qui alimente un fonds redistribué aux vendeurs selon leurs besoins."
    },
    "philosophie_ubuntu": {
      title: "Philosophie Ubuntu",
      icon: <BookOpen className="h-5 w-5 text-indigo-600" />,
      description: "\"Je suis parce que nous sommes\" - Philosophie africaine de solidarité et d'interdépendance communautaire.",
      benefits: [
        "Renforcement des liens sociaux",
        "Développement économique inclusif",
        "Préservation des valeurs africaines",
        "Création d'un écosystème solidaire"
      ],
      howItWorks: "UmoKet applique cette philosophie en créant des mécanismes automatiques de soutien mutuel entre tous les utilisateurs."
    }
  };

  const explanation = conceptExplanations[concept];

  if (!explanation) return children;

  return (
    <div className={`relative inline-block ${className}`}>
      <div 
        className="cursor-help"
        onClick={() => setIsOpen(true)}
      >
        {children}
        <HelpCircle className="inline-block ml-1 h-4 w-4 text-gray-400 hover:text-blue-600 transition-colors" />
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  {explanation.icon}
                  <span>{explanation.title}</span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Qu'est-ce que c'est ?</h4>
                <p className="text-gray-600">{explanation.description}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Comment ça fonctionne ?</h4>
                <p className="text-gray-600">{explanation.howItWorks}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Avantages</h4>
                <div className="space-y-2">
                  {explanation.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Lightbulb className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900">Le saviez-vous ?</span>
                </div>
                <p className="text-blue-800 text-sm">
                  {concept === "philosophie_ubuntu" && "Ubuntu est une philosophie africaine millénaire qui signifie 'humanité envers les autres'. Elle prône l'idée que nous sommes tous interconnectés."}
                  {concept === "tirelire_ubuntu" && "La Tirelire Ubuntu redistribue automatiquement les fonds selon un algorithme transparent qui priorise les vendeurs ayant le plus besoin d'aide."}
                  {concept === "micro_investissement" && "Les micro-investissements permettent aux petits épargnants de participer au développement économique avec des montants accessibles."}
                  {concept === "assurance_communautaire" && "L'assurance communautaire réduit les coûts de 60% par rapport aux assurances traditionnelles grâce à la mutualisation."}
                  {concept === "virement_solidaire" && "Les virements solidaires créent des liens durables entre acheteurs et vendeurs, renforçant l'écosystème entrepreneurial."}
                  {concept === "split_payment" && "Le split payment automatique génère plus de 2 millions de FCFA par mois pour la Tirelire Ubuntu sur UmoKet."}
                </p>
              </div>

              <Button 
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                J'ai compris
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HelpTooltip;

