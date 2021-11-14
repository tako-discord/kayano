const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const { defaultColor } = require('../../config');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Get the Avatar of yourself or a given user.')
		.addUserOption(option => option.setName('user').setDescription('The user you want the avatar from')),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const image = new MessageAttachment('./assets/emoji.png', 'emoji.png');

		if (user) {
			const embed = new MessageEmbed()
				.setColor(defaultColor)
				.setTitle(`Avatar for **${user.tag}**`)
				.setThumbnail('attachment://emoji.png')
				.setDescription(`[PNG](${user.avatarURL({ format: 'png', size: 512 })}) | [JPG](${user.avatarURL({ format: 'jpg', size: 512 })}) | [GIF](${user.avatarURL({ dynamic: true, size: 512 })})\n\nNote:\nThe GIF links leads to a \`webp\` image if the avatar is not animated!`)
				.setImage(user.avatarURL({ dynamic: true, size: 512 }));

			await interaction.reply({ embeds: [embed], files: [image] });
		}
		else {
			const embed = new MessageEmbed()
				.setColor(defaultColor)
				.setTitle(`Avatar for **${interaction.user.tag}**`)
				.setThumbnail('attachment://emoji.png')
				.setDescription(`[PNG](${interaction.user.avatarURL({ format: 'png', size: 512 })}) | [JPG](${interaction.user.avatarURL({ format: 'jpg', size: 512 })}) | [GIF](${interaction.user.avatarURL({ dynamic: true, size: 512 })})\n\nNote:\nThe GIF links leads to a \`webp\` image if the avatar is not animated!`)
				.setImage(interaction.user.avatarURL({ dynamic: true, size: 512 }));

			await interaction.reply({ embeds: [embed], files: [image] });
		}

	},
};
