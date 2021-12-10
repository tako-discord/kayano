const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const { defaultColor } = require('../../config');
const { language } = require('../languages');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Get the Avatar of yourself or a given user')
		.addUserOption(option => option.setName('user').setDescription('The user you want the avatar from')),
	async execute(interaction) {
		const user = interaction.options.getUser('user') ? interaction.options.getUser('user') : interaction.user;
		const image = new MessageAttachment('./assets/emoji.png', 'emoji.png');

		const embed = new MessageEmbed()
			.setColor(defaultColor)
			.setTitle(`Avatar ${language(interaction.guild, 'FOR')} **${user.tag}**`)
			.setThumbnail('attachment://emoji.png')
			.setDescription(`[PNG](${user.avatarURL({ format: 'png', size: 512 })}) | [JPG](${user.avatarURL({ format: 'jpg', size: 512 })}) | [GIF](${user.avatarURL({ dynamic: true, size: 512 })})\n\n${language(interaction.guild, 'AVATAR_NOTE')}`)
			.setImage(user.avatarURL({ dynamic: true, size: 512 }));

		await interaction.reply({ embeds: [embed], files: [image] });
	},
};
