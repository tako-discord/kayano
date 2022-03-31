const { supabase } = require('../supabase');

module.exports = {
	name: 'messageDelete',
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

			if (data[0].message_id == message.id) {
				await supabase
					.from('sticky_messages')
					.upsert([{ channel_id: message.channel.id, deleted: true }])
					.eq('channel_id', message.channel.id);
			}
		}
	},
};
