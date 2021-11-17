const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed, MessageAttachment } = require('discord.js');
const { noPermissionText, noBotPermissionText, defaultColor } = require('../../config');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Select a member and kick them')
		.addUserOption(option => option.setName('target').setDescription('The member to kick').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('The reason you kick the member')),
	async execute(interaction) {
		if (!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
			return await interaction.reply({ content: noPermissionText, ephemeral: true });
		}

		if (!interaction.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
			return await interaction.reply({ content: noBotPermissionText, ephemeral: true });
		}

		const target = interaction.options.getMember('target');
		const reason = interaction.options.getString('reason');
		const image = new MessageAttachment('./assets/kick.png', 'kick.png');

		const embed = new MessageEmbed()
			.setColor(defaultColor)
			.setThumbnail('attachment://kick.png')
			.setTitle(`Successfully kicked ${target.tag} (${target.id})`)
			.setDescription(`I successfully kicked **${target.username}** for you.`)
			.addField('Reason:', ((reason) ? reason : 'None'));

		target.kick(reason);
		return await interaction.reply({ embeds: [embed], files: [image], ephemeral: true });
	},
};
