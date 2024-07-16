const db = require('./index');

module.exports = (sequelize, DataTypes) => {
    const Backlog = sequelize.define('Backlog', {
        backlog_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        projet_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        specification_id: {
            type: DataTypes.UUID,
            allowNull: false,
        }
    }, {
        timestamps: true,
        underscored: true
    });

    return Backlog;
};
