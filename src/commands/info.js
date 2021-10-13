const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Get info about a user or a server!'),
	async execute(interaction) {
		await interaction.reply({ content: 'soon™️' });
	},
};
