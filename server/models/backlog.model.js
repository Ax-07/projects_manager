module.exports = (sequelize, DataTypes) => {
    const Backlog = sequelize.define('Backlog', {
        projet_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                tableName: 'Projet',
                key: 'id'
            }
        },
        specification_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                tableName: 'Specification',
                key: 'id'
            }
        }
    }, {
        timestamps: true,
        underscored: true
    });

    Backlog.associate = (models) => {
        Backlog.belongsTo(models.Projet, {
            foreignKey: 'projet_id',
            as: 'projetBacklog' // Changed to 'projetBacklog' to ensure unique alias
        });
        Backlog.belongsTo(models.Specification, {
            foreignKey: 'specification_id',
            as: 'specificationBacklog' // Changed to 'specificationBacklog' to ensure unique alias
        });
        Backlog.hasMany(models.Ticket, {
            foreignKey: 'backlog_id',
            as: 'tickets'
        });
    };

    return Backlog;
};
