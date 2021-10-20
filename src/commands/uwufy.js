const { SlashCommandBuilder } = require('@discordjs/builders');
const Uwuifier = require('uwuifier');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('uwufy')
		.setDescription('uwufy any word/sentence')
		.addStringOption(option => option.setName('text').setDescription('The text you want to uwufy').setRequired(true)),
	async execute(interaction) {
		const text = interaction.options.getString('text');
		const myUwuifier = new Uwuifier({
			spaces: {
				faces: 0,
				actions: 0,
				stutters: 0.2,
			},
		});

		interaction.reply({ content: myUwuifier.uwuifySentence(text) });
	},
};