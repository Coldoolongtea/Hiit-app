# Hiit-app
Il s'agit ici d'un projet d'application mobile construite en utilisant un MERN stack.
L'objectif principal de ce projet est de créer une application permettant à ses utilisateurs de personnaliser leurs séances de HIIT. Chaque séance aura un nom,
et sera reprise dans une liste. L’utilisateur peut organiser ses entraînements en choisissant des séances parmi cette liste ou rajouter des séances à la liste.
Une page communautaire sera à disposition de tous les utilisateurs afin de permettre à quiconque de découvrir des idées de séance qui ont été introduites par d’autres personnes 
et  pourra l'ajouter à sa liste. 

Lorsque l'utilisateur démarre une séance, ce dernier aura un affichage chronométré des différents mouvements lui permettant de suivre aisément la séance.


Pre-requis:
Il est nécessaire d’avoir un service mongoDB qui tourne sur votre machine afin de pouvoir créer la base de donnée du projet.

Windows: lien de téléchargement. Je recommande l’installation intégrale pour pouvoir utiliser mongo compass, un outil de visualisation mongo très pratique.
Linux: Voici différents walkthrough d’installation pour plusieurs distro Linux.
Pour vérifier que l’installation s’est correctement déroulée:

Windows: ouvrez mongo compass et rentré l’URL suivante: mongodb://localhost:27017/
Linux: ouvrez un terminal et rentrez la commande mongo qui devrait vous ouvrir le mongo shell.
Il est également indispensable d’avoir le node d’installer sur votre machine:

Windows: lien de téléchargement. Suivre les étapes d’installation.
Linux: Je recommande l’installation de nvm (Node Version Manager) disponible ici. Il suffit ensuite d’executer la commande nvm install node qui installera la version LTS de node (v14.17.0)
Pour vérifier que l’installation s’est correctement déroulée:

Windows et Linux: ouvrez un terminal et entrée la commande node qui devrait vous ouvrir le shell de node.
Nous avons utilisé le paquet manager yarn pour gérer les dépendances de notre projet qui peut être installé via la commande suivante:

Windows: Ouvrez un cmd en administrateur et executez la commande npm install -g yarn
Linux: Ouvrez un terminal et executez la commande sudo npm install -g yarn
Pour pouvoir utiliser l’application sur votre téléphone, il vous suffira simplement d’installer Expo qui est disponible sur le Play store et l’App store.

Finalement, il vous faudra votre ip privé pour que l’application mobile puisse communiquer avec le serveur node. (Format 192.168.X.X)

Windows: ouvrez un terminal cmd et executez ipconfig. Recuperez l’adresse IPv4 de votre carte réseau en LAN.
Linux: ouvrez un terminal et executez ip addr. Récupérez l’adresse IPv4 inet de broadcast (wifi0).
Dans le projet, ouvrez le fichier à la racine ./config.js et insérez votre adresse ip.

Installation
Rentrez dans le dossier dezipper du projet et executez la commande yarn install. Après l’installation, rendez vous dans le dossier backend et executez a nouveau la commande yarn install. Une fois les dépendances installées, il va falloir faire tourner les 2 services. A la racine du projet, executez la commande node ./backend/src/server.js. Ouvrez un nouveau terminal et executez la commande yarn start. Ouvrez l’application Expo sur votre téléphone et scannez le QR code qui est apparu à l’écran.
