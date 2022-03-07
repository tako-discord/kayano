const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const { defaultColor } = require('../../config');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Send a random meme from r/meme'),
	async execute(interaction) {
		const data = await fetch('http://meme-api.herokuapp.com/gimme').then(res => res.json());
		const image = new MessageAttachment('./assets/funny.png', 'funny.png');

		const embed = new MessageEmbed()
			.setColor(defaultColor)
			.setThumbnail('attachment://funny.png')
			.setAuthor({ name: data.author, iconURL: 'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png', url: 'https://reddit.com/u/' + data.author })
			.setTitle(data.title)
			.setURL(data.postLink)
			.setImage(data.url)
			.setFooter({ text: `r/${data.subreddit} • ${data.ups} 👍` })
			.setTimestamp();

		await interaction.reply({ embeds: [embed], files: [image] });
	},
};
