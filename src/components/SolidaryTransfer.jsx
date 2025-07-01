import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Heart, Send, User, DollarSign } from 'lucide-react';

const SolidaryTransfer = ({ onClose, onTransfer }) => {
  const [selectedVendor, setSelectedVendor] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [transferType, setTransferType] = useState('direct'); // 'direct' ou 'ubuntu'

  const favoriteVendors = [
    { id: 'aminata_diallo', name: 'Aminata Diallo', location: 'Dakar, Sénégal', needsHelp: true },
    { id: 'kofi_asante', name: 'Kofi Asante', location: 'Accra, Ghana', needsHelp: false },
    { id: 'fatou_keita', name: 'Fatou Keita', location: 'Bamako, Mali', needsHelp: true },
    { id: 'ibrahim_traore', name: 'Ibrahim Traoré', location: 'Ouagadougou, Burkina Faso', needsHelp: true }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedVendor && amount) {
      onTransfer({
        vendorId: selectedVendor,
        amount: parseFloat(amount),
        message,
        type: transferType,
        timestamp: new Date().toISOString()
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-600">
            <Heart className="mr-2 h-5 w-5" />
            Virement Solidaire
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Type de virement */}
            <div>
              <Label>Type de virement</Label>
              <Select value={transferType} onValueChange={setTransferType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="direct">
                    <div className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      Virement direct
                    </div>
                  </SelectItem>
                  <SelectItem value="ubuntu">
                    <div className="flex items-center">
                      <Heart className="mr-2 h-4 w-4" />
                      Contribution Ubuntu
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sélection du vendeur */}
            <div>
              <Label>Vendeur bénéficiaire</Label>
              <Select value={selectedVendor} onValueChange={setSelectedVendor}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un vendeur" />
                </SelectTrigger>
                <SelectContent>
                  {favoriteVendors.map((vendor) => (
                    <SelectItem key={vendor.id} value={vendor.id}>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          <div>
                            <div className="font-medium">{vendor.name}</div>
                            <div className="text-sm text-gray-500">{vendor.location}</div>
                          </div>
                        </div>
                        {vendor.needsHelp && (
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                            Aide nécessaire
                          </span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Montant */}
            <div>
              <Label>Montant (FCFA)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10"
                  min="100"
                  step="100"
                  required
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Montant minimum : 100 FCFA
              </p>
            </div>

            {/* Message personnel */}
            <div>
              <Label>Message personnel (optionnel)</Label>
              <textarea
                placeholder="Écrivez un message d'encouragement..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                rows="3"
                maxLength="200"
              />
              <p className="text-sm text-gray-500 mt-1">
                {message.length}/200 caractères
              </p>
            </div>

            {/* Résumé */}
            {selectedVendor && amount && (
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-medium text-orange-800 mb-2">Résumé du virement</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Bénéficiaire :</span>
                    <span className="font-medium">
                      {favoriteVendors.find(v => v.id === selectedVendor)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Montant :</span>
                    <span className="font-medium">{amount} FCFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type :</span>
                    <span className="font-medium">
                      {transferType === 'direct' ? 'Virement direct' : 'Contribution Ubuntu'}
                    </span>
                  </div>
                  {transferType === 'ubuntu' && (
                    <div className="flex justify-between text-orange-600">
                      <span>Bonus Ubuntu :</span>
                      <span className="font-medium">+{Math.round(parseFloat(amount) * 0.1)} FCFA</span>
                    </div>
                  )}
                </div>
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
                type="submit"
                className="flex-1 bg-orange-600 hover:bg-orange-700"
                disabled={!selectedVendor || !amount}
              >
                <Send className="mr-2 h-4 w-4" />
                Envoyer
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SolidaryTransfer;

