const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const { defaultColor } = require('../../config');
const fetch = require('node-fetch');
require('dotenv').config();

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
				.addUserOption(option => option.setName('user').setDescription('The user you want to pat').setRequired(true)),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('petpet')
				.setDescription('Petpet someone')
				.addUserOption(option => option.setName('user').setDescription('The user you want to petpet').setRequired(true)),
		),
	async execute(interaction) {
		const subcommand = interaction.options.getSubcommand();

		// Hug
		if (subcommand == 'hug') {
			const data = await fetch('https://some-random-api.ml/animu/hug').then(res => res.json());

			const embed = new MessageEmbed()
				.setColor(defaultColor)
				.setDescription(`🤗 **${interaction.options.getUser('user').username}**, you've got a hug from **${interaction.user.username}**.`)
				.setImage(data.link)
				.setTimestamp();

			interaction.reply({ embeds: [embed] });
		}
		// Pat
		if (subcommand == 'pat') {
			const data = await fetch('https://some-random-api.ml/animu/pat').then(res => res.json());

			const embed = new MessageEmbed()
				.setColor(defaultColor)
				.setDescription(`✋ **${interaction.options.getUser('user').username}**, you've got a pat from **${interaction.user.username}**.`)
				.setImage(data.link)
				.setTimestamp();

			interaction.reply({ embeds: [embed] });
		}
		// Petpet
		if (subcommand == 'petpet') {
			const image = new MessageAttachment(`https://some-random-api.ml/premium/petpet?avatar=${interaction.options.getUser('user').displayAvatarURL({ size: 256, format: 'png' })}&key=${process.env.RNDM_API_KEY}`, 'petpet.gif');
			const embed = new MessageEmbed()
				.setColor(defaultColor)
				.setDescription(`✋ **${interaction.options.getUser('user').username}**, you've got a petpet from **${interaction.user.username}**.`)
				.setImage('attachment://petpet.gif')
				.setTimestamp();

			interaction.reply({ embeds: [embed], files: [image] });
		}
	},
};