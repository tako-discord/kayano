const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const { defaultColor } = require('../../config');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lyrics')
		.setDescription('Search up for the lyrics of a song')
		.addStringOption(option => option.setName('query').setDescription('What song you want the lyrics from').setRequired(true))
		.addBooleanOption(option => option.setName('cancer').setDescription('Nyevew gonnya give you up. Nyevew gonnya wet you down. Nyevew gonnya wun awound and desewt you.')),
	async execute(interaction) {
		const query = interaction.options.getString('query');
		const cancer = ((interaction.options.getBoolean('cancer')) ? true : false);
		const data = await fetch(`https://some-random-api.ml/lyrics?title=${query}&cancer=${cancer}`).then(res => res.json());
		const image = new MessageAttachment('./assets/microphone.png', 'microphone.png');

		if (data.error) {
			return await interaction.reply({ content: data.error, ephemeral: true });
		}

		const embed = new MessageEmbed()
			.setColor(defaultColor)
			.setThumbnail('attachment://microphone.png')
			.setDescription(`🎤 Results for \`${query}\`\n\n**Title:**\n${data.title}\n**Artist:**\n${data.author}\n**Source:**\n${data.links.genius}\n**Lyrics:**\n${data.lyrics}`)
			.setImage(data.thumbnail.genius)
			.setTimestamp();

		const errorEmbed = new MessageEmbed()
			.setColor(defaultColor)
			.setThumbnail('attachment://microphone.png')
			.setDescription(`🎤 Results for \`${query}\`\n\n**Title:**\n${data.title}\n**Artist:**\n${data.author}\n**Source:**\n${data.links.genius}\n**Lyrics:**\nOopsie...the lyrics are too long. Please use this link instead: ${data.links.genius}`)
			.setImage(data.thumbnail.genius)
			.setTimestamp();

		// eslint-disable-next-line no-unused-vars
		await interaction.reply({ embeds: [embed], files: [image], ephemeral: true }).catch(error => {interaction.reply({ embeds: [errorEmbed], files: [image], ephemeral: true });});
	},
};
