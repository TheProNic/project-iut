# Projet d'API REST pour l'IUT

Ce projet est un projet dans lequel nous devions réaliser une API ReST qui doit :

- Gérer des utilisateurs
- Gérer des films
- Gérer une liste de films favoris
- Envoyer un mail de bienvenue lors de l'inscription
- Envoyer un mail lorsqu'un film est ajouté
- Envoyer un mail lorsqu'un film est modifié et présent dans la liste de favoris d'un utilisateur
- Envoyer un mail contenant un csv de l'ensemble des films lorsqu'un administrateur le demande

## Installation

Pour installer le projet, il suffit de :

- cloner le projet
- créer un fichier `.env` à la racine du projet à partir du .env.example et y mettre les variables d'environnement suivantes :
  - `DB_HOST` : l'adresse de la base de données
  - `DB_USER` : l'utilisateur de la base de données
  - `DB_PASSWORD` : le mot de passe de la base de données
  - `DB_NAME` : le nom de la base de données
  - `MAIL_HOST` : l'adresse du serveur mail
  - `MAIL_PORT` : le port du serveur mail
  - `MAIL_USER` : l'utilisateur du serveur mail
  - `MAIL_PASSWORD` : le mot de passe du serveur mail
  - `MAIL_FROM` : l'adresse mail d'envoi des mails
  - `MAIL_ADMIN` : l'adresse mail de l'administrateur
- éxecuter la commande `docker-compose up -d` pour lancer la base de données et rabbitmq
- lancer la commande `npm install` pour installer les dépendances
- lancer la commande `knex migrate:latest` pour créer les tables dans la base de données
- lancer la commande `npm start` pour lancer le serveur

## Utilisation

Pour utiliser le projet, il suffit de se rendre sur la documentation de l'API à l'adresse `localhost:3000/documentation` sur lequel vous retrouverez la liste de toutes les routes de l'API accessibles.

### User
`GET` /users : Récupérer la liste des utilisateurs  
`GET` /users/{id} : Récupérer un utilisateur  
`POST` /users : Créer un utilisateur  
`PATCH` /users/{id} : Modifier un utilisateur  
`DELETE` /users/{id} : Supprimer un utilisateur  
`POST` /users/login : Se connecter (renvoie un token à utiliser dans le header `Authorization`)  

### Movie
`GET` /films : Récupérer la liste des films  
`GET` /film/{id} : Récupérer un film  
`POST` /film : Créer un film  
`PATCH` /film/{id} : Modifier un film  
`DELETE` /film/{id} : Supprimer un film  

### Favorite
`GET` /favoriteFilm/{userId} : Récupérer la liste des films favoris de l'utilisateur  
`POST` /favoriteFilm : Ajouter un film aux favoris  
`DELETE` /favoriteFilm : Supprimer un film des favoris  

### Mail
`POST` /mail/send : Envoyer un mail  

