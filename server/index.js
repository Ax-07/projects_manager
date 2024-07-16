const express = require('express');
const app = express(); // Création d'une nouvelle application express
const cors = require('cors'); // Importation du module cors pour gerer les origines
require('dotenv').config(); // Importation du module dotenv pour charger les variables d'environnement

const corsOptions = {
  origin: process.env.URL_ORIGIN, // Remplacez par l'origine de votre client
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Méthodes autorisées
  credentials: true // Autorise les cookies
};
app.use(cors(corsOptions)); // Configuration de l'application pour utiliser le module cors
app.use(express.json()); // Configuration de l'application pour utiliser le format JSON
app.use(express.urlencoded({ extended: true })); // Configuration de l'analyseur de corps de requête pour analyser les requêtes en format JSON

const db = require('./models');
db.sequelize.sync().then(()=> console.log('db synchronisé')); // Synchronisation de la base de données

const specbuilder = require('./routes/specBuilder.routes');
app.use('/api', specbuilder);

const projet = require('./routes/projet.routes');
app.use('/api', projet);

const backlog = require('./routes/backlog.routes');
app.use('/api', backlog);

const ticket = require('./routes/ticket.routes');
app.use('/api', ticket);

// Gestion des erreurs
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message || 'Erreur interne du serveur' });
  });
  
  // app.use('/', (req, res) => {
  //   res.send('Welcome to the Project manager API');
  // })
  // Gestion des routes non trouvées (404)
  app.use((req, res, next) => {
    const err = new Error('Route non trouvée');
    err.status = 404;
    next(err);
  });
  
  const port = 8050; // Définition du port sur lequel le serveur sera lancé
  // Démarrage du serveur sur le port spécifié
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  }
  );