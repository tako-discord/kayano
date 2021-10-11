const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Select a member and ban them).')
		.addUserOption(option => option.setName('target').setDescription('The member to ban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason you ban the member')),
        async execute(interaction) {
            if (!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
                return interaction.reply({ content: 'You don\'t have the permission to run this command!', ephemeral: true });
            } else {
                const target = interaction.options.getMember('target');
                const reason = interaction.options.getString('reason');
                
                target.ban(reason)
                return interaction.reply({ content: `Banned: *${target.user.tag} (${target.user.id})*`, ephemeral: true });
        }
	},
};
