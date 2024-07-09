module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define('Team', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        underscored: true
    });

    Team.associate = (models) => {
        Team.hasMany(models.User, {
            foreignKey: 'team_id',
            as: 'members'
        });
    };

    return Team;
};
