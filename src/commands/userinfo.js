const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Get some information about you or a given user.')
		.addUserOption(option => option.setName('user').setDescription('The user you want the information from')),
	async execute(interaction) {
		const user = interaction.options.getUser('user');

		if (user) {
			const embed = new MessageEmbed()
				.setTitle(`Infos for ${user.username}:`)
				.setThumbnail(user.avatarURL({ dynamic: true }))
				.setDescription([
					'**__General:__**',
					`**Username**: ${user.tag}`,
					`**ID**: ${user.id}`,
				].join('\n'));

			if (user.id == process.env.OWNER_ID) {
				embed.setTitle(`Infos for ${user.username}:`);
				embed.addField('**<:blob_dev:891643826895212575> Developer**', `${user.username} is my Original Creator & Developer`);
				embed.addField('**<:verified:891645797874151445> Sensei**', `${user.username} is my sensei`);
			}

			await interaction.reply({ embeds: [embed] });
		}
		else {
			const embed = new MessageEmbed()
				.setTitle(`Infos for ${interaction.user.username}:`)
				.setThumbnail(interaction.user.avatarURL({ dynamic: true }))
				.setDescription([
					'**__General:__**',
					`**Username**: ${interaction.user.tag}`,
					`**ID**: ${interaction.user.id}`,
				].join('\n'));

			if (interaction.user.id == process.env.OWNER_ID) {
				embed.setTitle(`Infos for ${interaction.user.username}:`);
				embed.addField('**<:blob_dev:891643826895212575> Developer**', `${interaction.user.username} is my Original Creator & Developer`);
				embed.addField('**<:verified:891645797874151445> Sensei**', `${interaction.user.username} is my sensei`);
			}

			await interaction.reply({ embeds: [embed] });
		}
	},
};
