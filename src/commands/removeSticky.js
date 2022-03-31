const { SlashCommandBuilder } = require('@discordjs/builders');
const { supabase } = require('../supabase');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove-sticky')
		.setDescription('Remove the sticky message from the current channel'),
	async execute(interaction) {
		await supabase
			.from('sticky_messages')
			.select('message_id, deleted')
			.eq('channel_id', interaction.channel.id);

		await supabase
			.from('sticky_messages')
			.delete()
			.eq('channel_id', interaction.channel.id);

		await interaction.reply({ content: 'Sticky message removed!', ephemeral: true });
	},
};
