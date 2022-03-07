const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const { defaultColor } = require('../../config');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('ECHO...ECHo...ECho...Echo...echo')
		.addStringOption(option => option.setName('message').setDescription('The message the bot should send.').setRequired(true)),
	async execute(interaction) {
		const msg = interaction.options.getString('message');
		const image = new MessageAttachment('./assets/echo.png', 'echo.png');

		const embed = new MessageEmbed()
			.setColor(defaultColor)
			.setThumbnail('attachment://echo.png')
			.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ dynamic: true }) })
			.setTitle('Echo')
			.setDescription(msg)
			.setTimestamp();

		await interaction.reply({ embeds: [embed], files: [image] });
	},
};
