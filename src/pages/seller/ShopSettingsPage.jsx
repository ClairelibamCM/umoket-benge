import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { 
  Store, 
  Camera, 
  Edit,
  Save,
  Eye,
  Share2,
  MapPin,
  Clock,
  Star,
  Heart,
  Settings,
  Palette,
  Globe,
  Phone,
  Mail
} from 'lucide-react';

const ShopSettingsPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [shopData, setShopData] = useState({
    name: 'Atelier Aminata - Créations Traditionnelles',
    description: 'Artisane passionnée depuis 15 ans, je crée des paniers et objets décoratifs en osier selon les techniques traditionnelles sénégalaises transmises par ma grand-mère.',
    story: 'Mon histoire a commencé dans le petit village de Thiès, où ma grand-mère m\'a enseigné l\'art du tressage. Aujourd\'hui, grâce au soutien de la communauté Ubuntu, j\'ai pu développer mon atelier et former d\'autres jeunes femmes de ma région.',
    location: 'Dakar, Sénégal',
    phone: '+221 77 123 45 67',
    email: 'aminata.diallo@umoket.com',
    workingHours: 'Lun-Ven: 8h-17h, Sam: 8h-12h',
    specialties: ['Paniers traditionnels', 'Objets décoratifs', 'Mobilier en osier'],
    languages: ['Français', 'Wolof', 'Pulaar'],
    certifications: ['Artisan certifié', 'Commerce équitable', 'Produits bio'],
    socialMedia: {
      facebook: 'facebook.com/atelier.aminata',
      instagram: '@atelier_aminata',
      whatsapp: '+221771234567'
    },
    settings: {
      showPhone: true,
      showEmail: true,
      allowMessages: true,
      showLocation: true,
      acceptCustomOrders: true,
      autoReply: true
    }
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // Logique de sauvegarde
  };

  const shopStats = {
    totalViews: 2847,
    monthlyViews: 456,
    rating: 4.8,
    totalReviews: 127,
    responseTime: '2h',
    responseRate: 98
  };

  const recentReviews = [
    {
      id: 1,
      customer: 'Fatima N.',
      rating: 5,
      comment: 'Magnifiques paniers, travail artisanal exceptionnel !',
      date: '2024-06-18',
      verified: true
    },
    {
      id: 2,
      customer: 'Moussa T.',
      rating: 5,
      comment: 'Livraison rapide et produits conformes. Je recommande vivement.',
      date: '2024-06-15',
      verified: true
    },
    {
      id: 3,
      customer: 'Aïcha K.',
      rating: 4,
      comment: 'Très beau travail, juste un petit délai de livraison.',
      date: '2024-06-12',
      verified: true
    }
  ];

  if (previewMode) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* En-tête de prévisualisation */}
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Aperçu de votre boutique</h1>
            <Button onClick={() => setPreviewMode(false)} variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Retour à l'édition
            </Button>
          </div>

          {/* Aperçu de la boutique */}
          <Card className="mb-6">
            <div className="relative h-48 bg-gradient-to-r from-orange-400 to-orange-600 rounded-t-lg">
              <div className="absolute inset-0 bg-black bg-opacity-20 rounded-t-lg"></div>
              <div className="absolute bottom-4 left-6 text-white">
                <h1 className="text-3xl font-bold">{shopData.name}</h1>
                <div className="flex items-center mt-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{shopData.location}</span>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h3 className="font-semibold text-gray-900 mb-3">À propos</h3>
                  <p className="text-gray-700 mb-4">{shopData.description}</p>
                  
                  <h3 className="font-semibold text-gray-900 mb-3">Mon Histoire</h3>
                  <p className="text-gray-700 mb-4">{shopData.story}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {shopData.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline">{specialty}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Note</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-medium">{shopStats.rating}/5</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Avis</span>
                      <span className="font-medium">{shopStats.totalReviews}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Temps de réponse</span>
                      <span className="font-medium">{shopStats.responseTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Ma Boutique</h1>
              <p className="text-gray-600">Personnalisez votre boutique et racontez votre histoire</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setPreviewMode(true)}>
                <Eye className="h-4 w-4 mr-2" />
                Aperçu
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Partager
              </Button>
              {isEditing ? (
                <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600">
                  <Save className="h-4 w-4 mr-2" />
                  Sauvegarder
                </Button>
              ) : (
                <Button onClick={() => setIsEditing(true)} className="bg-orange-500 hover:bg-orange-600">
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Statistiques de la boutique */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Vues totales</p>
                  <p className="text-2xl font-bold text-blue-600">{shopStats.totalViews.toLocaleString()}</p>
                </div>
                <Eye className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Note moyenne</p>
                  <p className="text-2xl font-bold text-yellow-600">{shopStats.rating}/5</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avis clients</p>
                  <p className="text-2xl font-bold text-green-600">{shopStats.totalReviews}</p>
                </div>
                <Heart className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Taux de réponse</p>
                  <p className="text-2xl font-bold text-purple-600">{shopStats.responseRate}%</p>
                </div>
                <Clock className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="story">Histoire</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          {/* Profil de la boutique */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Store className="h-5 w-5 mr-2 text-orange-600" />
                  Informations de la Boutique
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Photo de couverture */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Photo de couverture</label>
                    <div className="relative h-48 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg">
                      <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg"></div>
                      <div className="absolute bottom-4 left-6 text-white">
                        <h2 className="text-2xl font-bold">{shopData.name}</h2>
                      </div>
                      {isEditing && (
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="absolute top-4 right-4"
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          Changer
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Nom de la boutique */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la boutique</label>
                    {isEditing ? (
                      <Input
                        value={shopData.name}
                        onChange={(e) => setShopData({...shopData, name: e.target.value})}
                        className="w-full"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{shopData.name}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    {isEditing ? (
                      <textarea
                        value={shopData.description}
                        onChange={(e) => setShopData({...shopData, description: e.target.value})}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    ) : (
                      <p className="text-gray-700">{shopData.description}</p>
                    )}
                  </div>

                  {/* Spécialités */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Spécialités</label>
                    <div className="flex flex-wrap gap-2">
                      {shopData.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="bg-orange-50 text-orange-800 border-orange-200">
                          {specialty}
                          {isEditing && (
                            <button className="ml-2 text-orange-600 hover:text-orange-800">×</button>
                          )}
                        </Badge>
                      ))}
                      {isEditing && (
                        <Button variant="outline" size="sm">
                          + Ajouter
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                    <div className="flex flex-wrap gap-2">
                      {shopData.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" className="bg-green-50 text-green-800 border-green-200">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Histoire */}
          <TabsContent value="story">
            <Card>
              <CardHeader>
                <CardTitle>Mon Histoire</CardTitle>
                <p className="text-sm text-gray-600">Partagez votre parcours et inspirez vos clients</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {isEditing ? (
                    <textarea
                      value={shopData.story}
                      onChange={(e) => setShopData({...shopData, story: e.target.value})}
                      rows={8}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Racontez votre histoire, vos inspirations, votre parcours..."
                    />
                  ) : (
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed">{shopData.story}</p>
                    </div>
                  )}

                  {/* Galerie photos */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Galerie de l'atelier</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                          <Camera className="h-8 w-8 text-gray-400" />
                        </div>
                      ))}
                      {isEditing && (
                        <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-orange-400">
                          <div className="text-center">
                            <Camera className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                            <span className="text-sm text-gray-500">Ajouter</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact */}
          <TabsContent value="contact">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations de Contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
                      {isEditing ? (
                        <Input
                          value={shopData.location}
                          onChange={(e) => setShopData({...shopData, location: e.target.value})}
                          placeholder="Ville, Pays"
                        />
                      ) : (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                          <span>{shopData.location}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                      {isEditing ? (
                        <Input
                          value={shopData.phone}
                          onChange={(e) => setShopData({...shopData, phone: e.target.value})}
                          placeholder="+221 XX XXX XX XX"
                        />
                      ) : (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-gray-500 mr-2" />
                          <span>{shopData.phone}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      {isEditing ? (
                        <Input
                          value={shopData.email}
                          onChange={(e) => setShopData({...shopData, email: e.target.value})}
                          placeholder="email@example.com"
                        />
                      ) : (
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-gray-500 mr-2" />
                          <span>{shopData.email}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Horaires</label>
                      {isEditing ? (
                        <Input
                          value={shopData.workingHours}
                          onChange={(e) => setShopData({...shopData, workingHours: e.target.value})}
                          placeholder="Lun-Ven: 8h-17h"
                        />
                      ) : (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-500 mr-2" />
                          <span>{shopData.workingHours}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Avis Clients Récents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentReviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{review.customer}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{review.comment}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(review.date).toLocaleDateString('fr-FR')}
                          {review.verified && <span className="ml-2 text-green-600">✓ Achat vérifié</span>}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Paramètres */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-gray-600" />
                  Paramètres de la Boutique
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">Visibilité</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">Afficher le numéro de téléphone</p>
                        <p className="text-sm text-gray-500">Les clients pourront voir votre numéro</p>
                      </div>
                      <Switch 
                        checked={shopData.settings.showPhone}
                        onCheckedChange={(checked) => setShopData({
                          ...shopData, 
                          settings: {...shopData.settings, showPhone: checked}
                        })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">Afficher l'email</p>
                        <p className="text-sm text-gray-500">Les clients pourront voir votre email</p>
                      </div>
                      <Switch 
                        checked={shopData.settings.showEmail}
                        onCheckedChange={(checked) => setShopData({
                          ...shopData, 
                          settings: {...shopData.settings, showEmail: checked}
                        })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">Autoriser les messages</p>
                        <p className="text-sm text-gray-500">Les clients peuvent vous envoyer des messages</p>
                      </div>
                      <Switch 
                        checked={shopData.settings.allowMessages}
                        onCheckedChange={(checked) => setShopData({
                          ...shopData, 
                          settings: {...shopData.settings, allowMessages: checked}
                        })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">Commandes personnalisées</p>
                        <p className="text-sm text-gray-500">Accepter les demandes de produits sur mesure</p>
                      </div>
                      <Switch 
                        checked={shopData.settings.acceptCustomOrders}
                        onCheckedChange={(checked) => setShopData({
                          ...shopData, 
                          settings: {...shopData.settings, acceptCustomOrders: checked}
                        })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">Réponse automatique</p>
                        <p className="text-sm text-gray-500">Envoyer un message automatique aux nouveaux clients</p>
                      </div>
                      <Switch 
                        checked={shopData.settings.autoReply}
                        onCheckedChange={(checked) => setShopData({
                          ...shopData, 
                          settings: {...shopData.settings, autoReply: checked}
                        })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ShopSettingsPage;

