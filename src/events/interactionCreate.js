const client = require('../index');
const { MessageEmbed, MessageAttachment, Permissions } = require('discord.js');
const { noBotPermissionText } = require('../../config');
require('dotenv').config();

async function errorFunction(interaction, error) {
	console.error(error);

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

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (interaction.isCommand() || interaction.isContextMenu() || interaction.isSelectMenu()) {
			if (interaction.isSelectMenu()) {
				const { customId, values, member } = interaction;

				if (customId == 'auto_roles') {
					let hasPermission = false;
					if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
						return await interaction.reply({ content: noBotPermissionText, ephemeral: true });
					}
					else {
						hasPermission = true;
					}

					const component = interaction.component;
					const removed = component.options.filter((option) => {
						return !values.includes(option.value);
					});

					for (const id of removed) {
						member.roles.remove(id.value)
							.catch(e => errorFunction(interaction, e));
					}

					for (const id of values) {
						member.roles.add(id)
							.catch(e => errorFunction(interaction, e));
					}

					if (hasPermission === true) {
						interaction.reply({ content: 'Your roles got updated!', ephemeral: true });
					}
				}
			}

			const command = client.commands.get(interaction.commandName);

			if (!command) return;

			await command.execute(interaction, client)
				.catch(e => errorFunction(interaction, e));
		}
		else {
			return;
		}
	},
};
