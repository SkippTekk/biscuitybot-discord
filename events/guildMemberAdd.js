const Guild = require('../models/guild');
module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const dbGuild = await Guild.findOne({ where: { id: member.guild.id } });
        await member.roles.add(dbGuild.defaultRole);
        const channel = await member.guild.channels.fetch(dbGuild.logChannel)
        channel.send(`:regional_indicator_m: New member has joined! ${member.user}`)

        if (dbGuild.welcomeChannelId) {
            const welcomeChannelId = await member.guild.channels.fetch(dbGuild.welcomeChannelId);
            welcomeChannelId.send(`Welcome to the server ${member.user}, Be sure to check the rules and follow them!`)
        } else if (dbGuild.welcomeChannelId === null) {
            return;
        }
    }
}