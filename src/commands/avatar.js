const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get the Avatar of yourself or a given user.')
        .addUserOption(option => option.setName('user').setDescription('The user you want the avatar from')),
    async execute(interaction) {
        let user = interaction.options.getUser('user');

        if (user) {
            const embed = new MessageEmbed()
                .setTitle(`Avatar for **${user.tag}**`)
                .setDescription(`[PNG](${user.avatarURL({ format: 'png', size: 512 })}) | [JPG](${user.avatarURL({ format: 'jpg', size: 512 })}) | [GIF](${user.avatarURL({ dynamic: true, size: 512 })})\n\nNote:\nThe GIF links leads to a \`webp\` image if the avatar is not animated!`)
                .setImage(user.avatarURL({dynamic: true, size: 512}))

            await interaction.reply({ embeds: [embed] })
        } else {
            const embed = new MessageEmbed()
                .setTitle(`Avatar for **${interaction.user.tag}**`)
                .setDescription(`[PNG](${interaction.user.avatarURL({ format: 'png', size: 512 })}) | [JPG](${interaction.user.avatarURL({ format: 'jpg', size: 512 })}) | [GIF](${interaction.user.avatarURL({ dynamic: true, size: 512 })})\n\nNote:\nThe GIF links leads to a \`webp\` image if the avatar is not animated!`)
                .setImage(interaction.user.avatarURL({dynamic: true, size: 512}))

            await interaction.reply({ embeds: [embed] })
        }
        
    }
};