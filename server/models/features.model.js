module.exports = (sequelize, DataTypes) => {
    const Feature = sequelize.define('Feature', {
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

    Feature.associate = (models) => {
        Feature.belongsTo(models.Specification, {
            foreignKey: 'specification_id',
            as: 'specificationFeature' // Changed to 'specificationFeature' to ensure unique alias
        });
    };

    return Feature;
};
