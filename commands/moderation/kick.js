const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Yeets the users butt out of your Guild.')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('Soft remove of the person you want yeeted')
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
        const userID = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason');
        const member = interaction.options.getMember('target');

        const kickEmbed = new EmbedBuilder()
            .setColor('Random')
            .setTitle('Kicked')
            .addFields(
                {
                    name: 'Username',
                    value: `${userID}`,
                },
                {
                    name: 'Reason',
                    value: `${reason}`,
                }
            )
            .setTimestamp();

        const kickFailedEmbed = new EmbedBuilder()
            .setColor('DarkRed')
            .setTitle('Kicked')
            .addFields(
                {
                    name: 'Username',
                    value: `${userID}`,
                },
                {
                    name: 'Reason',
                    value: `${reason}`,
                },
                {
                    name: 'DM status',
                    value: `${userID} had there DM's off.`
                }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [kickEmbed] });
        await member.send({ embeds: [kickEmbed] }).catch(err => {
            return interaction.editReply({ embeds: [kickFailedEmbed] })
        })
        await member.kick();



    }
}