const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unlock')
		.setDescription('Unocks a channel so @everyone can send messages in it')
		.addChannelOption(option => option.setName('channel').setDescription('The channel to unlock')),
	async execute(interaction) {
		const channel = interaction.options.getChannel('channel') ? interaction.options.getChannel('channel') : interaction.channel;

		if (channel.type == 'GUILD_TEXT') {
			await channel.permissionOverwrites.create(interaction.guild.id, { 'SEND_MESSAGES': null }, { reason: `Unlocked by ${interaction.user.tag}`, type: 0 });
			await interaction.reply({ content: `**<#${channel.id}> is now unlocked!**` });
		}
	},
};