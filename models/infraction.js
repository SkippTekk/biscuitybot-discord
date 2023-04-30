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
        allowNull: false
    },
    guildId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    reason: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'No reason provided'
    },
    enforcerId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }

});

module.exports = Infraction;