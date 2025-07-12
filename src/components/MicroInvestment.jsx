import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { TrendingUp, DollarSign, Target, Calendar, Users, Star, Lock } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription.jsx';

const MicroInvestment = ({ onClose, onInvest }) => {
  const { canAccess } = useSubscription();
  const [selectedProject, setSelectedProject] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');

  // Vérifier l'accès aux fonctionnalités
  const hasMicroInvestment = canAccess('micro-investissement');

  const investmentProjects = [
    {
      id: 'project_1',
      vendorName: 'Aminata Diallo',
      location: 'Dakar, Sénégal',
      projectTitle: 'Extension atelier de tissage',
      description: 'Achat de 3 nouvelles machines à tisser pour doubler la production',
      targetAmount: 500000,
      currentAmount: 325000,
      investors: 24,
      expectedReturn: 15,
      duration: '12 mois',
      riskLevel: 'Faible',
      category: 'Textile',
      packages: [
        { id: 'bronze', name: 'Bronze', minAmount: 5000, maxAmount: 25000, returnRate: 12, benefits: ['Suivi mensuel', 'Produits à prix réduit'] },
        { id: 'silver', name: 'Silver', minAmount: 25000, maxAmount: 100000, returnRate: 15, benefits: ['Suivi hebdomadaire', 'Produits à prix réduit', 'Visite atelier'] },
        { id: 'gold', name: 'Gold', minAmount: 100000, maxAmount: 500000, returnRate: 18, benefits: ['Suivi quotidien', 'Produits gratuits', 'Visite atelier', 'Participation aux décisions'] }
      ]
    },
    {
      id: 'project_2',
      vendorName: 'Kofi Asante',
      location: 'Accra, Ghana',
      projectTitle: 'Boutique en ligne de tissus Wax',
      description: 'Développement d\'une plateforme e-commerce pour vendre à l\'international',
      targetAmount: 300000,
      currentAmount: 180000,
      investors: 18,
      expectedReturn: 20,
      duration: '8 mois',
      riskLevel: 'Moyen',
      category: 'Digital',
      packages: [
        { id: 'bronze', name: 'Bronze', minAmount: 3000, maxAmount: 20000, returnRate: 16, benefits: ['Accès plateforme', 'Réductions exclusives'] },
        { id: 'silver', name: 'Silver', minAmount: 20000, maxAmount: 75000, returnRate: 20, benefits: ['Accès plateforme', 'Réductions exclusives', 'Formation e-commerce'] },
        { id: 'gold', name: 'Gold', minAmount: 75000, maxAmount: 300000, returnRate: 25, benefits: ['Accès plateforme', 'Réductions exclusives', 'Formation e-commerce', 'Part des revenus'] }
      ]
    },
    {
      id: 'project_3',
      vendorName: 'Fatou Keita',
      location: 'Bamako, Mali',
      projectTitle: 'Coopérative d\'épices bio',
      description: 'Création d\'une coopérative pour transformer et exporter des épices bio',
      targetAmount: 750000,
      currentAmount: 450000,
      investors: 32,
      expectedReturn: 12,
      duration: '18 mois',
      riskLevel: 'Faible',
      category: 'Agriculture',
      packages: [
        { id: 'bronze', name: 'Bronze', minAmount: 10000, maxAmount: 50000, returnRate: 10, benefits: ['Épices à prix coûtant', 'Rapport trimestriel'] },
        { id: 'silver', name: 'Silver', minAmount: 50000, maxAmount: 200000, returnRate: 12, benefits: ['Épices à prix coûtant', 'Rapport mensuel', 'Visite exploitation'] },
        { id: 'gold', name: 'Gold', minAmount: 200000, maxAmount: 750000, returnRate: 15, benefits: ['Épices gratuites', 'Rapport hebdomadaire', 'Visite exploitation', 'Conseil stratégique'] }
      ]
    }
  ];

  const selectedProjectData = investmentProjects.find(p => p.id === selectedProject);
  const selectedPackageData = selectedProjectData?.packages.find(p => p.id === selectedPackage);

  const handleInvestment = () => {
    if (!hasMicroInvestment) {
      // Déclencher le modal d'upgrade
      if (window.requestUpgrade) {
        window.requestUpgrade('micro-investissement');
      }
      onClose();
      return;
    }

    if (selectedProject && investmentAmount && selectedPackage) {
      onInvest({
        projectId: selectedProject,
        amount: parseFloat(investmentAmount),
        package: selectedPackage,
        timestamp: new Date().toISOString()
      });
      onClose();
    }
  };

  const handleUpgradeClick = () => {
    if (window.requestUpgrade) {
      window.requestUpgrade('micro-investissement');
    }
    onClose();
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Faible': return 'bg-green-100 text-green-800';
      case 'Moyen': return 'bg-yellow-100 text-yellow-800';
      case 'Élevé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-600">
            <TrendingUp className="mr-2 h-5 w-5" />
            Micro-Investissement Ubuntu
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sélection du projet */}
          <div>
            <Label className="text-base font-medium">Projets d'investissement disponibles</Label>
            <div className="grid gap-4 mt-3">
              {investmentProjects.map((project) => {
                const progressPercentage = (project.currentAmount / project.targetAmount) * 100;
                return (
                  <div
                    key={project.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedProject === project.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium">{project.projectTitle}</h3>
                        <p className="text-sm text-gray-600">{project.vendorName} • {project.location}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Badge variant="outline">{project.category}</Badge>
                        <Badge className={getRiskColor(project.riskLevel)}>{project.riskLevel}</Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3">{project.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-600">{project.expectedReturn}%</div>
                        <div className="text-xs text-gray-500">Rendement attendu</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{project.duration}</div>
                        <div className="text-xs text-gray-500">Durée</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{project.investors}</div>
                        <div className="text-xs text-gray-500">Investisseurs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{Math.round(progressPercentage)}%</div>
                        <div className="text-xs text-gray-500">Financé</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Objectif : {project.targetAmount.toLocaleString()} FCFA</span>
                        <span>Collecté : {project.currentAmount.toLocaleString()} FCFA</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Packages d'investissement */}
          {selectedProjectData && (
            <div>
              <Label className="text-base font-medium">Packages d'investissement</Label>
              <div className="grid md:grid-cols-3 gap-4 mt-3">
                {selectedProjectData.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedPackage === pkg.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    <div className="text-center mb-3">
                      <h3 className="font-bold text-lg">{pkg.name}</h3>
                      <div className="text-2xl font-bold text-orange-600">{pkg.returnRate}%</div>
                      <div className="text-sm text-gray-500">Rendement annuel</div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="text-sm">
                        <span className="font-medium">Investissement :</span>
                        <div>{pkg.minAmount.toLocaleString()} - {pkg.maxAmount.toLocaleString()} FCFA</div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Avantages :</div>
                      {pkg.benefits.map((benefit, index) => (
                        <div key={index} className="text-xs text-gray-600 flex items-center">
                          <Star className="mr-1 h-3 w-3 text-orange-400" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Montant d'investissement */}
          {selectedPackageData && (
            <div>
              <Label>Montant d'investissement (FCFA)</Label>
              <div className="relative mt-2">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="number"
                  placeholder="0"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  className="pl-10"
                  min={selectedPackageData.minAmount}
                  max={selectedPackageData.maxAmount}
                  step="1000"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Montant : {selectedPackageData.minAmount.toLocaleString()} - {selectedPackageData.maxAmount.toLocaleString()} FCFA
              </p>
              
              {investmentAmount && (
                <div className="bg-green-50 p-3 rounded-lg mt-3">
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Investissement :</span>
                      <span className="font-medium">{parseFloat(investmentAmount).toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Rendement estimé (annuel) :</span>
                      <span className="font-medium">
                        {Math.round(parseFloat(investmentAmount) * selectedPackageData.returnRate / 100).toLocaleString()} FCFA
                      </span>
                    </div>
                    <div className="flex justify-between text-green-700 font-medium">
                      <span>Total estimé après {selectedProjectData.duration} :</span>
                      <span>
                        {Math.round(parseFloat(investmentAmount) * (1 + selectedPackageData.returnRate / 100)).toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Boutons */}
          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              onClick={handleInvestment}
              className="flex-1 bg-orange-600 hover:bg-orange-700"
              disabled={!selectedProject || !investmentAmount || !selectedPackage}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Investir {investmentAmount && parseFloat(investmentAmount).toLocaleString()} FCFA
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MicroInvestment;

