module.exports = (sequelize, DataTypes) => {
    const UserTicket = sequelize.define('UserTicket', {
        user_id: {
            type: DataTypes.UUID,
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        ticket_id: {
            type: DataTypes.UUID,
            references: {
                model: 'tickets',
                key: 'ticket_id'
            }
        }
    }, {
        timestamps: false,
        underscored: true,
        tableName: 'user_tickets'
    });

    return UserTicket;
};
