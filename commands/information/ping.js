const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Gives the ping and fun data from the bot.'),

    async execute(interaction) {
        await interaction.deferReply()
        const reply = await interaction.fetchReply();
        const ping = reply.createdTimestamp - interaction.createdTimestamp;

        const pingEmbed = new EmbedBuilder()
            .setColor('Random')
            .setTitle('BiscuityBots ping')
            .addFields(
                {
                    name: 'Ping Latency',
                    value: `${ping} ms`,
                },
                {
                    name: 'Reply Latency',
                    value: `${interaction.client.ws.ping} ms`,
                }
            )
            .setTimestamp();


        await interaction.editReply(
            {
                embeds: [pingEmbed]
            }
        )
    }

}