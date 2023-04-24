require('dotenv').config();
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');

class CommandProcessor {
  constructor(client) {
    return this.main(client);
  }

  async main(client) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    client.commands = new Collection();
    let commandFiles = [];

    for (const file of files) {
        if (file.isDirectory()) commandFiles = [ ...commandFiles, ...getFiles(`${dir}/${file.name}`), ];
        else if (file.name.endsWith('.js')) commandFiles.push(`${dir}/${file.name}`);
    }

    let commands = [];
    const commandFiles = getFiles('./commands');

    for (const file of commandFiles) {
        const command = require(file);
        commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command);
    }

    const rest = new REST({ version: '10'}).setToken(process.env.TOKEN);

    rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands})
    .then(() => console.log(`Commands are sent and recieved.`))
    .catch(console.error);
      
    return client.commands;  
  }

}

module.exports = CommandProcessor;
