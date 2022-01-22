const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const { developerEmoji, senseiEmoji, donatorEmoji, defaultColor, flags } = require('../../config');
const donators = require('../donators');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Get informations about something')
		.addSubcommand(subcommand =>
			subcommand
				.setName('user')
				.setDescription('Get some information about you or a given user.')
				.addUserOption(option => option.setName('user').setDescription('The user you want the information from')),
		),
	async execute(interaction) {
		const subcommand = interaction.options.getSubcommand();

		if (subcommand == 'user') {
			const image = new MessageAttachment('./assets/user.png', 'user.png');

			const user = interaction.options.getUser('user') ? interaction.options.getUser('user') : interaction.user;
			const createdAt = new Date(user.createdTimestamp).toLocaleString('en-GB');
			const userFlags = user.flags.toArray();

			const embed = new MessageEmbed()
				.setTitle(`Infos for ${user.username}:`)
				.setColor(defaultColor)
				.setThumbnail('attachment://user.png')
				.addField('User', [
					`**❯ User:** ${user.tag}`,
					`**❯ ID:** ${user.id}`,
					`**❯ Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
					`**❯ Created at:** ${createdAt} (dd/mm/yyyy, HH:MM:ss)`,
					'\u200b',
				].join('\n'))
				.setImage(user.displayAvatarURL({ dynamic: true, size: 512 }));
			if (user.id == process.env.OWNER_ID) {
				embed.addField(`**${developerEmoji} Developer**`, `${user.username} is my original developer`);
				embed.addField(`**${senseiEmoji} Sensei**`, `${user.username} is my sensei`);
			}

			if (donators.includes(user.id)) {
				embed.addField(`**${donatorEmoji} Donator**`, `${user.username} donated to <@501121253097209857>`);
			}

			await interaction.reply({ embeds: [embed], files: [image] });
		}
	},
};