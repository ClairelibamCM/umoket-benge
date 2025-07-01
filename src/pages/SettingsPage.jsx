import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { User, MapPin, Bell, Shield, CreditCard, LogOut, Save } from 'lucide-react';

const SettingsPage = () => {
  const [profile, setProfile] = useState({
    name: 'Utilisateur Demo',
    email: 'demo@umoket.com',
    phone: '+221 77 123 45 67',
    location: 'Dakar, Sénégal',
    bio: 'Passionné par l\'artisanat africain et le commerce équitable.'
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Domicile',
      address: '123 Rue de la Paix',
      city: 'Dakar',
      country: 'Sénégal',
      isDefault: true
    },
    {
      id: 2,
      type: 'Bureau',
      address: '456 Avenue Bourguiba',
      city: 'Dakar',
      country: 'Sénégal',
      isDefault: false
    }
  ]);

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    impactReports: true,
    newProducts: false,
    promotions: true,
    ubuntuUpdates: true
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    console.log('Profile updated:', profile);
    // Ici, on sauvegarderait les données
  };

  const handleAddressAdd = () => {
    const newAddress = {
      id: addresses.length + 1,
      type: 'Nouvelle adresse',
      address: '',
      city: '',
      country: '',
      isDefault: false
    };
    setAddresses([...addresses, newAddress]);
  };

  const handleAddressDelete = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Paramètres</h1>
          <p className="text-gray-600">Gérez votre compte et vos préférences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profil</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Adresses</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Sécurité</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Paiement</span>
            </TabsTrigger>
          </TabsList>

          {/* Onglet Profil */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Informations Personnelles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Localisation</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile({...profile, location: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Biographie</Label>
                    <textarea
                      id="bio"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      rows="3"
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    />
                  </div>
                  <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                    <Save className="mr-2 h-4 w-4" />
                    Sauvegarder les modifications
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Adresses */}
          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    Adresses de Livraison
                  </CardTitle>
                  <Button onClick={handleAddressAdd} variant="outline">
                    Ajouter une adresse
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{address.type}</h3>
                          {address.isDefault && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              Par défaut
                            </span>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAddressDelete(address.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Supprimer
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                          placeholder="Adresse"
                          value={address.address}
                          onChange={(e) => {
                            const updated = addresses.map(addr =>
                              addr.id === address.id ? {...addr, address: e.target.value} : addr
                            );
                            setAddresses(updated);
                          }}
                        />
                        <Input
                          placeholder="Ville"
                          value={address.city}
                          onChange={(e) => {
                            const updated = addresses.map(addr =>
                              addr.id === address.id ? {...addr, city: e.target.value} : addr
                            );
                            setAddresses(updated);
                          }}
                        />
                        <Input
                          placeholder="Pays"
                          value={address.country}
                          onChange={(e) => {
                            const updated = addresses.map(addr =>
                              addr.id === address.id ? {...addr, country: e.target.value} : addr
                            );
                            setAddresses(updated);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Notifications */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  Préférences de Notification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Mises à jour de commandes</h3>
                      <p className="text-sm text-gray-600">Notifications sur le statut de vos commandes</p>
                    </div>
                    <Switch
                      checked={notifications.orderUpdates}
                      onCheckedChange={(checked) => setNotifications({...notifications, orderUpdates: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Rapports d'impact</h3>
                      <p className="text-sm text-gray-600">Résumés mensuels de votre impact Ubuntu</p>
                    </div>
                    <Switch
                      checked={notifications.impactReports}
                      onCheckedChange={(checked) => setNotifications({...notifications, impactReports: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Nouveaux produits</h3>
                      <p className="text-sm text-gray-600">Alertes sur les nouveaux produits disponibles</p>
                    </div>
                    <Switch
                      checked={notifications.newProducts}
                      onCheckedChange={(checked) => setNotifications({...notifications, newProducts: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Promotions</h3>
                      <p className="text-sm text-gray-600">Offres spéciales et réductions</p>
                    </div>
                    <Switch
                      checked={notifications.promotions}
                      onCheckedChange={(checked) => setNotifications({...notifications, promotions: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Mises à jour Ubuntu</h3>
                      <p className="text-sm text-gray-600">Nouvelles sur les vendeurs que vous aidez</p>
                    </div>
                    <Switch
                      checked={notifications.ubuntuUpdates}
                      onCheckedChange={(checked) => setNotifications({...notifications, ubuntuUpdates: checked})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Sécurité */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Sécurité du Compte
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Authentification à deux facteurs</h3>
                      <p className="text-sm text-gray-600">Sécurisez votre compte avec un code SMS</p>
                    </div>
                    <Switch
                      checked={security.twoFactor}
                      onCheckedChange={(checked) => setSecurity({...security, twoFactor: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Alertes de connexion</h3>
                      <p className="text-sm text-gray-600">Notifications lors de nouvelles connexions</p>
                    </div>
                    <Switch
                      checked={security.loginAlerts}
                      onCheckedChange={(checked) => setSecurity({...security, loginAlerts: checked})}
                    />
                  </div>
                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full">
                      Changer le mot de passe
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Paiement */}
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Méthodes de Paiement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Orange Money</h3>
                        <p className="text-sm text-gray-600">**** **** **** 1234</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Par défaut
                      </span>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Wave</h3>
                        <p className="text-sm text-gray-600">**** **** **** 5678</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        Supprimer
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Ajouter une méthode de paiement
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Zone de danger */}
        <Card className="mt-8 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Zone de Danger</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-900">Supprimer le compte</h3>
                  <p className="text-sm text-gray-600">
                    Cette action est irréversible. Toutes vos données seront supprimées.
                  </p>
                </div>
                <Button variant="destructive">
                  Supprimer le compte
                </Button>
              </div>
              <div className="flex justify-between items-center pt-4 border-t">
                <div>
                  <h3 className="font-medium text-gray-900">Se déconnecter</h3>
                  <p className="text-sm text-gray-600">
                    Déconnectez-vous de votre session actuelle.
                  </p>
                </div>
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  Se déconnecter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;

