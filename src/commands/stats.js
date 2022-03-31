const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const { defaultColor } = require('../../config');
const { version } = require('../../package.json');
const { formatBytes } = require('../util');
const { utc } = require('moment');
const fetch = require('node-fetch');
const os = require('os');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Get stats about me'),
	async execute(interaction, client) {
		const latestVersion = await fetch('https://raw.githubusercontent.com/kayano-bot/kayano/stable/package.json').then(res => res.json()).then(data => data.version);
		const image = new MessageAttachment('./assets/stats.png', 'stats.png');
		const operatingSystems = {
			aix: 'aix',
			darwin: 'Darwin (MacOS)',
			freebsd: 'FreeBSD',
			linux: 'Linux',
			openbsd: 'OpenBSD',
			sunos: 'SunOS',
			win32: 'Windows',
			android: 'Android',
		};
		const osArray = [`${os.platform()}`];
		const embed = new MessageEmbed()
			.setColor(defaultColor)
			.setThumbnail('attachment://stats.png')
			.setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL() })
			.setTitle('📊 Stats')
			.setDescription('Here are some stats about me!')
			.addField('General', [
				`**<:server:950769912958320680> Server count**: ${client.guilds.cache.size}`,
				`**<:users:950777719417876502> User count**: ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`,
				`**<:channel:951127622820171846> Channel count**: ${client.channels.cache.size}`,
				`**<:slash_command:951124330459328553> Commands**: ${client.commands.size}`,
				`**🕘 Created at**: ${utc(client.user.createdAt).format('Do MMMM YYYY HH:mm:ss')}`,
				(version === latestVersion) ? `**🏷️ Version**: ${version}` : `**❗ Version**: ${version} __**(Latest: ${latestVersion})**__`,
				`**<:djs:950763492112232499> Discord.js Version**: ${require('discord.js').version}`,
				`**<:nodejs:950763463515463710> Node.js Version**: ${process.version}`,
				'**🏓 Ping**:',
				`\u3000 *Websocket Latency:* ${client.ws.ping} ms.`,
			].join('\n'))
			.addField('System', [
				`**🖥️ Platform**: ${osArray.map(operatingSystem => operatingSystems[operatingSystem])}`,
				'**⚡ CPU**:',
				`\u3000 *Model:* ${os.cpus()[0].model}`,
				`\u3000 *Cores:* ${os.cpus().length}`,
				`\u3000 *Speed:* ${os.cpus()[0].speed} MHz`,
				'**🗄️ Memory**:',
				`\u3000 *Total Memory:* ${formatBytes(os.totalmem())}`,
				`\u3000 *Free Memory:* ${formatBytes(os.freemem())}`,
			].join('\n'))
			.setTimestamp();

		await interaction.reply({ embeds: [embed], files: [image] });
	},
};