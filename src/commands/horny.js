const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('horny')
		.setDescription('Get your special license for getting allowed to be horny'),
	async execute(interaction) {
		const image = new MessageAttachment(`https://some-random-api.ml/canvas/horny?avatar=${interaction.user.displayAvatarURL({ size: 256, format: 'png' })}`, 'horny_license.png');

		const embed = new MessageEmbed()
			.setColor('EFA490')
			.setDescription('Now you are allowed to be horny af 😏')
			.setImage('attachment://horny_license.png')
			.setTimestamp();

		await interaction.reply({ embeds: [embed], files: [image] });
	},
};