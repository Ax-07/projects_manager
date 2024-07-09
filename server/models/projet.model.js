module.exports = (sequelize, DataTypes) => {
    const Projet = sequelize.define('Projet', {
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
            allowNull: true
        },
        specification_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                tableName: 'specification',
                key: 'id',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            }
        }
    }, {
        timestamps: true,
        underscored: true
    });

    Projet.associate = async (models) => {
        console.log('Projet model associations', models);
        await Projet.hasOne(models.Backlog, {
            foreignKey: 'projet_id',
            as: 'backlog' // Changed to 'backlog' to ensure unique alias
        });
        await Projet.belongsTo(models.Specification, {
            foreignKey: 'specification_id',
            as: 'specification' // Changed to 'specification' to ensure unique alias
        });
    };

    return Projet;
};
