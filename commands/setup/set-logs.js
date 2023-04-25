const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");
const Guild = require('../../models/guild');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-logs')
        .setDescription('Set the channel for guild logs.')
        .addChannelOption(option => option
            .setName('channel')
            .setDescription('Logs to this channel?')
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false })
        const { options } = interaction;

        const channel = await options.getChannel('channel');
        const [guild] = await Guild.findOrCreate({ where: { id: interaction.guild.id } })

        if (!channel) await guild.update({ logChannel: null });
        await guild.update({ logChannel: channel.id })

        if (!channel) interaction.editReply(`Log channel didn't set.`)
        else interaction.editReply(`Bot logging is set too ${channel}`)
    }

}