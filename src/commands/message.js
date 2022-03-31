const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { supabase } = require('../supabase');
const { defaultColor, serverLink } = require('../../config');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('message')
		.setDescription('Get the latest message from my developers that you should definitely read!'),
	async execute(interaction) {
		const image = new MessageAttachment('./assets/announcement.png', 'announcement.png');
		const { data } = await supabase
			.from('messages')
			.select('*');

		let page = data.length;
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('message_first')
					.setLabel('⏪ First')
					.setStyle('SECONDARY'),
				new MessageButton()
					.setCustomId('message_prev')
					.setLabel('⬅️ Previous')
					.setStyle('SECONDARY'),
				new MessageButton()
					.setCustomId('message_next')
					.setLabel('Next ➡️')
					.setStyle('SECONDARY'),
				new MessageButton()
					.setCustomId('message_last')
					.setLabel('Last ⏩')
					.setStyle('SECONDARY'),
			);

		const filter = i => i.user.id === interaction.user.id;
		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 3600000 });

		collector.on('collect', async i => {
			if (i.customId === 'message_first') {
				if (page === 1) return await i.reply({ content: 'You are already on the first page!', ephemeral: true });
				page = 1;
				const newEmbed = new MessageEmbed()
					.setColor(defaultColor)
					.setThumbnail('attachment://announcement.png')
					.setTitle(data[page - 1].title)
					.setDescription(data[page - 1].message)
					.setFooter({ text: `Page ${page}/${data.length} • For more visit our server at: ${serverLink}` })
					.setTimestamp(data[page - 1].created_at);

				await i.update({ embeds: [newEmbed], files: [image], components: [row] });
			}
			if (i.customId === 'message_prev') {
				if (page > 1) {
					page = page - 1;
				}
				else {
					return i.reply({ content: 'You are already on the first page!', ephemeral: true });
				}

				const newEmbed = new MessageEmbed()
					.setColor(defaultColor)
					.setThumbnail('attachment://announcement.png')
					.setTitle(data[page - 1].title)
					.setDescription(data[page - 1].message)
					.setFooter({ text: `Page ${page}/${data.length} • For more visit our server at: ${serverLink}` })
					.setTimestamp(data[page - 1].created_at);

				await i.update({ embeds: [newEmbed], files: [image], components: [row] });
			}
			if (i.customId === 'message_next') {
				if (page != data.length) {
					page = page + 1;
				}
				else {
					return i.reply({ content: 'You are already on the last page!', ephemeral: true });
				}

				const newEmbed = new MessageEmbed()
					.setColor(defaultColor)
					.setThumbnail('attachment://announcement.png')
					.setTitle(data[page - 1].title)
					.setDescription(data[page - 1].message)
					.setFooter({ text: `Page ${page}/${data.length} • For more visit our server at: ${serverLink}` })
					.setTimestamp(data[page - 1].created_at);

				await i.update({ embeds: [newEmbed], files: [image], components: [row] });
			}
			if (i.customId === 'message_last') {
				if (page === data.length) return await i.reply({ content: 'You are already on the first page!', ephemeral: true });
				page = data.length;
				const newEmbed = new MessageEmbed()
					.setColor(defaultColor)
					.setThumbnail('attachment://announcement.png')
					.setTitle(data[page - 1].title)
					.setDescription(data[page - 1].message)
					.setFooter({ text: `Page ${page}/${data.length} • For more visit our server at: ${serverLink}` })
					.setTimestamp(data[page - 1].created_at);

				await i.update({ embeds: [newEmbed], files: [image], components: [row] });
			}
		});

		const embed = new MessageEmbed()
			.setColor(defaultColor)
			.setThumbnail('attachment://announcement.png')
			.setTitle(data[page - 1].title)
			.setDescription(data[page - 1].message)
			.setFooter({ text: `Page ${page}/${data.length} • For more visit our server at: ${serverLink}` })
			.setTimestamp(data[page - 1].created_at);

		await interaction.reply({ embeds: [embed], files: [image], components: [row] });
		collector.on('end', async function() {
			const finalEmbed = new MessageEmbed()
				.setColor(defaultColor)
				.setThumbnail('attachment://announcement.png')
				.setTitle(data[page - 1].title)
				.setDescription(data[page - 1].message)
				.setFooter({ text: `Page ${page}/${data.length} • For more visit our server at: ${serverLink}` })
				.setTimestamp(data[page - 1].created_at);
			await interaction.editReply({ embeds: [finalEmbed], files: [image], components: [] });
		});
	},
};