const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionsBitField, } = require("discord.js");
const Ticket = require("../../models/ticket");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("activate-ticket-system")
        .setDescription("Activates the ticket system. USE /ticket-set FIRST please")
        .addChannelOption(option =>
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

        const ticketEmbed = new EmbedBuilder()
            .setTitle("CreateTicket")
            .setDescription(dbTicket.ticketMessage)
            .setColor("Blue")
            .setTimestamp();

        let sendChannel = channel.send({
            embeds: [ticketEmbed],
            components: [
                new ActionRowBuilder()
                    .setComponents(
                        new ButtonBuilder()
                            .setCustomId("createTicket")
                            .setLabel("Create a ticket!")
                            .setStyle(ButtonStyle.Success)
                    ),
            ],
        });

        if (!sendChannel) {
            return interaction.reply({ content: "Where was an error..." });
        } else {
            return interaction.reply({ content: "Channel was set!" });
        }
    },
};
