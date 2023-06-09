const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-information')
        .setDescription('This Guilds information.'),

    async execute(interaction) {
        const owner = await interaction.guild.fetchOwner();
        const members = await interaction.guild.memberCount
        const bots = await interaction.guild.members.cache.filter(member => member.user.bot).size

        const serverEmbed = new EmbedBuilder()
            .setColor('Blurple')
            .setTitle('Guilds information.')
            .addFields(
                {
                    name: 'Name of this guild',
                    value: `${interaction.guild.name}`,
                    inline: true
                },
                {
                    name: 'Owner',
                    value: `${owner}`,
                    inline: true
                },
                {
                    name: 'Members Count',
                    value: `${members - bots}`,
                    inline: true
                },
                {
                    name: 'Bot Count',
                    value: `${bots}`,
                    inline: true
                },
                {
                    name: 'Banned users',
                    value: `Coming later`,
                    inline: true
                },
                {
                    name: 'Guild creation date',
                    value: `${interaction.guild.createdAt.toDateString()}`
                }
            )
            .setTimestamp();


        await interaction.reply({ embeds: [serverEmbed] })
    }

}