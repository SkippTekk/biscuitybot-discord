const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unbans the user to join back in.')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('This is an ID of the person you wanna unban')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('what\'s the reason foo')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setDMPermission(false),

    async execute(interaction) {
        const userID = interaction.options.getUser('target')
        const reason = interaction.options.getString('reason')

        const banEmbed = new EmbedBuilder()
            .setColor('Random')
            .setTitle('Unbanned')
            .setFields(
                {
                    name: 'User',
                    value: `${userID}`
                },
                {
                    name: 'Reason',
                    value: `${reason}`
                }
            )
            .setTimestamp();

        const banFailedEmbed = new EmbedBuilder()
            .setColor('DarkRed')
            .setTitle('Unbanned')
            .setFields(
                {
                    name: 'User',
                    value: `${userID}`
                },
                {
                    name: 'Reason',
                    value: 'That person isn\'t banned from this Guild'
                }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [banEmbed] })
        await interaction.guild.bans.remove(userID).catch(err => {
            interaction.editReply({ embeds: [banFailedEmbed] })
        })


    }
}
