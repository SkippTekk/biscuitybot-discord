const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, } = require("discord.js");
const Ticket = require("../../models/ticket");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket-setup")
    .setDescription("Sets up your ticket channel and creation category")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Where you want the welcome messages too?")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("category")
        .setDescription("What category you want the tickets to spawn into")
        .addChannelTypes(ChannelType.GuildCategory)
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("Role for ticket creation pings.")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: false });
    const { options } = interaction;

    const channel = await options.getChannel("channel");
    const category = await options.getChannel("category");
    const role = await options.getRole("role");

    const [ticket] = await Ticket.findOrCreate({
      where: { id: interaction.guild.id },
    });

    if (!channel)
      await ticket.update({
        ticketChannel: null,
        openTicket: null,
        staffId: null,
      });
    await ticket.update({
      ticketChannel: channel.id,
      openTicket: category.id,
      staffId: role.id,
    });

    if (!channel)
      interaction.editReply(`Ticket settings wasn't set. Disabled.`);
    else
      interaction.editReply(
        `Ticket channel is set too ${channel}, and the category is set too ${category}, and your staff inside of tickets is ${role}`
      );
  },
};
