const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Guild = require('../../models/guild');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-verify-role')
        .setDescription('Default role for new users')
        .addRoleOption((option) =>
            option
                .setName('role')
                .setDescription('Please create the role before running this! Otherwise select the role!')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false })
        const { options } = interaction;

        const channel = await options.getRole('role');
        const [guild] = await Guild.findOrCreate({ where: { id: interaction.guild.id } })

        if (!channel) await guild.update({ verifyRole: null });
        await guild.update({ verifyRole: channel.id })

        if (!channel) interaction.editReply(`Verify role wasn't set.`)
        else interaction.editReply(`Verify role is ${channel}`)
    }

}