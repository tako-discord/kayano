const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
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
			.setDescription('You can click the button below to vote for me.');

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setURL(voteLink)
					.setEmoji('👍')
					.setLabel('Vote')
					.setStyle('LINK'),
			);

		await interaction.reply({ embeds: [embed], files: [image], components: [row] });
	},
};