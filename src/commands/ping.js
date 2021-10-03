const { SlashCommandBuilder } = require('@discordjs/builders');
const client = require('../index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Get my latency.'),
	async execute(interaction) {
		return interaction.reply(`:ping_pong: Pong! (${client.ws.ping}ms.)`);
	},
};