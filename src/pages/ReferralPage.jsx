import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Copy, Share2, Users, Gift, TrendingUp, Award } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext.jsx';

const ReferralPage = () => {
  const { formatAmount } = useCurrency();
  const [referralCode, setReferralCode] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // Génération du code de parrainage unique
  useEffect(() => {
    const generateReferralCode = () => {
      const userId = 'USER123'; // En réalité, ceci viendrait du contexte utilisateur
      const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
      return `${userId}-${randomString}`;
    };

    const code = generateReferralCode();
    setReferralCode(code);
    setReferralLink(`https://umoket.com/register?ref=${code}`);
  }, []);

  // Données de démonstration pour les statistiques de parrainage
  const referralStats = {
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarnings: 45000, // en FCFA
    currentMonthEarnings: 12000,
    nextRewardThreshold: 20,
    rewardsEarned: [
      { type: 'Crédit Ubuntu', amount: 5000, date: '2024-12-15', isCredit: true },
      { type: 'Réduction Abonnement', amount: '50%', date: '2024-12-10', isCredit: false },
      { type: 'Bonus Tirelire', amount: 2000, date: '2024-12-05', isCredit: true }
    ]
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const shareReferralLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Rejoignez UmoKet - Marketplace Solidaire Africaine',
          text: 'Découvrez UmoKet, la marketplace qui transforme chaque achat en acte solidaire !',
          url: referralLink,
        });
      } catch (err) {
        console.error('Erreur lors du partage:', err);
      }
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API de partage
      copyToClipboard();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Programme de Parrainage Ubuntu</h1>
        <p className="text-lg text-gray-600">
          Partagez l'esprit Ubuntu et gagnez des récompenses en invitant vos proches à rejoindre UmoKet
        </p>
      </div>

      {/* Section Lien de Parrainage */}
      <Card className="bg-gradient-to-r from-orange-50 to-green-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Share2 className="h-6 w-6" />
            Votre Lien de Parrainage
          </CardTitle>
          <CardDescription>
            Partagez ce lien unique avec vos amis, famille et collègues pour les inviter à rejoindre UmoKet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-700">Code de parrainage:</span>
              <Badge variant="outline" className="font-mono">{referralCode}</Badge>
            </div>
            <div className="flex gap-2">
              <Input 
                value={referralLink} 
                readOnly 
                className="flex-1 font-mono text-sm"
              />
              <Button 
                onClick={copyToClipboard}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                {copySuccess ? 'Copié!' : 'Copier'}
              </Button>
              <Button 
                onClick={shareReferralLink}
                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700"
              >
                <Share2 className="h-4 w-4" />
                Partager
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques de Parrainage */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Parrainés</p>
                <p className="text-2xl font-bold text-blue-600">{referralStats.totalReferrals}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Actifs ce Mois</p>
                <p className="text-2xl font-bold text-green-600">{referralStats.activeReferrals}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Gains Totaux</p>
                <p className="text-2xl font-bold text-orange-600">{formatAmount(referralStats.totalEarnings)}</p>
              </div>
              <Gift className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ce Mois</p>
                <p className="text-2xl font-bold text-purple-600">{formatAmount(referralStats.currentMonthEarnings)}</p>
              </div>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progression vers la Prochaine Récompense */}
      <Card>
        <CardHeader>
          <CardTitle className="text-green-800">Progression vers la Prochaine Récompense</CardTitle>
          <CardDescription>
            Parrainez {referralStats.nextRewardThreshold - referralStats.totalReferrals} personnes de plus pour débloquer votre prochaine récompense
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{referralStats.totalReferrals} parrainés</span>
              <span>{referralStats.nextRewardThreshold} objectif</span>
            </div>
            <Progress 
              value={(referralStats.totalReferrals / referralStats.nextRewardThreshold) * 100} 
              className="h-3"
            />
            <p className="text-sm text-gray-600 mt-2">
              Prochaine récompense: <strong>Crédit Ubuntu de {formatAmount(10000)}</strong>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Historique des Récompenses */}
      <Card>
        <CardHeader>
          <CardTitle>Récompenses Gagnées</CardTitle>
          <CardDescription>
            Historique de vos récompenses de parrainage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {referralStats.rewardsEarned.map((reward, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Gift className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">{reward.type}</p>
                    <p className="text-sm text-gray-600">{reward.date}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {reward.isCredit ? formatAmount(reward.amount) : reward.amount}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comment ça Marche */}
      <Card>
        <CardHeader>
          <CardTitle>Comment fonctionne le Parrainage Ubuntu ?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Share2 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">1. Partagez</h3>
              <p className="text-sm text-gray-600">
                Partagez votre lien unique avec vos proches via WhatsApp, email ou réseaux sociaux
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">2. Ils Rejoignent</h3>
              <p className="text-sm text-gray-600">
                Vos filleuls s'inscrivent sur UmoKet et effectuent leur première transaction
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">3. Vous Gagnez</h3>
              <p className="text-sm text-gray-600">
                Recevez des crédits Ubuntu, des réductions et des bonus pour chaque parrainage réussi
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralPage;

