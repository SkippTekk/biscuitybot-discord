const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`${client.user.tag} is loaded`);
        client.user.setActivity(`${client.guilds.cache.size}`, { type: ActivityType.Watching });
        client.user.setStatus('online');
    }
}