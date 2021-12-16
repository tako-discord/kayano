const { SlashCommandBuilder } = require('@discordjs/builders');
const { language } = require('../languages');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lock')
		.setDescription('Locks a channel so @everyone cannot send messages in it')
		.addChannelOption(option => option.setName('channel').setDescription('The channel to lock')),
	async execute(interaction) {
		const channel = interaction.options.getChannel('channel') ? interaction.options.getChannel('channel') : interaction.channel;

		if (channel.type == 'GUILD_TEXT') {
			await channel.permissionOverwrites.create(interaction.guild.id, { 'SEND_MESSAGES': false }, { reason: `Locked by ${interaction.user.tag}`, type: 0 });
			await interaction.reply({ content: `<#${channel.id}> ${language(interaction.guild, 'LOCKED')}` });
		}
	},
};