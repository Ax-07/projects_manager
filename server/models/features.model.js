const db = require('./index');

module.exports = (sequelize, DataTypes) => {
    const Feature = sequelize.define('Feature', {
        feature_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        priority: {
            type: DataTypes.ENUM('low', 'medium', 'high'),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('todo', 'in_progress', 'done'),
            allowNull: false
        },
        specification_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                tableName: 'specifications', // Utilise le nom de la table Specification
                key: 'specification_id'
            }
        }
    }, {
        timestamps: true,
        underscored: true
    });

    Feature.associate = (models) => {
        Feature.belongsTo(models.Specification, {
            foreignKey: 'specification_id',
            as: 'specificationFeature'
        });
    };

    return Feature;
};
