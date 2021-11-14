const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('interact')
		.setDescription('Interact with a user (for example hug them)')
		.addSubcommand(subcommand =>
			subcommand
				.setName('hug')
				.setDescription('Hug someone')
				.addUserOption(option => option.setName('user').setDescription('The user you want to give a hug').setRequired(true)),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('pat')
				.setDescription('Pat someone')
				.addUserOption(option => option.setName('user').setDescription('The user you want to pet').setRequired(true)),
		),
	async execute(interaction) {
		const subcommand = interaction.options.getSubcommand();

		// Hug
		if (subcommand == 'hug') {
			const data = await fetch('https://some-random-api.ml/animu/hug').then(res => res.json());

			const embed = new MessageEmbed()
				.setColor('#EF9F75')
				.setDescription(`🤗 **${interaction.options.getUser('user').username}**, you've got a hug from **${interaction.user.username}**.`)
				.setImage(data.link)
				.setFooter('Hug')
				.setTimestamp();

			interaction.reply({ embeds: [embed] });
		}
		// Petpet
		if (subcommand == 'pat') {
			const data = await fetch('https://some-random-api.ml/animu/pat').then(res => res.json());

			const embed = new MessageEmbed()
				.setColor('#EF9F75')
				.setDescription(`✋ **${interaction.options.getUser('user').username}**, you've got a pat from **${interaction.user.username}**.`)
				.setImage(data.link)
				.setFooter('Pat')
				.setTimestamp();

			interaction.reply({ embeds: [embed] });
		}
	},
};