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
                }
            )
            .setTimestamp()

        const userEmbed = new EmbedBuilder()
            .setTitle('User Commands')
            .setColor('Random')
            .setDescription('What regular users can use!')
            .addFields(
                {
                    name: 'bot-information',
                    value: 'Gives information about the bot, like Ram, guilds, users etc'
                },
                {
                    name: 'Ping',
                    value: 'Gives the bots latency and command reply'
                },
                {
                    name: 'server-info',
                    value: 'Shows data about the guild this command is ran in.'
                },
                {
                    name: 'user-info',
                    value: 'Gives basic data of a user that was selected during the command process.'
                }
            )
            .setTimestamp()


        const moderationEmbed = new EmbedBuilder()
            .setTitle('Moderation Commands')
            .setColor('DarkRed')
            .setDescription('What people with Admin permission can run')
            .addFields(
                {
                    name: 'Ban',
                    value: 'Bans the selected user from your Guild'
                },
                {
                    name: 'kick',
                    value: 'Kicks the user from your guild.'
                },
                {
                    name: 'warn',
                    value: 'Warns the user you have targeted. This is kept on database, but nothing too fancy with it yet.'
                },
                {
                    name: 'Unban',
                    value: 'Unbanns the user, BUT you need to use the ID of the person.'
                }
            )
            .setTimestamp()


        const setupEmbed = new EmbedBuilder()
            .setTitle('Setup Commands')
            .setColor('Greyple')
            .setDescription('Helps you setup the bot')
            .addFields(
                {
                    name: '1) set-default-role',
                    value: 'Please create the role before running this command, otherwise you won\'t see it in your list'
                },
                {
                    name: '2) set-welcome-channel',
                    value: 'Sets the welcome channel you want the bot to mention them.'
                },
                {
                    name: '3) set-verify-message',
                    value: 'Sets the message, otherwise the default is \n **Clicking the button states you follow the rules set in this Guild.** \n Remember, this is 255 characters MAX'
                },
                {
                    name: '4) set-verify-role',
                    value: 'Please create the role before running this command IF you want to use the basic verify method! \n Otherwise you can set the role you want the member to use to access the discord'
                },
                {
                    name: '5) activate-verify',
                    value: 'Sets the channel you wish people to verify with your guild before actually joining it.'
                },
                {
                    name: '6) set-logs',
                    value: 'This doesn\'t work properly, you CAN set the channel. BUT logs won\'t be in it yet.'
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
                    .setStyle(ButtonStyle.Success)
            )

        const message = await interaction.reply({ embeds: [embed], components: [button] });
        const collector = await message.createMessageComponentCollector();

        collector.on('collect', async i => {

            if (i.customId === 'page1') {
                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Sorry, only the user that ran the command can interact.`, ephemeral: true })
                }
                await i.update({ embeds: [userEmbed], components: [button] })
            }

            if (i.customId === 'page2') {
                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Sorry, only the user that ran the command can interact.`, ephemeral: true })
                }
                await i.update({ embeds: [moderationEmbed], components: [button] })
            }

            if (i.customId === 'page3') {
                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Sorry, only the user that ran the command can interact.`, ephemeral: true })
                }
                await i.update({ embeds: [setupEmbed], components: [button] })
            }
        })
    }

}