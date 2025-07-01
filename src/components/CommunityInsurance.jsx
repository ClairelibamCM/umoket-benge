import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Shield, Users, DollarSign, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

const CommunityInsurance = ({ onClose, onSubscribe }) => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');

  const insurancePlans = [
    {
      id: 'basic',
      name: 'Protection Basique',
      monthlyContribution: 2500,
      coverage: 50000,
      features: [
        'Protection contre les fraudes',
        'Remboursement jusqu\'à 50,000 FCFA',
        'Support communautaire 24/7',
        'Résolution de conflits'
      ],
      participants: 1250,
      claimsResolved: 98,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'standard',
      name: 'Protection Standard',
      monthlyContribution: 5000,
      coverage: 150000,
      features: [
        'Toutes les protections Basiques',
        'Remboursement jusqu\'à 150,000 FCFA',
        'Assurance livraison',
        'Protection qualité produits',
        'Médiation prioritaire'
      ],
      participants: 850,
      claimsResolved: 99,
      color: 'bg-green-50 border-green-200',
      popular: true
    },
    {
      id: 'premium',
      name: 'Protection Premium',
      monthlyContribution: 10000,
      coverage: 500000,
      features: [
        'Toutes les protections Standard',
        'Remboursement jusqu\'à 500,000 FCFA',
        'Assurance investissement Ubuntu',
        'Protection micro-crédit',
        'Conseiller dédié',
        'Garantie satisfaction 100%'
      ],
      participants: 320,
      claimsResolved: 100,
      color: 'bg-orange-50 border-orange-200'
    }
  ];

  const handleSubscription = () => {
    if (selectedPlan && monthlyContribution) {
      onSubscribe({
        planId: selectedPlan,
        monthlyContribution: parseFloat(monthlyContribution),
        timestamp: new Date().toISOString()
      });
      onClose();
    }
  };

  const selectedPlanData = insurancePlans.find(p => p.id === selectedPlan);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-600">
            <Shield className="mr-2 h-5 w-5" />
            Assurance Communautaire Ubuntu
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            {insurancePlans.map((plan) => (
              <div
                key={plan.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedPlan === plan.id ? 'border-blue-500 bg-blue-50' : plan.color
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <Badge className="mb-2 bg-orange-500">Plus populaire</Badge>
                )}
                <h3 className="font-bold text-lg">{plan.name}</h3>
                <div className="text-2xl font-bold text-blue-600 mt-2">
                  {plan.monthlyContribution.toLocaleString()} FCFA/mois
                </div>
                <div className="text-lg font-bold text-green-600 mt-2">
                  Couverture : {plan.coverage.toLocaleString()} FCFA
                </div>
                <div className="space-y-1 mt-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="text-sm flex items-center">
                      <CheckCircle className="mr-1 h-3 w-3 text-green-500" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {selectedPlanData && (
            <div>
              <Label>Contribution mensuelle (FCFA)</Label>
              <Input
                type="number"
                placeholder={selectedPlanData.monthlyContribution.toString()}
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                min={selectedPlanData.monthlyContribution}
                className="mt-2"
              />
            </div>
          )}

          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Annuler
            </Button>
            <Button
              onClick={handleSubscription}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={!selectedPlan || !monthlyContribution}
            >
              <Shield className="mr-2 h-4 w-4" />
              S'abonner
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityInsurance;

