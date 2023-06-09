const Sequelize = require('sequelize');
const sequelize = require('../utils/database.js');

const Guild = sequelize.define('guild', {
    guildName: {
        type: Sequelize.STRING,
        allowNull: true
    },
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
    verifyRole: {
        type: Sequelize.STRING,
        allowNull: true
    },
    verifyRoleMessage: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Clicking the button states you follow the rules set in this Guild.'
    }

});

module.exports = Guild;