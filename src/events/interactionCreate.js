const client = require('../index');
const { MessageEmbed, MessageAttachment } = require('discord.js');
require('dotenv').config();

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (interaction.isCommand() || interaction.isContextMenu()) {
			const command = client.commands.get(interaction.commandName);

			if (!command) return;

			try {
				await command.execute(interaction);
			}
			catch (error) {
				console.error(error);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });

				const image = new MessageAttachment('./assets/error.png', 'error.png');
				const embed = new MessageEmbed()
					.setColor('RED')
					.setThumbnail('attachment://error.png')
					.setTitle('An error ocurred!')
					.setDescription([
						'**Details:**',
						`*Executed Command:* \`${interaction.commandName}\``,
						'',
						'**Error:**',
						'```',
						`${error}`,
						'```',
					].join('\n'))
					.setTimestamp();

				client.channels.cache.get(process.env.ERROR_CHANNEL).send({ embeds: [embed], files: [image] });
			}
		}
		else {
			return;
		}
	},
};
