const Sequelize = require('sequelize');
const sequelize = require('../utils/database.js');

const TicketSystem = sequelize.define('ticketSystem', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    ticketChannel: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    staffId: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    openTicket: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    transcripts: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    ticketMessage: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'Create a ticket in this guild for assistance!'
    }
});

module.exports = TicketSystem;