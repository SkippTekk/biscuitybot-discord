const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Guild = require('../../models/guild');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-default-role')
        .setDescription('Default role for new users')
        .addRoleOption((option) =>
            option
                .setName('role')
                .setDescription('assign this role as your default')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false })
        const { options } = interaction;

        const channel = await options.getRole('role');
        const [guild] = await Guild.findOrCreate({ where: { id: interaction.guild.id } })

        if (!channel) await guild.update({ defaultRole: null });
        await guild.update({ defaultRole: channel.id })

        if (!channel) interaction.editReply(`Default role wasn't set.`)
        else interaction.editReply(`Your new default role is ${channel}`)
    }

}