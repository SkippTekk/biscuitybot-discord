const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')
const Infraction = require('../../models/infraction')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warns the user')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .setDMPermission(false)
        .addUserOption(option => option
            .setName('user')
            .setDescription('User you want to warn')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('reason')
            .setDescription('Reason for the warning of the user')
            .setRequired(false)
            .setMinLength(1)
            .setMaxLength(255)
        ),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false });

        const { options, guild, user, member } = interaction;

        const target = await options.getMember('user');
        let reason = await options.getString('reason');

        if (!reason) reason = 'No reason provided'

        let embed = new EmbedBuilder();

        await Infraction.create({
            userId: target.id,
            guildId: guild.id,
            reason: reason,
            type: 'warn',
            enforcerId: member.id
        }).then(result => {
            embed
                .setColor('Random')
                .setAuthor({ name: target.user.tag, iconURL: target.displayAvatarURL() })
                .setTitle('New Infraction')
                .setDescription(`Issued by ${member.user.tag}`)
                .addFields(
                    {
                        name: 'id:',
                        value: "`" + result.dataValues.id + "`",
                        inline: true,
                    },
                    {
                        name: 'Type:',
                        value: "`" + result.dataValues.type + "`",
                        inline: true,
                    },
                    {
                        name: 'Guild:',
                        value: "`" + guild.name + "`",
                        inline: false,
                    },
                    {
                        name: 'Reason',
                        value: "`" + result.dataValues.reason + "`",
                        inline: true,
                    },
                );
        }).catch(err => {
            console.log(err)
        });
        await interaction.editReply({ embeds: [embed] })
    }
}