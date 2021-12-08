const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const { noPermissionText } = require('../../config');
const { language } = require('../languages');

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
				return await interaction.reply({ content: language(interaction.guild, 'MORE_THAN_100'), ephemeral: true });
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


				// eslint-disable-next-line no-unused-vars
				await channel.bulkDelete(filtered, true).then(messages => {
					const msg = eval('`' + language(interaction.guild, 'CLEARED_FROM_USER') + '`');

					interaction.reply({ content: '🧹' + msg });
					setTimeout(function() {
						interaction.deleteReply();
					}, 5000);
				});
			}
			else {
				// eslint-disable-next-line no-unused-vars
				await channel.bulkDelete(amount, true).then(messages => {
					const msg = eval('`' + language(interaction.guild, 'CLEARED_NORMAL') + '`');

					interaction.reply({ content: '🧹' + msg });
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
