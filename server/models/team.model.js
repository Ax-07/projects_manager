const db = require('./index');

module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define('Team', {
        team_id: {
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
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        underscored: true
    });

    return Team;
};
