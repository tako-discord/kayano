const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reddit')
		.setDescription('Send a random picture from a given subreddit')
		.addStringOption(option => option.setName('subreddit').setDescription('The subreddit you want the image from (example: aww)').setRequired(true)),
	async execute(interaction) {
		const subreddit = interaction.options.getString('subreddit');
		const data = await fetch('http://meme-api.herokuapp.com/gimme/' + subreddit).then(res => res.json());
		const image = new MessageAttachment('./assets/reddit.png', 'reddit.png');

		if (data.message == `r/${subreddit.toLowerCase()} has no Posts with Images`) {
			return await interaction.reply({ content: data.message, ephemeral: true });
		}

		if (data.nsfw == true & interaction.channel.nsfw == false) {
			return await interaction.reply({ content: 'Sorry but the image we found is marked as NSFW and this channel does not allow NSFW content.', ephemeral: true });
		}

		const embed = new MessageEmbed()
			.setColor('#FF4300')
			.setThumbnail('attachment://reddit.png')
			.setAuthor({ name: data.author, iconURL: 'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png', url: 'https://reddit.com/u/' + data.author })
			.setTitle(data.title)
			.setURL(data.postLink)
			.setImage(data.url)
			.setFooter({ text: `r/${data.subreddit} • ${data.ups} 👍` })
			.setTimestamp();

		await interaction.reply({ embeds: [embed], files: [image] });
	},
};
