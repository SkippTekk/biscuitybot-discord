require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord.js')


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

let commands = [];
const commandFile = getFiles('./commands');

for (const file of commandFile) {
    const command = require(file)
    commands.push(command.data.toJSON())
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
    .then(() => console.log('Commands sent and refreshed.'))
    .catch(console.error)