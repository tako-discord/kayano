const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed, MessageAttachment } = require('discord.js');
const { noPermissionText, defaultColor, noBotPermissionText } = require('../../config');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Select a member and ban them')
		.addUserOption(option => option.setName('target').setDescription('The member to ban').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('The reason you ban the member'))
		.addNumberOption(option => option.setName('days').setDescription('The timespan the messages from the target should be deleted (in days)')),
	async execute(interaction, client) {
		if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
			return await interaction.reply({ content: noPermissionText, ephemeral: true });
		}

		if (!interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
			return await interaction.reply({ content: noBotPermissionText, ephemeral: true });
		}

		const target = interaction.options.getMember('target');
		const user = client.users.fetch(target.id);
		const reason = interaction.options.getString('reason');
		const days = (interaction.options.getNumber('days') < 0) ? 0 : (interaction.options.getNumber('days') > 7) ? 7 : Math.round(interaction.options.getNumber('days'));
		const image = new MessageAttachment('./assets/ban.png', 'ban.png');

		const embed = new MessageEmbed()
			.setColor(defaultColor)
			.setThumbnail('attachment://ban.png')
			.setTitle(`Successfully banned ${user.tag || target.user.tag} (${target.id})`)
			.setDescription(`I successfully banned **${user.username || target.user.username}** for you.`)
			.addField('Reason:', ((reason) ? reason : 'None'))
			.addField('The messages that got deleted:', ((days) ? `past ${days} days` : 'None'));

		target.ban({ reason: `${reason}`, days: days || 0 });
		return await interaction.reply({ embeds: [embed], files: [image], ephemeral: true });
	},
};
