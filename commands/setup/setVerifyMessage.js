const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Guild = require('../../models/guild');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-verify-message')
        .setDescription('Set the message for verify box')
        .addStringOption(option => option
            .setName('message')
            .setDescription('Type your message here, MAX is 255 char')
            .setRequired(false)
            .setMinLength(1)
            .setMaxLength(255)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false })
        const { options } = interaction;

        const channel = await options.getString('message');
        const [guild] = await Guild.findOrCreate({ where: { id: interaction.guild.id } })

        if (!channel) await guild.update({ verifyRoleMessage: null });
        await guild.update({ verifyRoleMessage: channel.id })

        if (!channel) interaction.editReply(`Verify message wasn't changed.`)
        else interaction.editReply(`Very message has been changed too \`\`\`${channel}\`\`\``)
    }

};