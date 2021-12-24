const { SlashCommandBuilder } = require('@discordjs/builders');
const { supabase } = require('../supabase');
const { Permissions } = require('discord.js');
const { noPermissionText } = require('../../config');
const { setLanguage } = require('../languages');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('language')
		.setDescription('Changes the language of the bot in the guild the command got executed from')
		.addStringOption(option => option.setName('language').setDescription('The language I should be speaking in this guild').setRequired(true)
			.addChoice('English', 'en')
			.addChoice('Deutsch (German)', 'de')
			.addChoice('Hrvatski (Croatian)', 'hr')),
	async execute(interaction) {
		if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
			return await interaction.reply({ content: noPermissionText, ephemeral: true });
		}

		const targetLang = interaction.options.getString('language');

		setLanguage(interaction.guild, targetLang);

		await supabase
			.from('guilds')
			.upsert([{ guild_name: `${interaction.guild.name}`, guild_id: `${interaction.guild.id}`, language: `${targetLang}` }])
			.eq('guild_id', `${interaction.guild.id}`);

		await interaction.reply({ content: `My language for this guild has been set to: \`${targetLang}\``, ephemeral: true });
	},
};
