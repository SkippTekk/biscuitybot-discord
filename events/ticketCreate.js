const { ChannelType, PermissionsBitField, ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require('discord.js');

const Ticket = require('../models/ticket')

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {


        const dbTicket = await Ticket.findOne({ where: { id: interaction.guild.id } });
        const ticketButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("close-channel")
                    .setLabel("Close")
                    .setStyle(ButtonStyle.Danger)
            );
        const ticketCreate = new EmbedBuilder()
            .setTitle(`${interaction.guild.name} Ticket system!`)
            .setColor("Green")
            .setDescription(
                `Thanks for creating a ticket ${interaction.user.tag}, someone will get to you as soon as they can!`
            );
        if (interaction.isButton()) {
            if (interaction.customId.includes('createTicket')) {
                return interaction.reply({ content: 'Ticket being created. Please hold.', ephemeral: true },
                    [
                        interaction.guild.channels.create({
                            name: `ticket-${interaction.user.tag}`,
                            type: ChannelType.GuildText,
                            parent: dbTicket.openTicket,
                            permissionOverwrites: [
                                {
                                    id: interaction.user.id,
                                    allow: [
                                        PermissionsBitField.Flags.ViewChannel,
                                        PermissionsBitField.Flags.SendMessages,
                                        PermissionsBitField.Flags.AttachFiles,
                                        PermissionsBitField.Flags.ReadMessageHistory,
                                    ],
                                },
                                {
                                    id: interaction.guild.id,
                                    deny: [PermissionsBitField.Flags.ViewChannel],
                                },
                                {
                                    id: dbTicket.staffId,
                                    allow: [
                                        PermissionsBitField.Flags.ViewChannel,
                                        PermissionsBitField.Flags.SendMessages,
                                        PermissionsBitField.Flags.ManageChannels,
                                    ],
                                },
                            ],
                        }).then(channel => { channel.send({ embeds: [ticketCreate], components: [ticketButton] }), channel.send({ content: `<@&${dbTicket.staffId}> <@${interaction.user.id}>` }).then((r) => r.delete()) })
                    ])
            } else if (interaction.customId.includes('close')) {
                return interaction.channel.delete()
            }
        }

    }
}