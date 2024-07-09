module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            allowNull: false
        },
        team_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                tableName: 'Team',
                key: 'id'
            }
        }
    }, {
        timestamps: true,
        underscored: true
    });

    User.associate = (models) => {
        User.belongsTo(models.Team, {
            foreignKey: 'team_id',
            as: 'team'
        });
    };

    return User;
};
