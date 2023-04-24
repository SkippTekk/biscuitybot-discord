const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        let status = [
            {
                name: `${client.guilds.cache.size} guilds!`,
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
        client.user.setStatus('dnd');
    }
}