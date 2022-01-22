const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const { defaultColor } = require('../../config');

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
			.setTitle(`Avatar for **${user.tag}**`)
			.setThumbnail('attachment://emoji.png')
			.setDescription(`[PNG](${user.avatarURL({ format: 'png', size: 512 })}) | [JPG](${user.avatarURL({ format: 'jpg', size: 512 })}) | [GIF](${user.avatarURL({ dynamic: true, size: 512 })})\n\nPlease note that the GIF link leads you to a webq image if the Avatar is not animated.`)
			.setImage(user.avatarURL({ dynamic: true, size: 512 }));

		await interaction.reply({ embeds: [embed], files: [image] });
	},
};
