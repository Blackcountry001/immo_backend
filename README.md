#  API Blog Agence Immobilière - Backend

Cette API REST permet de gérer une base de données de biens immobiliers (villas, appartements) hébergée sur **Railway (MySQL)**. Elle inclut une documentation interactive via **Swagger**.

## Fonctionnalités
- **CRUD Complet** : Ajouter, Lire, Modifier et Supprimer des annonces.
- **Recherche** : Moteur de recherche par mot-clé dans les titres et descriptions.
- **Documentation** : Interface Swagger UI accessible en local.
- **Sécurité** : Gestion des variables d'environnement via `.env` et protection `.gitignore`.

## Technologies
- **Runtime** : Node.js
- **Framework** : Express.js
- **Base de données** : MySQL (Cloud Railway)
- **Documentation** : Swagger-jsdoc & Swagger-ui-express

## Installation locale
1. Cloner le dépôt : `git clone https://github.com/Blackcountry001/immo_backend.git`
2. Installer les dépendances : `npm install`
3. Créer un fichier `.env` avec vos accès Railway (DB_HOST, DB_USER, etc.)
4. Lancer le serveur : `node server.js`
5. Accéder à la doc : `http://localhost:3000/api-docs`
