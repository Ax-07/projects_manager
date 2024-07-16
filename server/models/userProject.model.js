module.exports = (sequelize, DataTypes) => {
    const UserProjet = sequelize.define('UserProjet', {
        user_id: {
            type: DataTypes.UUID,
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        projet_id: {
            type: DataTypes.UUID,
            references: {
                model: 'projets',
                key: 'projet_id'
            }
        }
    }, {
        timestamps: false,
        underscored: true,
        tableName: 'user_projets'
    });

    return UserProjet;
};
