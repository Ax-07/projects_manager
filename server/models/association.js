const User = require('./user');
const Team = require('./team');
const Projet = require('./projet');
const Specification = require('./specification');
const Backlog = require('./backlog');
const Ticket = require('./ticket');
const UserProjet = require('./user_projet'); // Assurez-vous d'avoir ce fichier
const UserTicket = require('./user_ticket'); // Assurez-vous d'avoir ce fichier

// Un utilisateur peut appartenir à une équipe
User.belongsTo(Team, {
    foreignKey: 'team_id',
    as: 'team'
});

// Une équipe peut avoir plusieurs utilisateurs
Team.hasMany(User, {
    foreignKey: 'team_id',
    as: 'users'
});

// Un utilisateur peut avoir plusieurs projets
User.belongsToMany(Projet, {
    through: UserProjet,
    foreignKey: 'user_id',
    as: 'projets'
});

// Un projet peut avoir plusieurs utilisateurs
Projet.belongsToMany(User, {
    through: UserProjet,
    foreignKey: 'projet_id',
    as: 'users'
});

// Un projet peut avoir plusieurs équipes
Projet.hasMany(Team, {
    foreignKey: 'projet_id',
    as: 'teams'
});

// Une équipe appartient à un projet
Team.belongsTo(Projet, {
    foreignKey: 'projet_id',
    as: 'projet'
});

// Un projet peut avoir une spécification
Projet.hasOne(Specification, {
    foreignKey: 'projet_id',
    as: 'specification'
});

// Une spécification appartient à un projet
Specification.belongsTo(Projet, {
    foreignKey: 'projet_id',
    as: 'projet'
});

// Un backlog peut avoir plusieurs tickets
Backlog.hasMany(Ticket, {
    foreignKey: 'backlog_id',
    as: 'tickets'
});

// Un backlog appartient à un projet
Backlog.belongsTo(Projet, {
    foreignKey: 'projet_id',
    as: 'projetBacklog'
});

// Un backlog appartient à une spécification
Backlog.belongsTo(Specification, {
    foreignKey: 'specification_id',
    as: 'specificationBacklog'
});

// Un ticket appartient à un backlog
Ticket.belongsTo(Backlog, {
    foreignKey: 'backlog_id',
    as: 'backlog'
});

// Un ticket peut avoir plusieurs utilisateurs
Ticket.belongsToMany(User, {
    through: UserTicket,
    foreignKey: 'ticket_id',
    as: 'users'
});

// Un utilisateur peut avoir plusieurs tickets
User.belongsToMany(Ticket, {
    through: UserTicket,
    foreignKey: 'user_id', 
    as: 'tickets'
});

// Synchronisation des modèles avec la base de données
sequelize.sync() // Utilisez { force: true } uniquement en développement pour recréer les tables
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(error => {
        console.error('Error creating database & tables:', error);
    });

module.exports = {
    User,
    Team,
    Projet,
    Specification,
    Backlog,
    Ticket,
    UserProjet,
    UserTicket
};
