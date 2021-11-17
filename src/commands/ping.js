const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const { pingMessages, defaultColor } = require('../../config');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Get my latency'),
	async execute(interaction, client) {
		const msg = await interaction.deferReply({ fetchReply: true });
		const image = new MessageAttachment('./assets/ping.png', 'ping.png');
		const pingMessage = pingMessages[Math.floor(Math.random() * pingMessages.length)];

		const embed = new MessageEmbed()
			.setColor(defaultColor)
			.setThumbnail('attachment://ping.png')
			.setTitle(':ping_pong: Pong!')
			.setDescription(pingMessage)
			.addField('Bot Latency:', `${msg.createdTimestamp - interaction.createdTimestamp} ms.`)
			.addField('Websocket Latency:', `${client.ws.ping} ms.`)
			.setTimestamp();

		await interaction.editReply({ embeds: [embed], files: [image] });
	},
};
