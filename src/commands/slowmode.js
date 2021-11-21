const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const { noPermissionText } = require('../../config');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('slowmode')
		.setDescription('Sets a slowmode for a specific channel or the current channel')
		.addNumberOption(option => option.setName('slowmode').setDescription('How long the slowmode should be (in seconds)').setRequired(true))
		.addChannelOption(option => option.setName('channel').setDescription('The channel to set a slowmode for')),
	async execute(interaction) {
		if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
			return await interaction.reply({ content: noPermissionText, ephemeral: true });
		}

		const channel = interaction.options.getChannel('channel');
		const time = interaction.options.getNumber('slowmode');

		if (channel) {
			await channel.setRateLimitPerUser(time, `Slowmode set by ${interaction.user.tag}`);
			await interaction.reply({ content: `Slowmode of **${time}s** set for <#${channel.id}>`, ephemeral: true });
		}
		else {
			await interaction.channel.setRateLimitPerUser(time, `Slowmode set by ${interaction.user.tag}`);
			await interaction.reply({ content: `Slowmode of **${time}s** set for <#${interaction.channel.id}>`, ephemeral: true });
		}
	},
};
