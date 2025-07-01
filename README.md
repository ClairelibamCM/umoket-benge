# UmoKet - Marketplace Solidaire Africaine

## 🌍 Présentation du Projet

UmoKet (Umoja + Market) est la première marketplace africaine à redistribution automatique. Chaque achat génère automatiquement une micro-contribution (0,5%) vers une "Tirelire Ubuntu" qui aide les vendeurs en difficulté.

**URL de Production**: https://mdlvozwm.manus.space

## ✨ Fonctionnalités Principales

### 🏠 Pages Implémentées (8 pages critiques)

1. **Accueil** - Feed produits + Impact du jour
2. **Inscription/Connexion** - Authentification avec simulation Firebase
3. **Tableau de Bord Acheteur** - Solde + Contributions Ubuntu
4. **Catalogue Produits** - Recherche + Filtres + "Vendeurs à Aider"
5. **Profil Vendeur** - Boutique + Soutien reçu (intégré dans le catalogue)
6. **Checkout** - Simulation de paiement + Tirelire Ubuntu (à implémenter)
7. **Mon Impact** - Vendeurs aidés + Success stories
8. **Paramètres** - Configuration personnelle

### 🎨 Design et UX

- **Charte graphique** inspirée des marchés africains
- **Couleurs principales**: Orange (#E67E22), Vert (#27AE60), Bleu (#3498DB)
- **Interface responsive** compatible desktop et mobile
- **Navigation intuitive** avec système d'authentification
- **Composants UI modernes** avec shadcn/ui et Tailwind CSS

### 🔧 Fonctionnalités Techniques

- **Authentification** avec contexte React (simulation)
- **Navigation dynamique** entre les pages
- **Gestion d'état** avec React Context
- **Interface responsive** avec Tailwind CSS
- **Composants réutilisables** avec shadcn/ui
- **Images optimisées** et assets visuels

## 🛠️ Technologies Utilisées

- **Frontend**: React 19.1.0 avec Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Context
- **Build Tool**: Vite
- **Deployment**: Manus Platform

## 📁 Structure du Projet

```
umoket/
├── src/
│   ├── components/
│   │   ├── ui/           # Composants UI (shadcn/ui)
│   │   ├── Header.jsx    # En-tête avec navigation
│   │   └── Navigation.jsx # Navigation principale
│   ├── pages/
│   │   ├── HomePage.jsx      # Page d'accueil
│   │   ├── AuthPage.jsx      # Connexion/Inscription
│   │   ├── DashboardPage.jsx # Tableau de bord
│   │   ├── CatalogPage.jsx   # Catalogue produits
│   │   ├── ImpactPage.jsx    # Mon Impact
│   │   └── SettingsPage.jsx  # Paramètres
│   ├── contexts/
│   │   └── AuthContext.jsx   # Contexte d'authentification
│   ├── assets/           # Images et ressources
│   ├── App.jsx          # Composant principal
│   └── main.jsx         # Point d'entrée
├── public/              # Fichiers statiques
└── dist/               # Build de production
```

## 🚀 Installation et Développement

### Prérequis
- Node.js 20.18.0+
- pnpm (gestionnaire de paquets)

### Installation
```bash
cd umoket
pnpm install
```

### Développement
```bash
pnpm run dev
```

### Build de Production
```bash
pnpm run build
```

## 🌟 Concept Ubuntu

Le concept central d'UmoKet repose sur la philosophie Ubuntu : "Je suis parce que nous sommes". 

- **Tirelire Ubuntu**: 0,5% de chaque achat est automatiquement redistribué
- **Vendeurs à aider**: Identification des vendeurs en difficulté
- **Impact mesurable**: Suivi des contributions et de leur impact
- **Success stories**: Témoignages de réussite grâce au soutien

## 📊 Données de Démonstration

L'application utilise des données fictives pour la démonstration :
- **Vendeurs**: Aminata Diallo (Sénégal), Kofi Asante (Ghana), Fatou Keita (Mali)
- **Produits**: Artisanat, textiles, épices, bijoux, décoration
- **Impact**: 2 450 000 FCFA redistribués, 127 vendeurs aidés

## 🔮 Évolutions Futures

### Intégrations Prévues
- **Firebase Authentication** pour l'authentification réelle
- **Firebase Firestore** pour la base de données
- **Système de paiement** (Orange Money, Wave)
- **Géolocalisation** pour les vendeurs locaux
- **Notifications push** pour les mises à jour

### Fonctionnalités Avancées
- **Chat en temps réel** avec les vendeurs
- **Système de reviews** et évaluations
- **Programme de fidélité** Ubuntu
- **Analytics d'impact** détaillées
- **API mobile** pour application native

## 📝 Notes de Développement

- L'authentification est actuellement simulée (pas de backend)
- Les données sont statiques (pas de base de données)
- Le système de paiement est en simulation
- Toutes les fonctionnalités UI sont opérationnelles

## 🎯 Mission et Vision

**Mission**: Créer une économie plus solidaire en Afrique en redistribuant automatiquement une partie des bénéfices aux vendeurs qui en ont le plus besoin.

**Vision**: Devenir la marketplace de référence pour le commerce équitable et solidaire en Afrique, où chaque achat contribue au développement économique local.

---

*Développé avec ❤️ pour l'Afrique - UmoKet 2024*

