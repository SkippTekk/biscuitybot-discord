const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clears regular and targeted messages')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option => option
            .setName('amount')
            .setDescription('Number of messages to clean')
            .setRequired(true)
        )
        .addUserOption(option => option
            .setName('target')
            .setDescription('Target spacific user messages')
            .setRequired(false)
        ),

    async execute(interaction) {
        const [channel, options] = interaction;

        const amount = options.getInteger('amount')
        const target = options.getUser('target')

        const messages = await channel.messages.fetch({
            limit: amount + 1,
        });

        const res = new EmbedBuilder()
            .setColor('Gold')

        if (target) {
            let i = 0
            const filtered = [];

            (await messages).filter((msg) => {
                if (msg.author.id === target.id && amount > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered).then(messages => {
                res.setDescription(`I have removed ${messages.size} messages from ${target}`);
                interaction.reply({ embeds: [res] });
            })
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                res.setDescription(`I have removed ${messages.size} messages.`);
                interaction.reply({ embeds: [res] })
            })
        }
    }
}