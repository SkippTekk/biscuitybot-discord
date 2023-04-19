require('dotenv').config();
const { SlashCommandBuilder, EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require("discord.js");



module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot-information')
        .setDescription('Gives stats of the bot.'),

    async execute(interaction) {
        //Bot uptime
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        let bdays = Math.floor(interaction.client.uptime / 86400000);
        let bhours = Math.floor(interaction.client.uptime / 3600000) % 24;
        let bminutes = Math.floor(interaction.client.uptime / 60000) % 60;
        let bseconds = Math.floor(interaction.client.uptime / 1000) % 60;

        const embed = new EmbedBuilder()
            .setTitle('Biscuitybot Information Center')
            .setDescription('Information about the bot.')
            .addFields(
                {
                    name: 'Uptime in D:H:M:S',
                    value: `${bdays}:${bhours}:${bminutes}:${bseconds}`,
                    inline: true
                },
                {
                    name: 'Ram stats Stats',
                    value: `${used.toFixed(2)} MB / 1024 MB`,
                    inline: true
                }
            )
            .addFields(
                {
                    name: 'Server Count',
                    value: `${interaction.client.guilds.cache.size}`,
                    inline: true
                },
                {
                    name: 'Shard count',
                    value: `${interaction.client.shard.count}`,
                    inline: true
                },
                {
                    name: 'Bot watching',
                    value: `Watching ${interaction.client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} users.`,
                    inline: true
                }
            )
            .setFooter({ text: 'Bot proudly made by SkippTekk#6969' })
            .setTimestamp();


        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Github!')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://github.com/SkippTekk/biscuitybot-discord'),
                new ButtonBuilder()
                    .setLabel('Bot Invite!')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://discord.com/api/oauth2/authorize?client_id=705062601964519554&permissions=8&scope=bot%20applications.commands'),
            )

        await interaction.reply({
            embeds: [embed], components: [button],
            ephemeral: false
        })
    }

}