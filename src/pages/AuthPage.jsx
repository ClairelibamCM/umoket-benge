import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

const AuthPage = ({ setCurrentPage }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login(email, password); // This will set isAuthenticated to true
    } else {
      register(email, password); // This will set isAuthenticated to true
    }
    // The useEffect in App.jsx will handle redirection to profile selection or home
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{isLogin ? 'Connexion' : 'Inscription'}</CardTitle>
          <CardDescription>
            {isLogin ? 'Entrez vos identifiants pour vous connecter' : 'Créez votre compte pour commencer'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Mot de passe</Label>
                {!isLogin && (
                  <a href="#" className="ml-auto inline-block text-sm underline">
                    Mot de passe oublié ?
                  </a>
                )}
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              {isLogin ? 'Se connecter' : 'S\'inscrire'}
            </Button>
            <Button variant="outline" className="w-full">
              {isLogin ? 'Se connecter avec Google' : 'S\'inscrire avec Google'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {isLogin ? 'Vous n\'avez pas de compte ?' : 'Vous avez déjà un compte ?'}{' '}
            <a href="#" className="underline" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Inscrivez-vous' : 'Connectez-vous'}
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;


