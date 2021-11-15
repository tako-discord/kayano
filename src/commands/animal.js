const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const { defaultColor } = require('../../config');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('animal')
		.setDescription('Get a random image and fact about a certain animal')
		.addStringOption(option =>
			option.setName('animal')
				.setDescription('The animal you want the picture and fact from')
				.setRequired(true)
				.addChoice('Dog', 'dog')
				.addChoice('Cat', 'cat')
				.addChoice('Panda', 'panda')
				.addChoice('Fox', 'fox')
				.addChoice('Red panda', 'red_panda')
				.addChoice('Koala', 'koala')
				.addChoice('Bird', 'bird')
				.addChoice('Raccoon', 'raccoon')
				.addChoice('Kangaroo', 'kangaroo')),
	async execute(interaction) {
		const animalOption = interaction.options.getString('animal');
		const animal = ((animalOption == 'red_panda') ? 'red panda' : animalOption);
		const animalEmoji = ((animal == 'red panda') ? 'red_circle: :panda_face' : animal);
		const data = await fetch(`https://some-random-api.ml/animal/${animalOption}`).then(res => res.json());
		const image = new MessageAttachment('./assets/nature.png', 'nature.png');

		const embed = new MessageEmbed()
			.setColor(defaultColor)
			.setThumbnail('attachment://nature.png')
			.setDescription(`:${((animal == 'panda' ? 'panda_face' : animalEmoji))}: Here is a random image and fact of a ${animal}`)
			.addField('Fact:', data.fact)
			.addField('Image:', '\u200b')
			.setImage(data.image)
			.setTimestamp();

		await interaction.reply({ embeds: [embed], files: [image] });
	},
};