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
				.setDescription('Give an user a hug')
				.addUserOption(option => option.setName('user').setDescription('The user you want to give a hug').setRequired(true)),
		),
	async execute(interaction) {
		if (interaction.options.getSubcommand() == 'hug') {
			const data = await fetch('https://some-random-api.ml/animu/hug').then(res => res.json());

			const embed = new MessageEmbed()
				.setColor('#EF9F75')
				.setDescription(`:hugging: **${interaction.options.getUser('user').username}**, you've got a hug from **${interaction.user.username}**.`)
				.setImage(data.link)
				.setFooter('Hug')
				.setTimestamp();

			interaction.reply({ embeds: [embed] });
		}
	},
};