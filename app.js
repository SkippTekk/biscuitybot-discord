require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages]

});
const path = require('path');

process.on('uncaughtException', (error, source) => {
    console.log(error);

    client.channels.cache.get(process.env.BOT_LOGS).send("**Bot break report**: \n \`\`\`javascript \n" + error + "\`\`\`\n\`\`\`" + source + "\`\`\`")
});



const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file)
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
};

client.login(process.env.TOKEN);