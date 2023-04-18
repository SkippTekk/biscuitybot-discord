const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`${client.user.tag} is loaded`);
        client.user.setActivity('myself get coded', { type: ActivityType.Watching });
        client.user.setStatus('dnd');
    }
}