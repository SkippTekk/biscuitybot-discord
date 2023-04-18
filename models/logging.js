const Sequelize = require('sequelize');
const sequelize = require('../utils/database.js');

const Logging = sequelize.define('logging', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    guildId: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    deletedMessages: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});

module.exports = Logging;