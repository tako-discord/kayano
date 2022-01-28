const { supabase } = require('../supabase');

module.exports = {
	name: 'messageCreate',
	async execute(message) {
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
