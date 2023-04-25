const Guild = require('../models/guild');
module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        console.log('member joined')
        const dbGuild = await Guild.findOne({ where: { id: member.guild.id } });
        await member.roles.add(dbGuild.defaultRole);

        if (dbGuild.welcomeChannelId) {
            const welcomeChannelId = await member.guild.channels.fetch(dbGuild.welcomeChannelId);
            welcomeChannelId.send(`Welcome to the server ${member.user}, Be sure to check the rules and follow them!`)
        }
    }
}