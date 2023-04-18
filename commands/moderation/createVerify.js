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
    async execute(interaction, member) {
        const channel = interaction.options.getChannel('channel');

        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('button')
                    .setLabel('verify')
                    .setStyle(ButtonStyle.Success),
            )
        const verifyEmbded = new EmbedBuilder()
            .setTitle('Verficiation')
            .setDescription('Clicking the button states you follow the rules set in this Guild.')
            .setColor('Blue')

        let sendChannel = channel.send({
            embeds: ([verifyEmbded]),
            components: [
                new ActionRowBuilder().setComponents(
                    new ButtonBuilder().setCustomId('verify').setLabel('Verify').setStyle(ButtonStyle.Success),
                ),
            ],
        });
        const collector = await interaction.channel.createMessageComponentCollector()
        collector.on('collect', async i => {
            await i.update({ embeds: [verifyEmbded], components: [button] })
            const dbGuild = await Guild.findOne({ where: { id: interaction.guild.id } });
            const member = i.member;
            await member.roles.add(dbGuild.verifyRole);

        })
        if (!sendChannel) {
            return interaction.reply({ content: 'Where was an error...' })
        } else {
            return interaction.reply({ content: 'Channel was set!' })
        };
    },
};