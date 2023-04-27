const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Lets you know what you can do with the bot!.'),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setTitle('Biscuitybot Help command center')
            .setColor('Random')
            .setDescription('What regular users can use!')
            .addFields(
                {
                    name: 'Members',
                    value: 'Lets regular users know what commands they can use.'
                },
                {
                    name: 'Moderation',
                    value: 'Users with Admin can use these commands'
                },
                {
                    name: 'Bot Setup',
                    value: 'Gives you instructions on how to setup the bot you want!'
                },
                {
                    name: 'What does * mean?',
                    value: 'Box\'s with * are beta and work in progress'
                }
            )
            .setTimestamp()

        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('page1')
                    .setLabel('Members')
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setCustomId('page2')
                    .setLabel('Moderation')
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setCustomId('page3')
                    .setLabel('Bot Setup')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('page4')
                    .setLabel('Ticket Setup *')
                    .setStyle(ButtonStyle.Success)
            )

        await interaction.reply({ embeds: [embed], components: [button], ephemeral: true });


    }

}