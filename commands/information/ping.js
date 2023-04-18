const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Gives the ping and fun data from the bot.'),

    async execute(interaction) {

        const pingEmbed = new EmbedBuilder()
            .setColor('Random')
            .setTitle('BiscuityBots ping')
            .addFields(
                {
                    name: 'Ping Latency',
                    value: `${interaction.client.ws.ping} ms`,
                },
                {
                    name: 'Reply Latency',
                    value: `later`,
                }
            )
            .setTimestamp();


        await interaction.reply(
            {
                embeds: [pingEmbed]
            }
        )
    }

}