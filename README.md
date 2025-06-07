# 🚀 SaaS ProjDev - Plateforme de Développement SaaS

## 📝 Description
SaaS ProjDev est une application web moderne et robuste construite avec React, TypeScript et NestJS. Cette plateforme offre une solution complète pour la gestion de projets de développement mini-SaaS, intégrant des fonctionnalités avancées d'authentification, de gestion de données en temps réel et d'interface utilisateur moderne.

## ✨ Fonctionnalités Principales
- 🔐 Authentification sécurisée
- 📊 Interface utilisateur moderne avec Shadcn/UI
- 🔄 Communication en temps réel avec Socket.IO
- 📱 Design responsive avec Tailwind CSS
- 📈 Visualisation de données 
- 🔍 Validation des formulaires
- 📦 Gestion d'état avec React Query

## 🛠️ Technologies Utilisées
- **Frontend:**
  - React 
  - TypeScript
  - Vite
  - Tailwind CSS
  - Shadcn/UI
  - React Router DOM
  - React Query
  - Socket.IO Client

- **Backend:**
  - NestJS
  - Express
  - Socket.IO

## 🚀 Installation

1. **Cloner le repository**
   ```bash
   git clone [https://github.com/Tokennn/SaaS_ProjDev.git]
   cd SaaS_ProjDev
   ```

2. **Installer les dépendances**
   ```bash
   npm install i
   ```

3. **Configurer les variables d'environnement**
   ```bash
   cp .env.example .env
   ```
   Remplissez les variables d'environnement nécessaires dans le fichier `.env`

4. **Initialiser la base de données**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Lancer l'application en mode développement**
   ```bash
   npm run dev
   ```

    ```bash
   node src/server.js
   ```

## 📦 Scripts Disponibles
- `npm run dev` - Lance le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm run build:dev` - Compile l'application en mode développement

## 🏗️ Structure du Projet
```
src/
├── api/          # Points d'entrée API
├── components/   # Composants React réutilisables
├── hooks/        # Hooks personnalisés
├── lib/          # Utilitaires et configurations
├── pages/        # Pages de l'application
├── stats/        # Composants de statistiques
└── server.js     # Configuration du serveur
```

## 🔒 Sécurité
- Authentification JWT
- Validation des données avec Zod
- Protection CSRF
- Gestion sécurisée des sessions
- Variables d'environnement pour les secrets

## 🎨 Interface Utilisateur
- Design moderne et minimaliste
- Composants accessibles (ARIA)
- Animations fluides avec Framer Motion
- Interface responsive

## 📄 Licence
Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Auteurs
- [Quentin.Contreau] - Développeur Principal

## 🙏 Remerciements
- Shadcn/UI pour les composants
- La communauté open source

---
PS : Hébergement fais sur : https://langage-sensei.netlify.app

⭐ N'hésitez pas à donner une étoile au projet si vous l'appréciez !
