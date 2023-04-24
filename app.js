require('dotenv').config();
const { channel } = require('diagnostics_channel');
const { Client, GatewayIntentBits, EmbedBuilder, messageLink } = require('discord.js');
const fs = require('fs');
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages]

});
const path = require('path');

process.on('uncaughtException', (error, source) => {
    console.log(error);

    client.channels.cache.get(process.env.BOT_ERRORS).send("**Bot break report**: \n \`\`\`javascript \n" + error + "\`\`\`\n\`\`\`" + source + "\`\`\`")
});

client.on('guildCreate', guild => {

    client.channels.cache.get(process.env.GUILD_COUNT).setName(`Guilds: ${client.guilds.cache.size}`);

    const guildCreateEmbed = new EmbedBuilder()
        .setTitle('A new Guild added me!')
        .setTimestamp()
        .setColor('Green')
        .addFields(
            {
                name: `Guilds Name`,
                value: `${guild.name}`
            },
            {
                name: 'Member count',
                value: `${guild.memberCount}`
            }
        )

    client.channels.cache.get(process.env.GUILD_ADD).send({ embeds: [guildCreateEmbed] })
});


client.on('guildDelete', guild => {

    client.channels.cache.get(process.env.GUILD_COUNT).setName(`Guilds: ${client.guilds.cache.size}`);

    const guildDeleteEmbed = new EmbedBuilder()
        .setTitle('A guild removed me!')
        .setTimestamp()
        .setColor('Red')
        .addFields(
            {
                name: `Guilds Name`,
                value: `${guild.name}`
            },
            {
                name: 'Member count',
                value: `${guild.memberCount}`
            }
        )

    client.channels.cache.get(process.env.GUILD_REMOVE).send({ embeds: [guildDeleteEmbed] })
});

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file)
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
};

client.login(process.env.TOKEN);