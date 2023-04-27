require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs')
const path = require('node:path')

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildPresences] });


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

process.on('uncaughtException', (error, source) => {
    console.log(error);
    const channel = client.channels.cache.get(process.env.BOT_ERRORS)

    channel.send("**Bot break report**: \n \`\`\`javascript \n" + error + "\`\`\`\n\`\`\`" + source + "\`\`\`")
});


const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}



client.login(process.env.TOKEN);