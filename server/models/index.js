const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const db = {};

// Import des modèles
db.Team = require('./team.model')(sequelize, DataTypes);
db.User = require('./user.model')(sequelize, DataTypes);
db.Specification = require('./specification.model')(sequelize, DataTypes);
db.Projet = require('./projet.model')(sequelize, DataTypes);
db.Backlog = require('./backlog.model')(sequelize, DataTypes);
db.Ticket = require('./ticket.model')(sequelize, DataTypes);
db.UserProjet = require('./userProject.model')(sequelize, DataTypes);
db.UserTicket = require('./userTicket.model')(sequelize, DataTypes);

// Afficher les noms des tables pour vérifier
console.log('Table names:');
Object.keys(db).forEach(modelName => {
    console.log(modelName, db[modelName].getTableName());
});

// Associations
// Un utilisateur peut appartenir à une équipe
db.User.belongsTo(db.Team, {
    foreignKey: 'team_id',
    as: 'team'
});
// Un utilisateur peut avoir plusieurs projets
db.User.belongsToMany(db.Projet, {
    through: db.UserProjet,
    foreignKey: 'user_id',
    as: 'projets'
});
// Un utilisateur peut avoir plusieurs tickets
db.User.belongsToMany(db.Ticket, {
    through: db.UserTicket,
    foreignKey: 'user_id', 
    as: 'tickets'
});

// Une équipe peut avoir plusieurs utilisateurs
db.Team.hasMany(db.User, {
    foreignKey: 'team_id',
    as: 'users'
});
// Une équipe appartient à un projet
db.Team.belongsTo(db.Projet, {
    foreignKey: 'projet_id',
    as: 'projet'
});

// Un projet peut avoir plusieurs utilisateurs
db.Projet.belongsToMany(db.User, {
    through: db.UserProjet,
    foreignKey: 'projet_id',
    as: 'users'
});
// Un projet peut avoir plusieurs équipes
db.Projet.hasMany(db.Team, {
    foreignKey: 'projet_id',
    as: 'teams'
});
// Un projet peut avoir une spécification
db.Projet.hasOne(db.Specification, {
    foreignKey: 'projet_id',
    as: 'specification'
});

// Une spécification appartient à un projet
db.Specification.belongsTo(db.Projet, {
    foreignKey: 'projet_id',
    as: 'projet'
});

// Un backlog peut avoir plusieurs tickets
db.Backlog.hasMany(db.Ticket, {
    foreignKey: 'backlog_id',
    as: 'tickets'
});
// Un backlog appartient à un projet
db.Backlog.belongsTo(db.Projet, {
    foreignKey: 'projet_id',
    as: 'projetBacklog'
});
// Un backlog appartient à une spécification
db.Backlog.belongsTo(db.Specification, {
    foreignKey: 'specification_id',
    as: 'specificationBacklog'
});

// Un ticket appartient à un backlog
db.Ticket.belongsTo(db.Backlog, {
    foreignKey: 'backlog_id',
    as: 'backlog'
});
// Un ticket peut avoir plusieurs utilisateurs
db.Ticket.belongsToMany(db.User, {
    through: db.UserTicket,
    foreignKey: 'ticket_id',
    as: 'users'
});



// Configurer les associations après la définition des modèles
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
    console.log('Association created for model: ', modelName, ' with: ', db[modelName].associations);
});

// Synchronisation des modèles avec la base de données
sequelize.sync() // Utilisez { force: true } uniquement en développement pour recréer les tables
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(error => {
        console.error('Error creating database & tables:', error);
    });

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
