const Guild = require('../models/guild')
module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        const dbGuild = await Guild.findOne({ where: { id: interaction.guild.id } });
        if (interaction.isButton()) {
            if (interaction.customId.includes('verify')) {
                return interaction.reply({ content: 'Thanks for accepting the Rules!', ephemeral: true }, interaction.member.roles.add(dbGuild.verifyRole), interaction.member.roles.remove(dbGuild.defaultRole))
            }

        }

    }
}
