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

- éxecuter la commande `docker run --name hapi-mysql -e MYSQL_USER=temmie -e MYSQL_PASSWORD=hapi -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=user -d -p 3308:3306 mysql:8 mysqld --default-authentication-plugin=mysql_native_password`
- cloner le projet 
- lancer la commande `npm install` pour installer les dépendances
- créer un fichier `.env` à la racine du projet et y ajouter les variables d'environnement suivantes : 
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
- lancer la commande `npm start` pour lancer le serveur

## Utilisation

Pour utiliser le projet, il suffit de :
- se rendre sur la documentation de l'API à l'adresse `localhost:3000/documentation`
- 