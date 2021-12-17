const { version } = require('../../package.json');
const { loadLanguages } = require('../languages');
const { AutoPoster } = require('topgg-autoposter');
const express = require('express');
const moment = require('moment');

module.exports = {
	name: 'ready',
	once: 'true',
	execute(client) {
		const server = express();
		server.all('/', (req, res) => {res.send('The bot is up & running!');});
		server.listen(process.env.PORT, () => {console.log(`Server started at: http://localhost:${process.env.PORT} (at ${moment().format('YYYY-MM-DD HH:mm:ss')})\n----------`);});

		console.log([
			'----------\nStarting...\n',
			`----------\n${client.user.tag} (${client.user.id}) has started (at ${moment().format('YYYY-MM-DD HH:mm:ss')})`,
		].join(''));

		loadLanguages(client);
		server.all('/kayano-uptime', (req, res) => {res.send('The bot is up & running!');});
		server.listen(process.env.PORT ? process.env.PORT : 5151, () => {console.log(`----------\nServer started at: http://localhost:${process.env.PORT ? process.env.PORT : 5151}`);});

		if (process.env.TOPGG_TOKEN) {
			AutoPoster(process.env.TOPGG_TOKEN, client);
			console.log('----------\nStarted top.gg autoposter');
		}

		if (process.env.TOPGG_TOKEN) {
			const poster = AutoPoster(process.env.TOPGG_TOKEN, client);
			poster.on('posted', (stats) => {
				console.log(`Posted stats to Top.gg | ${stats.serverCount} servers (at ${moment().format('YYYY-MM-DD HH:mm:ss')})\n----------`);
			});
			poster.on('error', (err) => {
				console.log(`Error posting stats to Top.gg | ${err} (at ${moment().format('YYYY-MM-DD HH:mm:ss')})\n----------`);
			});
		}

		const activities = [
			`with version ${version}`,
			`on ${client.guilds.cache.size} servers`,
		];

		let i = 0;
		setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: 'PLAYING' }), 7500);

	},
};
