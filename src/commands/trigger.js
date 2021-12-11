const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const { defaultColor } = require('../../config');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('trigger')
		.setDescription('"Trigger" an user or yourself')
		.addUserOption(option => option.setName('user').setDescription('The user to trigger')),
	async execute(interaction) {
		const user = interaction.options.getUser('user') ? interaction.options.getUser('user') : interaction.user;
		const image = new MessageAttachment(`https://some-random-api.ml/canvas/triggered?avatar=${user.displayAvatarURL({ size: 256, format: 'png' })}`, 'triggered.gif');

		const embed = new MessageEmbed()
			.setColor(defaultColor)
			.setDescription(`**${user.username}** has been triggered!`)
			.setImage('attachment://triggered.gif')
			.setTimestamp();

		await interaction.reply({ embeds: [embed], files: [image] });
	},
};