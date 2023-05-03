const Sequelize = require('sequelize');
const sequelize = require('../utils/database.js');

const Level = sequelize.define('level', {
    guildId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    xp: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    level: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
});

module.exports = Level;