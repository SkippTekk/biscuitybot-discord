const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChannelType,
    PermissionsBitField,
} = require("discord.js");
const Ticket = require("../../models/ticket");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("activate-ticket-system")
        .setDescription("Activates the ticket system. USE /ticket-set FIRST please")
        .addChannelOption((option) =>
            option
                .setName("channel")
                .setDescription("Where the ticket create message does.")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),
    async execute(interaction) {
        const dbTicket = await Ticket.findOne({
            where: { id: interaction.guild.id },
        });
        const channel = interaction.options.getChannel("channel");

        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("button")
                .setLabel("Create a Ticket")
                .setStyle(ButtonStyle.Success)
        );
        const ticketEmbed = new EmbedBuilder()
            .setTitle("CreateTicket")
            .setDescription(dbTicket.ticketMessage)
            .setColor("Blue")
            .setTimestamp();

        let sendChannel = channel.send({
            embeds: [ticketEmbed],
            components: [
                new ActionRowBuilder().setComponents(
                    new ButtonBuilder()
                        .setCustomId("createTicket")
                        .setLabel("Create a ticket!")
                        .setStyle(ButtonStyle.Success)
                ),
            ],
        });
        const collector = await interaction.channel.createMessageComponentCollector();
        collector.on("collect", async (i) => {
            await i.deferUpdate({ embeds: [ticketEmbed], components: [button] });
            const channel = await interaction.guild.channels.create({
                name: `ticket-${i.user.tag}`,
                type: ChannelType.GuildText,
                parent: dbTicket.openTicket,
                permissionOverwrites: [
                    {
                        id: i.user.id,
                        allow: [
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.AttachFiles,
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
            });
            if (i.customId === 'close-channel') {
                await i.reply('button works')
            }

            const ticketButton = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("close-channel")
                    .setLabel("Close")
                    .setStyle(ButtonStyle.Danger)
            );
            const ticketCreate = new EmbedBuilder()
                .setTitle(`${interaction.guild.name} Ticket system!`)
                .setColor("Green")
                .setDescription(
                    `Thanks for creating a ticket ${i.user}, someone will get to you as soon as they can!`
                );

            channel.send({ embeds: [ticketCreate], components: [ticketButton] });

            channel
                .send({
                    content: `<@&${dbTicket.staffId}>`,
                })
                .then((r) => r.delete());
            channel
                .send({
                    content: `<@${i.user.id}>`,
                })
                .then((r) => r.delete());
        });

        if (!sendChannel) {
            return interaction.reply({ content: "Where was an error..." });
        } else {
            return interaction.reply({ content: "Channel was set!" });
        }
    },
};
