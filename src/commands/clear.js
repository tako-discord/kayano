const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

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
					interaction.reply({ content: `🧹 Cleared ${messages.size} message(s) from ${target}!` });
					setTimeout(function() {
						interaction.deleteReply();
					}, 5000);
				});
			}
			else {
				await channel.bulkDelete(amount, true).then(messages => {
					interaction.reply({ content: `🧹 Cleared ${messages.size} message(s) from this channel!` });
					setTimeout(function() {
						interaction.deleteReply();
					}, 5000);
				});
			}
		}
		else {
			return interaction.reply({ content: 'You don\'t have the permission to use that command!', ephemeral: true });
		}
	},
};
