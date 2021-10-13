const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, version: djsversion } = require('discord.js');
const { version } = require('../../package.json');
const utils = require('../util');
const client = require('../index');
const os = require('os');
const ms = require('ms');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Get some info about me!'),
	async execute(interaction) {
		const core = os.cpus()[0];
		const createdAt = new Date(client.user.createdTimestamp).toLocaleString('en-GB');

		const embed = new MessageEmbed()
			.setColor(interaction.guild.me.displayHexColor || 'YELLOW')
			.setTitle('Info about me')
			.setDescription('G\'day :wave:\n I\'m Kayano, a multipurpose bot and some day the only bot you\'ll need!')
			.setThumbnail(client.user.displayAvatarURL())
			.addField('General', [
				`**❯ Client:** ${client.user.tag} (${client.user.id})`,
				`**❯ Commands:** ${client.commands.size}`,
				`**❯ Servers:** ${client.guilds.cache.size.toLocaleString()} `,
				`**❯ Users:** ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
				`**❯ Channels:** ${client.channels.cache.size.toLocaleString()}`,
				`**❯ Creation Date:** ${createdAt} (dd/mm/yyyy, HH:MM:ss)`,
				`**❯ Bot Version:** v${version}`,
				`**❯ Node.js:** ${process.version}`,
				`**❯ Discord.js:** v${djsversion}`,
				'\u200b',
			].join('\n'))
			.addField('System', [
				`**❯ Platform:** ${process.platform}`,
				`**❯ Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
				'**❯ CPU:**',
				`\u3000 Cores: ${os.cpus().length}`,
				`\u3000 Model: ${core.model}`,
				`\u3000 Speed: ${core.speed}MHz`,
				'**❯ Memory:**',
				`\u3000 Total: ${utils.formatBytes(process.memoryUsage().heapTotal)}`,
				`\u3000 Used: ${utils.formatBytes(process.memoryUsage().heapUsed)}`,
			].join('\n'))
			.setTimestamp();

		await interaction.reply({ embeds: [embed] });
	},
};
