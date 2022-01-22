const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const { noPermissionText } = require('../../config');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Delete a specific amount of messages')
		.addNumberOption(option => option.setName('amount').setDescription('The amount of messages you wanna delete').setRequired(true))
		.addUserOption(option => option.setName('target').setDescription('The user the messages should get deleted from')),
	async execute(interaction) {
		if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
			const amount = interaction.options.getNumber('amount');
			const target = interaction.options.getMember('target');
			const channel = interaction.channel;

			if (amount > 100) {
				return await interaction.reply({ content: 'You cannot delete more than 100 messages at a time!', ephemeral: true });
			}

			if (target) {
				let i = 0;
				const filtered = [];

				(await channel.messages.fetch()).filter((m) => {
					if (m.author.id == target.id && amount > i) {
						filtered.push(m);
						i++;
					}
				});

				await channel.bulkDelete(filtered, true).then(messages => {
					interaction.reply({ content: `🧹 Cleared ${messages.size} message(s) from ${target.tag} in <#${channel.id}>` });
					setTimeout(function() {
						interaction.deleteReply();
					}, 5000);
				});
			}
			else {
				await channel.bulkDelete(amount, true).then(messages => {
					interaction.reply({ content: `🧹 Cleared ${messages.size} message(s) in <#${channel.id}>` });
					setTimeout(function() {
						interaction.deleteReply();
					}, 5000);
				});
			}
		}
		else {
			return await interaction.reply({ content: noPermissionText, ephemeral: true });
		}
	},
};
