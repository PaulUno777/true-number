# TrueNumber

Application web full-stack JavaScript développée avec Next.js pour le frontend et NestJS pour le backend.

## Objectif Principal

Implémenter le Frontend et le Backend d'une application nommée "TrueNumber" en utilisant les technologies JavaScript. L'application permet aux utilisateurs de jouer à un jeu de génération de nombres aléatoires avec un système de points.

## Fonctionnalités Implémentées

### 1. Système d'Authentification ✅

- **Création de compte** : Interface d'inscription avec collecte du numéro de téléphone
- **Connexion** : Authentification avec email/téléphone et mot de passe
- **Déconnexion** : Système de déconnexion sécurisé
- **JWT avec refresh tokens** pour la sécurité

### 2. Interface Client "Jeu TrueNumber" ✅

- **Bouton "Générer un nombre"** : Génère un nombre aléatoire entre 0 et 100
- **Règles du jeu** :
  - Si le nombre ≤ 70 : L'utilisateur perd (-35 points)
  - Si le nombre > 70 : L'utilisateur gagne (+50 points)
- **Affichage du solde** : Compteur de points initialisé à 0
- **Historique des parties** : Visualisation complète des parties jouées avec résultats

### 3. Interface Administrateur ✅

L'administrateur peut :
- **Effectuer toutes les actions d'un utilisateur normal** (jouer, voir solde, historique)
- **Voir tous les utilisateurs** de l'application
- **Créer un nouvel utilisateur** avec formulaire dédié
- **Modifier les informations d'un utilisateur** (notamment changer le rôle CLIENT ↔ ADMIN)
- **Supprimer un utilisateur** (sauf lui-même)
- **Consulter les statistiques globales** de l'application

### Fonctionnalités Bonus

- **Interface ludique et gamifiée** avec animations et effets visuels
- **Système d'achievements/trophées** pour motiver les joueurs
- **Internationalisation** (Français/Anglais)
- **Interface responsive** pour tous les appareils
- **Thème sombre/clair** (désactivé temporairement pour le style ludique)

## Tech Stack

### Frontend

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- React Hook Form
- Zod validation
- React Query
- next-intl
- Lucide React icons

### Backend

- NestJS
- TypeScript
- Prisma ORM
- MongoDB
- Passport.js
- JWT
- Swagger
- class-validator
- nestjs-i18n

## Installation

### Prerequisites

- Node.js 18+
- MongoDB (cluster setup like atlas for prisma)

### Backend Setup

1. Clone the repository

```bash
git clone https://github.com/PaulUno777/true-number.git
cd backend
```

2. Install dependencies

```bash
yarn install
```

3. Set up environment variables

```bash
cp .env.example .env
```

Fill in your environment variables:

```env
DATABASE_URL="mongodb://localhost:27017/truenumber"
JWT_SECRET=your-jwt-secret-here
JWT_REFRESH_SECRET=your-refresh-secret-here
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
PORT=8000
```

4. Generate Prisma client and push schema

```bash
yarn prisma generate
yarn prisma db push
```

5. Start the development server

```bash
yarn start:dev
```

### Frontend Setup

1. Navigate to frontend directory

```bash
cd frontend
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

4. Start the development server

```bash
npm run dev
```

## Development

### Code Structure

```
frontend/
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── auth/             # Authentication components
│   ├── game/             # Game-related components
│   ├── admin/            # Admin components
│   └── layout/           # Layout components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── messages/             # i18n messages
└── middleware.ts         # Next.js middleware

backend/
├── src/
│   ├── auth/             # Authentication module
│   ├── users/            # Users module
│   ├── game/             # Game logic module
│   ├── prisma/           # Database service
│   ├── generated/        # Generated file
│   └── i18n/             # Internationalization files
├── prisma/               # Database schema
└── test/                 # Test files
```

## Deployment

### Backend Deployment

- Can be deployed to any Node.js hosting service
- Configure environment variables
- Ensure MongoDB is accessible

### Frontend Deployment

- Deploy to Vercel, Netlify, or any static hosting
- Set up environment variables
- Configure domain for API calls

## License

This project is licensed under the MIT License.
