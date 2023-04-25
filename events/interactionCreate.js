const { Client, GatewayIntentBits, Collection, ChannelType, PermissionsBitField, ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require('discord.js');
const fs = require('node:fs');

const Guild = require('../models/guild');
const Ticket = require('../models/ticket')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

client.commands = getCommands('./commands');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        const dbGuild = await Guild.findOne({ where: { id: interaction.guild.id } });
        const dbTicket = await Ticket.findOne({ where: { id: interaction.guild.id } });
        const ticketButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("close-channel")
                    .setLabel("Close")
                    .setStyle(ButtonStyle.Danger)
            );
        const ticketCreate = new EmbedBuilder()
            .setTitle(`${interaction.guild.name} Ticket system!`)
            .setColor("Green")
            .setDescription(
                `Thanks for creating a ticket ${interaction.user.tag}, someone will get to you as soon as they can!`
            );

        if (interaction.isChatInputCommand()) {
            let command = client.commands.get(interaction.commandName)
            if (!command) {
                console.log('No command found')
                return;
            }
            try {
                await command.execute(interaction)
            } catch (error) {
                console.log(`failed ${interaction.commandName}`)
            }
        } else if (interaction.isButton()) {
            if (interaction.customId.includes('verify')) {
                return interaction.reply({ content: 'Thanks for accepting the Rules!', ephemeral: true }, [interaction.member.roles.add(dbGuild.verifyRole), await interaction.member.roles.remove(dbGuild.defaultRole)])
            } else if (interaction.customId.includes('createTicket')) {
                return interaction.reply({ content: 'Ticket being created. Please hold.', ephemeral: true },
                    [
                        interaction.guild.channels.create({
                            name: `ticket-${interaction.user.tag}`,
                            type: ChannelType.GuildText,
                            parent: dbTicket.openTicket,
                            permissionOverwrites: [
                                {
                                    id: interaction.user.id,
                                    allow: [
                                        PermissionsBitField.Flags.ViewChannel,
                                        PermissionsBitField.Flags.SendMessages,
                                        PermissionsBitField.Flags.AttachFiles,
                                        PermissionsBitField.Flags.ReadMessageHistory,
                                    ],
                                },
                                {
                                    id: interaction.guild.id,
                                    deny: [PermissionsBitField.Flags.ViewChannel],
                                },
                                {
                                    id: dbTicket.staffId,
                                    allow: [
                                        PermissionsBitField.Flags.ViewChannel,
                                        PermissionsBitField.Flags.SendMessages,
                                        PermissionsBitField.Flags.ManageChannels,
                                    ],
                                },
                            ],
                        }).then(channel => { channel.send({ embeds: [ticketCreate], components: [ticketButton] }), channel.send({ content: `<@&${dbTicket.staffId}> <@${interaction.user.id}>` }).then((r) => r.delete()) })
                    ])
            } else if (interaction.customId.includes('close')) {
                return interaction.channel.delete()
            }

        }
    }
};

function getCommands(dir) {
    let commands = new Collection();
    const commandFiles = getFiles(dir)

    for (const commandFile of commandFiles) {
        const command = require("." + commandFile);
        commands.set(command.data.toJSON().name, command);
    }
    return commands;
};

function getFiles(dir) {
    const files = fs.readdirSync(dir, {
        withFileTypes: true
    });
    let commandFiles = [];

    for (const file of files) {
        if (file.isDirectory()) {
            commandFiles = [
                ...commandFiles,
                ...getFiles(`${dir}/${file.name}`),
            ]
        } else if (file.name.endsWith('.js')) {
            commandFiles.push(`${dir}/${file.name}`);
        }
    }
    return commandFiles;
};