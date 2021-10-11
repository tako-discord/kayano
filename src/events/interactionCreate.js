const client = require('../index');
const { MessageEmbed } = require('discord.js');
require("dotenv").config();

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });

            embed = new MessageEmbed()
                .setColor('RED')
                .setTitle('An error ocurred!')
                .setThumbnail('https://i.imgur.com/CWGftvk.png')
                .setDescription([
                    `**Details:**`,
                    `*Executed Command:* \`${interaction.commandName}\``,
                    ``,
                    `**Error:**`,
                    `\`\`\``,
                    `${error}`,
                    `\`\`\``,
                ].join('\n'))
                .setTimestamp()

            client.channels.cache.get(process.env.ERROR_CHANNEL).send({ embeds: [embed]});
        }
    }
}