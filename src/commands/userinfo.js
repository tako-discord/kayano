const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { developerEmoji, senseiEmoji, donatorEmoji } = require('../../config');
const donators = require('../donators');
require('dotenv').config();

const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer',
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Get some information about you or a given user.')
		.addUserOption(option => option.setName('user').setDescription('The user you want the information from')),
	async execute(interaction) {
		if (interaction.options.getUser('user')) {
			const user = interaction.options.getUser('user');
			const createdAt = new Date(user.createdTimestamp).toLocaleString('en-GB');
			const userFlags = user.flags.toArray();

			const embed = new MessageEmbed()
				.setTitle(`Infos for ${user.username}:`)
				.setThumbnail(user.avatarURL({ dynamic: true }))
				.setDescription([
					'**__User:__**',
					`**Username**: ${user.tag}`,
					`**ID**: ${user.id}`,
					`**Created at**: ${createdAt} (dd/mm/yyyy, HH:MM:ss)`,
					`**Flags**: ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
				].join('\n'));

			if (user.id == process.env.OWNER_ID) {
				embed.setTitle(`Infos for ${user.username}:`);
				embed.addField(`**${developerEmoji} Developer**`, `${user.username} is my Original Creator & Developer`);
				embed.addField(`**${senseiEmoji} Sensei**`, `${user.username} is my sensei`);
			}

			if (donators.includes(user.id)) {
				embed.addField(`**${donatorEmoji} Donator**`, `<@${user.id}> donated to <@751092600890458203>`);
			}

			await interaction.reply({ embeds: [embed] });
		}
		else {
			const user = interaction.user;
			const createdAt = new Date(user.createdTimestamp).toLocaleString('en-GB');
			const userFlags = user.flags.toArray();

			const embed = new MessageEmbed()
				.setTitle(`Infos for ${user.username}:`)
				.setThumbnail(user.avatarURL({ dynamic: true }))
				.setDescription([
					'**__User:__**',
					`**Username**: ${user.tag}`,
					`**ID**: ${user.id}`,
					`**Created at**: ${createdAt} (dd/mm/yyyy, HH:MM:ss)`,
					`**Flags**: ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
				].join('\n'));

			if (user.id == process.env.OWNER_ID) {
				embed.setTitle(`Infos for ${user.username}:`);
				embed.addField(`**${developerEmoji} Developer**`, `${user.username} is my Original Creator & Developer`);
				embed.addField(`**${senseiEmoji} Sensei**`, `${user.username} is my sensei`);
			}

			if (donators.includes(user.id)) {
				embed.addField(`**${donatorEmoji} Donator**`, `<@${user.id}> donated to <@751092600890458203>`);
			}

			await interaction.reply({ embeds: [embed] });
		}
	},
};
