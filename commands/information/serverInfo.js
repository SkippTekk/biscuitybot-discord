const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-information')
        .setDescription('This Guilds information.'),

    async execute(interaction) {
        const owner = await interaction.guild.fetchOwner();
        const serverEmbed = new EmbedBuilder()
            .setColor('Blurple')
            .setTitle('Guilds information.')
            .addFields(
                {
                    name: 'Name of this guild',
                    value: `${interaction.guild.name}`
                },
                {
                    name: 'Owner',
                    value: `${owner}`,
                },
                {
                    name: 'Members Count',
                    value: `${interaction.guild.memberCount}`,
                },
                {
                    name: 'Bot Count',
                    value: `Coming later`,
                },
                {
                    name: 'Banned users',
                    value: `Coming later`
                }
            )
            .setTimestamp();


        await interaction.reply({ embeds: [serverEmbed] })
    }

}