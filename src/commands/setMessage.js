const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const { defaultColor } = require('../../config');
const { supabase } = require('../supabase');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set-message')
		.setDescription('Send a message to all servers')
		.addStringOption(option => option.setName('title').setDescription('The title of the message').setRequired(true))
		.addStringOption(option => option.setName('message').setDescription('The message to send').setRequired(true))
		.setDefaultPermission(false),
	async execute(interaction) {
		const title = interaction.options.getString('title');
		const message = interaction.options.getString('message');
		const image = new MessageAttachment('./assets/announcement.png', 'announcement.png');

		const { data } = await supabase
			.from('messages');

		const embed = new MessageEmbed()
			.setColor(defaultColor)
			.setThumbnail('attachment://announcement.png')
			.setTitle(title)
			.setDescription(message)
			.setTimestamp();

		await supabase
			.from('messages')
			.insert([{ message_id: `${data.length + 1}`, title: `${title}`, message: `${message}` }]);

		await interaction.reply({ content: 'Message set! Here is how it looks like:', embeds: [embed], files: [image], ephemeral: true });
	},
};
