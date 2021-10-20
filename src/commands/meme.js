const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Send a random meme from r/meme'),
	async execute(interaction) {
		const data = await fetch('http://meme-api.herokuapp.com/gimme').then(res => res.json());

		const embed = new MessageEmbed();
		embed.setAuthor(data.author, 'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png', 'https://reddit.com/u/' + data.author);
		embed.setTitle(data.title);
		embed.setURL(data.postLink);
		embed.setImage(data.url);
		embed.setFooter(`r/${data.subreddit} • ${data.ups} 👍`);
		embed.setTimestamp();

		interaction.reply({ embeds: [embed] });
	},
};
