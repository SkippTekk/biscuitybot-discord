require("dotenv").config();
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

const Guild = require('./models/guild');
const Ticket = require('./models/ticket');


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences
    ],
});

client.on("guildCreate", (guild) => {

    Guild.create({ guildName: guild.name, id: guild.id, })
    Ticket.create({ guildName: guild.name, id: guild.id, })



    client.channels.cache
        .get(process.env.GUILD_COUNT)
        .setName(`Guilds - ${client.guilds.cache.size}`);

    const guildCreateEmbed = new EmbedBuilder()
        .setTitle("A new Guild added me!")
        .setTimestamp()
        .setColor("Green")
        .addFields(
            {
                name: `Guilds Name`,
                value: `${guild.name}`,
            },
            {
                name: "Member count",
                value: `${guild.memberCount}`,
            }
        );

    client.channels.cache
        .get(process.env.GUILD_ADD)
        .send({ embeds: [guildCreateEmbed] });
});

client.on("guildDelete", (guild) => {
    Guild.destroy({ where: { guildName: guild.name } })
    Ticket.destroy({ where: { guildName: guild.name } })

    client.channels.cache
        .get(process.env.GUILD_COUNT)
        .setName(`Guilds - ${client.guilds.cache.size}`);

    const guildDeleteEmbed = new EmbedBuilder()
        .setTitle("A guild removed me!")
        .setTimestamp()
        .setColor("Red")
        .addFields(
            {
                name: `Guilds Name`,
                value: `${guild.name}`,
            },
            {
                name: "Member count",
                value: `${guild.memberCount}`,
            }
        );

    client.channels.cache
        .get(process.env.GUILD_REMOVE)
        .send({ embeds: [guildDeleteEmbed] });
});

client.on('messageDelete', async (message) => {
    const dbMessageDelete = await Guild.findOne({ where: { id: message.guild.id } });

    client.channels.cache.get(dbMessageDelete.logChannel).send({ content: `:regional_indicator_d: Message delete by ${message.author.tag} - ${message.content}` });

});

client.on('guildMemberRemove', async (member) => {
    const dbMemberLeave = await Guild.findOne({ where: { id: member.guild.id } });

    client.channels.cache.get(dbMemberLeave.logChannel).send({ content: `:regional_indicator_m::regional_indicator_r: ${member.user} Left.` });
})
client.on('messageUpdate', async (messageOld, messageNew) => {
    if (!messageOld.author.bot) return;

    const dbMessageUpdate = await Guild.findOne({ where: { id: messageOld.guild.id } })

    client.channels.cache.get(dbMessageUpdate.logChannel).send({ content: `:regional_indicator_e: Message edited. Old: \`\`\`${messageOld}\`\`\` New: \`\`\`${messageNew}\`\`\` ` })

})
client.on('channelCreate', async (channel) => {
    const dbChannelCreate = await Guild.findOne({ where: { id: channel.guild.id } });

    client.channels.cache.get(dbChannelCreate.logChannel).send({ content: `:regional_indicator_c::regional_indicator_m: ${channel.name} was created.` });

})
client.on('channelDelete', async (channel) => {
    const dbChannelDelete = await Guild.findOne({ where: { id: channel.guild.id } });

    client.channels.cache.get(dbChannelDelete.logChannel).send({ content: `:regional_indicator_c::regional_indicator_d: ${channel.name} was deleted.` });

})

process.on("uncaughtException", (error, source) => {
    console.log(error);
    const channel = client.channels.cache.get(process.env.BOT_ERRORS);

    channel.send("**Bot break report**: \n ```javascript \n" + error + "```\n```" + source + "```");
});

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith("js"));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(process.env.TOKEN);