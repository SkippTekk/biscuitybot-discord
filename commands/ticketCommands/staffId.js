const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Ticket = require('../../models/ticket');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket-staff')
        .setDescription('Staff role you want to get pinged upon ticket creation')
        .addRoleOption(option =>
            option
                .setName('role')
                .setDescription('assign this role as your Staff Role')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false })
        const { options } = interaction;

        const channel = await options.getRole('role');
        const [ticket] = await Ticket.findOrCreate({ where: { id: interaction.guild.id } })

        if (!channel) await ticket.update({ staffId: null });
        await ticket.update({ staffId: channel.id })

        if (!channel) interaction.editReply(`Staff role wasn't set.`)
        else interaction.editReply(`Staff role is set too ${channel}`)
    }

}