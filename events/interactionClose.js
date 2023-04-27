const { EmbedBuilder } = require('@discordjs/builders');
const discordTranscripts = require('discord-html-transcripts');
module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        if (interaction.isButton()) {
            if (interaction.customId.includes('close')) {


                const closeSuccess = new EmbedBuilder()
                    .setTitle('Ticket transcript')
                    .addFields(
                        {
                            name: 'Username',
                            value: `${interaction.user.tag}`,
                        },
                        {
                            name: 'Message',
                            value: `Thanks for creating a ticket with us! Here is your transcript`,
                        }
                    )
                    .setFooter({ text: 'BiscuityBot Ticket System' })
                    .setTimestamp();

                // or (if using typescript) import * as discordTranscripts from 'discord-html-transcripts';

                const channel = interaction.message.channel; // or however you get your TextChannel

                // Must be awaited
                const attachment = await discordTranscripts.createTranscript(channel);

                await interaction.member.send({ embeds: [closeSuccess], files: [attachment] }, interaction.channel.delete()).catch(err => {
                    return interaction.reply({ content: `Sorry <@${interaction.user.id}>, we couldn't send you a DM with your transcript, Please enable your DM and press the Close button again!` })
                })

            }

        }

    }
}
