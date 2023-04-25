const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const Guild = require('../../models/guild');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('activate-verify')
        .setDescription('Activates the verify AFTER you use /set-verify')
        .addChannelOption((option) =>
            option
                .setName('channel')
                .setDescription('what channel you want the verification process to be in?')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),
    async execute(interaction) {
        const dbGuild = await Guild.findOne({ where: { id: interaction.guild.id } });
        const channel = interaction.options.getChannel('channel');

        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('verify')
                    .setLabel('verify')
                    .setStyle(ButtonStyle.Success),
            )
        const verifyEmbed = new EmbedBuilder()
            .setTitle('Verficiation')
            .setDescription(dbGuild.verifyRoleMessage)
            .setColor('Blue')

        let sendChannel = channel.send({
            embeds: ([verifyEmbed]),
            components: [
                new ActionRowBuilder().setComponents(
                    new ButtonBuilder().setCustomId('verify')
                        .setLabel('Verify')
                        .setStyle(ButtonStyle.Success),
                ),
            ],
        });
        const collector = await interaction.channel.createMessageComponentCollector()
        collector.on('collect', async i => {
            if (i.customId == 'verify') {
                return interaction.reply({ content: 'test message', ephemeral: true })
            }
            await i.update({ embeds: [verifyEmbed], components: [button] })
            const member = i.member;
            await member.roles.add(dbGuild.verifyRole);
            await member.roles.remove(dbGuild.defaultRole);

        })
        if (!sendChannel) {
            return interaction.reply({ content: 'Where was an error...' })
        } else {
            return interaction.reply({ content: 'Channel was set!' })
        };
    },
};