const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');
const { noPermissionText, defaultColor } = require('../../config');
const { supabase } = require('../supabase');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sticky')
		.setDescription('Set a "sticky" message for the current channel which will always stay at the bottom of the channel')
		.addStringOption(option => option.setName('title').setDescription('The title of the message').setRequired(true))
		.addStringOption(option => option.setName('message').setDescription('The message to be sticky').setRequired(true))
		.addBooleanOption(option => option.setName('embed').setDescription('Whetever the message should be an embed or not (default: true)')),
	async execute(interaction) {
		if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return await interaction.reply({ content: noPermissionText, ephemeral: true });
		const title = interaction.options.getString('title');
		const message = interaction.options.getString('message');
		const embed = interaction.options.getBoolean('embed') == false ? false : true;

		const { data } = await supabase
			.from('sticky_messages')
			.select('message_id')
			.eq('channel_id', interaction.channel.id);

		if (data.length) interaction.channel.messages.delete(data[0].message_id);

		if (embed == true) {
			const embedToSend = new MessageEmbed()
				.setColor(defaultColor)
				.setTitle(title)
				.setDescription(message);
			const msg = await interaction.channel.send({ embeds: [embedToSend] });

			await supabase
				.from('sticky_messages')
				.upsert([{ channel_id: interaction.channel.id, message_id: msg.id }])
				.eq('channel_id', interaction.channel.id);
			await supabase
				.from('sticky_messages')
				.upsert([{ channel_id: interaction.channel.id, title: title, message: message, embed: embed, message_id: msg.id }])
				.eq('channel_id', interaction.channel.id);
		}
		else {
			const messageToSend = `**${title}**\n${message}`;
			const msg = await interaction.channel.send({ content: messageToSend });

			await supabase
				.from('sticky_messages')
				.upsert([{ channel_id: interaction.channel.id, title: title, message: message, embed: embed, message_id: msg.id }])
				.eq('channel_id', interaction.channel.id);
		}

		await interaction.reply({ content: '📌 Sticky message set!', ephemeral: true });
	},
};
