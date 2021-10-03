const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('ECHO...ECHo...ECho...Echo...echo')
        .addStringOption(option => option.setName('message').setDescription('The message the bot should send.').setRequired(true)),
    async execute(interaction) {
        let msg = interaction.options.getString('message')

        embed = new MessageEmbed()
            .setAuthor(interaction.user.tag, interaction.user.avatarURL({ dynamic: true }))
            .setTitle('Echo')
            .setThumbnail('https://i.imgur.com/ojCGL7Q.png')
            .setDescription(msg)
            .setTimestamp()

        await interaction.reply({ embeds: [embed] })
    }
}