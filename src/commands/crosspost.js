const { SlashCommandBuilder } = require('@discordjs/builders');
const { supabase } = require('../supabase');
const { Permissions } = require('discord.js');
const { noPermissionText } = require('../../config');

const crosspostUpsert = async (channel, state) => {
	const { data } = await supabase
		.from('channels')
		.upsert([{ channel_id: `${channel.id}`, channel_name: `${channel.name}`, crosspost: state }])
		.eq('channel_id', `${channel.id}`);

	return data;
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('crosspost')
		.setDescription('Specify a channel to toggle auto-crossposting')
		.addChannelOption(option => option.setName('channel').setDescription('The channel the bot should automatically crosspost messages').setRequired(true))
		.addBooleanOption(option => option.setName('state').setDescription('Whetever it should automatically crosspost messages or not').setRequired(true)),
	async execute(interaction) {
		if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
			return await interaction.reply({ content: noPermissionText, ephemeral: true });
		}

		const channel = interaction.options.getChannel('channel');
		const state = interaction.options.getBoolean('state');

		if (channel.type == 'GUILD_NEWS') {
			crosspostUpsert(channel, state);
			return await interaction.reply({ content: `Automatic crossposting for <#${channel.id}> is now set to: \`${state}\``, ephemeral: true });
		}
		else {
			return await interaction.reply({ content: 'You must provide a valid news channel!', ephemeral: true });
		}
	},
};