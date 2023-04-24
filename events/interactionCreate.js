const { Collection } = require('discord.js');
const fs = require('fs');
const Guild = require('../models/guild')

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        const dbGuild = await Guild.findOne({ where: { id: interaction.guild.id } });
        if (interaction.isChatInputCommand()) {

            let command = client.commands.get(interaction.commandName);

            try {
                if (interaction.replied) return;
                command.execute(interaction);
            } catch (error) {
                console.log(error);
                interaction.reply({ content: 'Sorry, command isn\'t working yet.', ephemeral: true })
            }
        } else if (interaction.isButton()) {
            if (interaction.customId.includes('verify')) {
                return [interaction.member.roles.add(dbGuild.verifyRole), await interaction.member.roles.remove(dbGuild.defaultRole)]
            }
        }
    }
};

function getCommands(dir) {
    let commands = new Collection();
    const commandFiles = getFiles(dir);

    for (const commandFile of commandFiles) {
        const command = require("." + commandFile);
        commands.set(command.data.toJSON().name, command);
    }
    return commands;
}

function getFiles(dir) {
    const files = fs.readdirSync(dir, {
        withFileTypes: true
    });
    let commandFiles = []

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