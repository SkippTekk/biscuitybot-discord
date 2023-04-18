const Sequelize = require('sequelize');
const sequelize = require('../utils/database.js');

const Guild = sequelize.define('guild', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    welcomeChannelId: {
        type: Sequelize.STRING,
        allowNull: true
    },
    defaultRole: {
        type: Sequelize.STRING,
        allowNull: true
    },
    logChannel: {
        type: Sequelize.STRING,
        allowNull: true
    },
    openTicket: {
        type: Sequelize.STRING,
        allowNull: true
    },
    ticketChannel: {
        type: Sequelize.STRING,
        allowNull: true
    },
    ticketArchives: {
        type: Sequelize.STRING,
        allowNull: true
    },
    ticketTranscripts: {
        type: Sequelize.STRING,
        allowNull: true
    }

});

module.exports = Guild;