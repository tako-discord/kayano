const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reddit')
        .setDescription('Send a random picture from a given subreddit')
        .addStringOption(option => option.setName('subreddit').setDescription('The subreddit you want the image from').setRequired(true)),
    async execute(interaction) {
        let subreddit = interaction.options.getString('subreddit');
        let data = await fetch(`http://meme-api.herokuapp.com/gimme/` + subreddit).then(res => res.json());

        if (data.message == `r/${subreddit.toLowerCase()} has no Posts with Images`) {
            return interaction.reply({ content: data.message, ephemeral: true });
        }

        embed = new MessageEmbed()
            embed.setColor("#FF4300")
            embed.setAuthor(data.author, 'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png', 'https://reddit.com/u/' + data.author)
            embed.setTitle(data.title)
            embed.setURL(data.postLink)
            embed.setImage(data.url)
            embed.setFooter(`r/${data.subreddit} • ${data.ups} Upvotes`)
            embed.setTimestamp()

        interaction.reply({ embeds: [embed] });
    }
};
