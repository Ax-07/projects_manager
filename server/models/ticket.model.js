const db = require('./index');

module.exports = (sequelize, DataTypes) => {
    const Ticket = sequelize.define('Ticket', {
        ticket_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        titre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.JSON,
            allowNull: false
        },
        priorite: {
            type: DataTypes.ENUM('Basse', 'Moyenne', 'Haute'),
            allowNull: false
        },
        estimation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        equipe_responsable: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_story: {
            type: DataTypes.JSON,
            allowNull: false
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dependances: {
            type: DataTypes.JSON,
            allowNull: true
        },
        risques_potentiels: {
            type: DataTypes.JSON,
            allowNull: true
        },
        ressources_necessaires: {
            type: DataTypes.JSON,
            allowNull: true
        },
        statut: {
            type: DataTypes.ENUM('À faire', 'En cours', 'Terminé'),
            allowNull: false
        },
        tasks: {
            type: DataTypes.JSON,
            allowNull: true
        },
        backlog_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                tableName: 'backlogs',
                key: 'backlog_id'
            }
        }
    }, {
        timestamps: true,
        underscored: true
    });

    Ticket.associate = (models) => {
        Ticket.belongsTo(models.Backlog, {
            foreignKey: 'backlog_id',
            as: 'ticketBacklog'
        });
    };

    return Ticket;
};
