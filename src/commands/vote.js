const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const { defaultColor, voteLink } = require('../../config');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vote')
		.setDescription('Get the link to vote for me'),
	async execute(interaction) {
		const image = new MessageAttachment('./assets/thumbsUp.png', 'vote.png');

		const embed = new MessageEmbed()
			.setColor(defaultColor)
			.setThumbnail('attachment://vote.png')
			.setTitle('Vote for me!')
			.setDescription(`You can vote for me here: ${voteLink}`);

		await interaction.reply({ embeds: [embed], files: [image] });
	},
};