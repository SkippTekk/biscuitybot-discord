const { SlashCommandBuilder, PermissionsBitField, ChannelType } = require("discord.js");
const Guild = require('../../models/guild');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-welcome-channel')
        .setDescription('Welcome channel to be set for your discord.')
        .addChannelOption(option => option
            .setName('channel')
            .setDescription('Where you want the welcome messages too?')
            .addChannelTypes(ChannelType.GuildText)
        )
        .addRoleOption(option =>
            option
                .setName('role')
                .setDescription('This is the role you wish for them to get!')
        )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false })
        const { options } = interaction;

        const [guild] = await Guild.findOrCreate({ where: { id: interaction.guild.id } })
        const channel = await options.getChannel('channel');
        const role = await options.getRole('role')

        if (!channel) await guild.update({ welcomeChannelId: null, defaultRole: null });
        await guild.update({ welcomeChannelId: channel.id, defaultRole: role.id })

        if (!channel) interaction.editReply(`Welcome channel isn't set. Disabled.`)
        else interaction.editReply(`Welcoming new humans in ${channel} with ${role} as the default role!`)
    }

}