module.exports = (sequelize, DataTypes) => {
    const Projet = sequelize.define('Projet', {
        projet_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        priority: {
            type: DataTypes.ENUM('low', 'medium', 'high'),
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('todo', 'in_progress', 'done'),
            defaultValue: 'todo',
            allowNull: true
        },
        specification_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        team_id: {
            type: DataTypes.UUID,
            allowNull: true,
        }, 
        progress: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
    }, {
        timestamps: true,
        underscored: true,
    });

    return Projet;
};
