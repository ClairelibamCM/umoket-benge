import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Checkbox } from '@/components/ui/checkbox.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { User, ShoppingBag, Mail, Phone, MapPin, Globe, Check } from 'lucide-react';

const AuthPage = ({ setCurrentPage }) => {
  const [currentStep, setCurrentStep] = useState('choice'); // 'choice', 'login', 'register'
  const [userType, setUserType] = useState(''); // 'buyer' or 'seller'
  const [isLogin, setIsLogin] = useState(true);
  
  // Formulaire de connexion
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Formulaire d'inscription complet
  const [registerData, setRegisterData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    emailValidated: false
  });

  const { login, register } = useAuth();

  const countries = [
    'Sénégal', 'Mali', 'Burkina Faso', 'Niger', 'Côte d\'Ivoire', 'Ghana', 'Togo', 'Bénin',
    'Nigeria', 'Cameroun', 'Tchad', 'République Centrafricaine', 'Gabon', 'Congo',
    'République Démocratique du Congo', 'France', 'Canada', 'États-Unis', 'Autre'
  ];

  const handleUserTypeChoice = (type) => {
    setUserType(type);
    setCurrentStep('register');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(loginData.email, loginData.password);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!registerData.acceptTerms) {
      alert('Vous devez accepter les conditions d\'utilisation');
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    
    // Simuler la validation email
    setRegisterData(prev => ({ ...prev, emailValidated: true }));
    
    // Enregistrer l'utilisateur avec son type
    register(registerData.email, registerData.password, {
      ...registerData,
      userType: userType
    });
  };

  const handleGoogleSignup = () => {
    // Simuler l'inscription Google
    alert('Inscription via Google (à implémenter)');
  };

  // Étape 1: Choix du statut (Acheteur/Vendeur)
  if (currentStep === 'choice') {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
        <Card className="mx-auto max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-orange-600">Rejoignez UmoKet</CardTitle>
            <CardDescription className="text-lg">
              Choisissez votre statut pour commencer votre aventure solidaire
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Option Acheteur */}
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-green-500"
                onClick={() => handleUserTypeChoice('buyer')}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Acheteur</h3>
                  <p className="text-gray-600 mb-4">
                    Découvrez des produits authentiques et contribuez à la Tirelire Ubuntu à chaque achat
                  </p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Accès au catalogue complet</li>
                    <li>• Contribution automatique Ubuntu</li>
                    <li>• Suivi de votre impact</li>
                    <li>• Transactions solidaires</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Option Vendeur */}
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-orange-500"
                onClick={() => handleUserTypeChoice('seller')}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Vendeur</h3>
                  <p className="text-gray-600 mb-4">
                    Vendez vos produits et bénéficiez du soutien de la communauté Ubuntu
                  </p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Boutique personnalisée</li>
                    <li>• Aide de la communauté</li>
                    <li>• Outils de gestion</li>
                    <li>• Support prioritaire</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Vous avez déjà un compte ?</p>
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep('login')}
                className="border-orange-600 text-orange-600 hover:bg-orange-50"
              >
                Se connecter
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Étape 2: Connexion
  if (currentStep === 'login') {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Connexion</CardTitle>
            <CardDescription>
              Entrez vos identifiants pour vous connecter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLoginSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>
              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                Se connecter
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <Button 
                variant="link" 
                onClick={() => setCurrentStep('choice')}
                className="text-orange-600"
              >
                Retour au choix du statut
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Étape 3: Inscription complète
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            {userType === 'buyer' ? (
              <>
                <ShoppingBag className="mr-2 h-6 w-6 text-green-600" />
                Inscription Acheteur
              </>
            ) : (
              <>
                <User className="mr-2 h-6 w-6 text-orange-600" />
                Inscription Vendeur
              </>
            )}
          </CardTitle>
          <CardDescription>
            Complétez votre profil pour rejoindre la communauté UmoKet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegisterSubmit} className="grid gap-4">
            {/* Inscription Google */}
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleGoogleSignup}
              className="w-full"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              S'inscrire avec Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Ou</span>
              </div>
            </div>

            {/* Formulaire d'inscription */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Nom d'utilisateur</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="votre_nom_utilisateur"
                  required
                  value={registerData.username}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, username: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Votre prénom"
                  required
                  value={registerData.firstName}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, firstName: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Votre nom de famille"
                required
                value={registerData.lastName}
                onChange={(e) => setRegisterData(prev => ({ ...prev, lastName: e.target.value }))}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Adresse email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  className="pl-10"
                  required
                  value={registerData.email}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                />
                {registerData.emailValidated && (
                  <Check className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Téléphone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+221 XX XXX XX XX"
                  className="pl-10"
                  required
                  value={registerData.phone}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="city">Ville</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="city"
                    type="text"
                    placeholder="Votre ville"
                    className="pl-10"
                    required
                    value={registerData.city}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, city: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country">Pays</Label>
                <Select 
                  value={registerData.country} 
                  onValueChange={(value) => setRegisterData(prev => ({ ...prev, country: value }))}
                >
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Globe className="mr-2 h-4 w-4 text-gray-400" />
                      <SelectValue placeholder="Sélectionnez votre pays" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mot de passe sécurisé"
                  required
                  value={registerData.password}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirmez votre mot de passe"
                  required
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                />
              </div>
            </div>

            {/* Acceptation des CGU */}
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={registerData.acceptTerms}
                onCheckedChange={(checked) => setRegisterData(prev => ({ ...prev, acceptTerms: checked }))}
              />
              <Label htmlFor="terms" className="text-sm">
                J'accepte les{' '}
                <a href="#" className="text-orange-600 hover:underline">
                  conditions d'utilisation
                </a>{' '}
                et la{' '}
                <a href="#" className="text-orange-600 hover:underline">
                  politique de confidentialité
                </a>
              </Label>
            </div>

            <Button 
              type="submit" 
              className={`w-full ${userType === 'buyer' ? 'bg-green-600 hover:bg-green-700' : 'bg-orange-600 hover:bg-orange-700'}`}
              disabled={!registerData.acceptTerms}
            >
              S'inscrire
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <Button 
              variant="link" 
              onClick={() => setCurrentStep('choice')}
              className="text-orange-600"
            >
              Retour au choix du statut
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;


