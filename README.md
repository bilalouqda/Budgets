# Budget Manager 💰

## Description

Budget Manager est une application web innovante conçue pour aider les utilisateurs à gérer efficacement leurs finances personnelles. En offrant une solution intuitive et complète, l'application permet de suivre, catégoriser et visualiser les dépenses avec facilité.

## Problématique

De nombreuses personnes ont du mal à gérer efficacement leur budget personnel. Cette application répond au besoin d'une solution simple et intuitive pour :
- Suivre les dépenses
- Planifier les budgets mensuels
- Visualiser les habitudes de consommation

## Fonctionnalités Principales

### 1. Authentification Utilisateur
- Inscription et connexion sécurisées
- Gestion de compte utilisateur

### 2. Gestion des Budgets
- Création de budgets mensuels personnalisés
- Modification et suppression de budgets existants
- Suivi des objectifs financiers

### 3. Catégorisation des Dépenses
- Création de catégories de dépenses personnalisées
- Attribution de montants spécifiques par catégorie
- Flexibilité totale dans la gestion des catégories

### 4. Suivi des Transactions
- Enregistrement détaillé des transactions
- Filtrage et recherche avancés
- Visualization des dépenses par catégorie

## Stack Technique

### Frontend
- **React.js** : Interface utilisateur dynamique et réactive
- **Tailwind CSS** : Design moderne et responsive

### Backend
- **Node.js** avec **Nest.js** : API RESTful robuste
- **MongoDB** : Stockage de données flexible

### Authentification
- **JWT (JSON Web Tokens)** : Sécurisation des sessions utilisateur

### Déploiement
- **Vercel** : Hébergement et déploiement continu

## Prérequis

- Node.js (version 18+)
- MongoDB
- npm ou yarn

## Installation

1. Cloner le répertoire
```bash
git clone https://github.com/bilalouqda/Budgets.git
cd Budgets
```

2. Installer les dépendances
```bash
# Pour le frontend
cd frontend
npm install

# Pour le backend
cd ../backend
npm install
```

3. Configuration
- Créer un fichier `.env` dans chaque dossier
- Configurer les variables d'environnement

## Lancement du Projet

### Frontend
```bash
cd frontend
npm start
```

### Backend
```bash
cd backend
npm run start:dev
```

## Structure du Projet
```
Budgets/
│
├── frontend/           # Interface utilisateur React
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/            # API Nest.js
│   ├── src/
│   ├── test/
│   └── package.json
│
└── README.md
```

Lien du Projet : [https://github.com/bilalouqda/Budgets](https://github.com/bilalouqda/Budgets)
