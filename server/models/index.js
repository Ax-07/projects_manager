const dbConfig = require("../config/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");

// Initialisation de Sequelize
const sequelize = new Sequelize('projectManager', 'user', 'pass', dbConfig);

const db = {};

// Import des modèles
db.Team = require("./team.model.js")(sequelize, DataTypes);
db.User = require("./user.model.js")(sequelize, DataTypes);
db.Specification = require("./specification.model.js")(sequelize, DataTypes);
db.Projet = require("./projet.model.js")(sequelize, DataTypes);
db.Feature = require("./features.model.js")(sequelize, DataTypes);
db.Backlog = require("./backlog.model.js")(sequelize, DataTypes);
db.Ticket = require("./ticket.model.js")(sequelize, DataTypes);

// Ajout des associations entre les modèles
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
        console.log('Association created for model: ', modelName, ' with: ', db[modelName].associations);
    }
});

// Synchronisation des modèles avec la base de données
sequelize.sync({ force: true }) // Utilisez { force: true } uniquement en développement pour recréer les tables
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(error => {
        console.error('Error creating database & tables:', error);
    });

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
