const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");
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
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false })
        const { options } = interaction;

        const channel = await options.getChannel('channel');
        const [guild] = await Guild.findOrCreate({ where: { id: interaction.guild.id } })

        if (!channel) await guild.update({ welcomeChannelId: null });
        await guild.update({ welcomeChannelId: channel.id })

        if (!channel) interaction.editReply(`Welcome channel isn't set. Disabled.`)
        else interaction.editReply(`Welcoming new humans in ${channel}`)
    }

}