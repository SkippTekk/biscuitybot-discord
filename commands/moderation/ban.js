const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans the user from your discord.')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The person you wanna remove')
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
        const user = interaction.options.getUser('target')
        const reason = interaction.options.getString('reason')
        const member = await interaction.guild.members.fetch(user.id)

        const banEmbed = new EmbedBuilder()
            .setColor('Random')
            .setTitle('Ban')
            .addFields(
                {
                    name: 'Username',
                    value: `${user}`,
                },
                {
                    name: 'Reason',
                    value: `${reason}`,
                }
            )
            .setTimestamp();

        const banFailedEmbed = new EmbedBuilder()
            .setColor('DarkRed')
            .setTitle('Ban')
            .addFields(
                {
                    name: 'Username',
                    value: `${user}`,
                },
                {
                    name: 'Reason',
                    value: `${reason}`,
                },
                {
                    name: 'DM status',
                    value: `${user} had there DM's off.`
                }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [banEmbed] });
        await member.send({ embeds: [banEmbed] }).catch(err => {
            return interaction.editReply({ embeds: [banFailedEmbed] })
        })
        await member.ban(user)
    }

}