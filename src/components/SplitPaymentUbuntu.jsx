import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { Heart, ShoppingCart, DollarSign, Plus, Minus } from 'lucide-react';

const SplitPaymentUbuntu = ({ product, onClose, onPayment }) => {
  const [quantity, setQuantity] = useState(1);
  const [enableUbuntuSplit, setEnableUbuntuSplit] = useState(true);
  const [ubuntuAmount, setUbuntuAmount] = useState(500);
  const [selectedUbuntuVendor, setSelectedUbuntuVendor] = useState('');

  const productPrice = product?.price || 25000;
  const totalProductCost = productPrice * quantity;
  const automaticUbuntu = Math.round(totalProductCost * 0.005); // 0.5% automatique
  const totalUbuntuContribution = automaticUbuntu + (enableUbuntuSplit ? ubuntuAmount : 0);
  const grandTotal = totalProductCost + (enableUbuntuSplit ? ubuntuAmount : 0);

  const vendorsNeedingHelp = [
    { id: 'vendor_1', name: 'Mariam Coulibaly', location: 'Bamako, Mali', need: 'Machine à coudre', progress: 65 },
    { id: 'vendor_2', name: 'Sekou Diarra', location: 'Conakry, Guinée', need: 'Stock de matières premières', progress: 30 },
    { id: 'vendor_3', name: 'Aisha Kone', location: 'Abidjan, Côte d\'Ivoire', need: 'Formation marketing', progress: 80 }
  ];

  const handleQuantityChange = (delta) => {
    const newQuantity = Math.max(1, quantity + delta);
    setQuantity(newQuantity);
  };

  const handlePayment = () => {
    const paymentData = {
      product: product,
      quantity: quantity,
      productTotal: totalProductCost,
      ubuntuContribution: totalUbuntuContribution,
      ubuntuVendor: selectedUbuntuVendor,
      grandTotal: grandTotal,
      timestamp: new Date().toISOString()
    };
    onPayment(paymentData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-600">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Paiement Split Ubuntu
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Produit */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">{product?.name || 'Panier en osier traditionnel'}</h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Prix unitaire :</span>
              <span className="font-medium">{productPrice.toLocaleString()} FCFA</span>
            </div>
          </div>

          {/* Quantité */}
          <div>
            <Label>Quantité</Label>
            <div className="flex items-center space-x-3 mt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center"
                min="1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Split Ubuntu */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Label className="text-base">Don Ubuntu supplémentaire</Label>
                <p className="text-sm text-gray-500">En plus de la contribution automatique de 0,5%</p>
              </div>
              <Switch
                checked={enableUbuntuSplit}
                onCheckedChange={setEnableUbuntuSplit}
              />
            </div>

            {enableUbuntuSplit && (
              <div className="space-y-4">
                <div>
                  <Label>Montant du don (FCFA)</Label>
                  <div className="relative mt-2">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="number"
                      value={ubuntuAmount}
                      onChange={(e) => setUbuntuAmount(parseInt(e.target.value) || 0)}
                      className="pl-10"
                      min="0"
                      step="100"
                    />
                  </div>
                  <div className="flex space-x-2 mt-2">
                    {[250, 500, 1000, 2000].map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setUbuntuAmount(amount)}
                        className="text-xs"
                      >
                        {amount}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Sélection du vendeur à aider */}
                <div>
                  <Label>Vendeur à aider (optionnel)</Label>
                  <div className="space-y-2 mt-2">
                    {vendorsNeedingHelp.map((vendor) => (
                      <div
                        key={vendor.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedUbuntuVendor === vendor.id
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedUbuntuVendor(
                          selectedUbuntuVendor === vendor.id ? '' : vendor.id
                        )}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-sm">{vendor.name}</div>
                            <div className="text-xs text-gray-500">{vendor.location}</div>
                            <div className="text-xs text-orange-600 mt-1">
                              Objectif : {vendor.need}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-500">{vendor.progress}%</div>
                            <div className="w-16 h-2 bg-gray-200 rounded-full mt-1">
                              <div
                                className="h-2 bg-orange-500 rounded-full"
                                style={{ width: `${vendor.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Résumé */}
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-medium text-orange-800 mb-3">Résumé du paiement</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Produit ({quantity}x) :</span>
                <span className="font-medium">{totalProductCost.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between text-orange-600">
                <span>Contribution Ubuntu automatique (0,5%) :</span>
                <span className="font-medium">+{automaticUbuntu.toLocaleString()} FCFA</span>
              </div>
              {enableUbuntuSplit && ubuntuAmount > 0 && (
                <div className="flex justify-between text-orange-600">
                  <span>Don Ubuntu supplémentaire :</span>
                  <span className="font-medium">+{ubuntuAmount.toLocaleString()} FCFA</span>
                </div>
              )}
              <div className="border-t border-orange-200 pt-2 flex justify-between font-medium">
                <span>Total :</span>
                <span>{grandTotal.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between text-green-600 text-xs">
                <span>Impact Ubuntu total :</span>
                <span className="font-medium">{totalUbuntuContribution.toLocaleString()} FCFA</span>
              </div>
            </div>
          </div>

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
              onClick={handlePayment}
              className="flex-1 bg-orange-600 hover:bg-orange-700"
            >
              <Heart className="mr-2 h-4 w-4" />
              Payer {grandTotal.toLocaleString()} FCFA
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SplitPaymentUbuntu;

