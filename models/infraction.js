const Sequelize = require('sequelize');
const sequelize = require('../utils/database.js');

const Infraction = sequelize.define('infraction', {
    guildName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: true
    },
    guildId: {
        type: Sequelize.STRING,
        allowNull: true
    },
    reason: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'No reason provided'
    },
    enforcerId: {
        type: Sequelize.STRING,
        allowNull: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: true
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    }

});

module.exports = Infraction;