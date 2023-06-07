const { ActivityType } = require('discord.js');

const Guild = require('../models/guild');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        const GuildCount = await Guild.count();
        client.channels.cache
            .get(process.env.GUILD_COUNT)
            .setName(`Guilds - ${client.guilds.cache.size}`);

        let status = [
            {
                name: `${GuildCount} guilds!`,
                type: ActivityType.Watching,
            },
            {
                name: `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} users!`,
                type: ActivityType.Watching,
            },
            {
                name: 'for /help',
                type: ActivityType.Watching,
            }
        ]
        setInterval(() => {
            let random = Math.floor(Math.random() * status.length)
            client.user.setActivity(status[random])
        }, 5000);
        console.log(`${client.user.tag} is loaded`);
        client.user.setStatus('online');
    }
}