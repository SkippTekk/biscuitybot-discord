const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Gives information about the targeted user')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The user you want information from')
                .setRequired(true)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser('target');
        const member = interaction.options.getMember('target')

        const pingEmbed = new EmbedBuilder()
            .setColor('Blurple')
            .setTitle('User Data details')
            .addFields(
                {
                    name: 'Targeted person',
                    value: `${user}`,
                    inline: true
                },
                {
                    name: 'User ID',
                    value: `${user.id}`,
                    inline: true
                },
                {
                    name: 'User Roles',
                    value: `${member.roles.cache.sort((a, b) => b.position - a.position).map(role => role)}`,
                    inline: false,
                },
                {
                    name: 'Joined this Guild',
                    value: `<t:${parseInt(member.joinedTimestamp / 1000)}:D>`,
                    inline: false
                }
            )
            .setTimestamp();


        await interaction.reply(
            {
                embeds: [pingEmbed],
                ephemeral: false
            }
        )
    }

}