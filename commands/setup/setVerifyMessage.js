const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const Guild = require('../../models/guild');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-verify-message')
        .setDescription('Set the message for verify box')
        .addStringOption(option => option
            .setName('message')
            .setDescription('Type your message here, MAX is 255 char')
            .setRequired(false)
            .setMinLength(1)
            .setMaxLength(255)
        )
        .addRoleOption(option =>
            option
                .setName('role')
                .setDescription('Please create the role before running this! Otherwise select the role!')
        )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false })
        const { options } = interaction;

        const [guild] = await Guild.findOrCreate({ where: { id: interaction.guild.id } })
        const message = await options.getString('message') ?? guild.verifyRoleMessage;
        const role = await options.getRole('role')

        if (!message) await guild.update({ verifyRoleMessage: null, verifyRole: null });
        await guild.update({ verifyRoleMessage: message.id, verifyRole: role.id })

        if (!message) interaction.editReply(`Verify message wasn't changed.`)
        else interaction.editReply(`Verify message has been changed too \`\`\`${message}\`\`\` with the ${role}`)
    }

};