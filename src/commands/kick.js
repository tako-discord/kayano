const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Select a member and kick them).')
		.addUserOption(option => option.setName('target').setDescription('The member to kick').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('The reason you kick the member')),
	async execute(interaction) {
		if (!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
			return interaction.reply({ content: 'You don\'t have the permission to run this command!', ephemeral: true });
		}
		else {
			const target = interaction.options.getMember('target');
			const reason = interaction.options.getString('reason');

			target.kick(reason);
			return interaction.reply({ content: `Kicked: *${target.user.tag} (${target.user.id})*`, ephemeral: true });
		}
	},
};
