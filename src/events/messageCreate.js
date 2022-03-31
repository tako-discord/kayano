const { supabase } = require('../supabase');
const { MessageEmbed } = require('discord.js');
const { defaultColor } = require('../../config');

module.exports = {
	name: 'messageCreate',
	async execute(message) {
		const { data: channelIds } = await supabase
			.from('sticky_messages')
			.select('channel_id');

		const containsChannel = !!channelIds.find(channel_ids => {
			return channel_ids.channel_id === message.channel.id;
		});

		if (containsChannel == true) {
			const { data: data } = await supabase
				.from('sticky_messages')
				.select('*')
				.eq('channel_id', message.channel.id);

			if (data[0].message_id == message.id) return;
			if (data[0].deleted == false) message.channel.messages.delete(data[0].message_id).catch();

			if (data[0].embed == true) {
				const embedToSend = new MessageEmbed()
					.setColor(defaultColor)
					.setTitle(data[0].title)
					.setDescription(data[0].message);
				const msg = await message.channel.send({ embeds: [embedToSend] });

				await supabase
					.from('sticky_messages')
					.upsert([{ channel_id: message.channel.id, message_id: msg.id, deleted: false }])
					.eq('channel_id', message.channel.id);
			}
			else {
				const messageToSend = `**${data[0].title}**\n${data[0].message}`;
				const msg = await message.channel.send({ content: messageToSend });

				await supabase
					.from('sticky_messages')
					.upsert([{ channel_id: message.channel.id, message_id: msg.id }])
					.eq('channel_id', message.channel.id);
			}
		}

		if (message.channel.type == 'GUILD_NEWS') {
			const { data } = await supabase
				.from('channels')
				.select('crosspost')
				.eq('channel_id', `${message.channel.id}`);

			if (!data.length) {
				return;
			}

			if (data[0].crosspost == true && message.content != 'I ran into an error while trying to send your message! Please try to publish the message manually.') {
				try {
					message.crosspost();
				}
				catch {
					message.channel.send('I ran into an error while trying to send your message! Please try to publish the message manually.');
				}
			}
		}
	},
};
