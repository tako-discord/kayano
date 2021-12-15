const { version } = require('../../package.json');
const { loadLanguages } = require('../languages');
const { AutoPoster } = require('topgg-autoposter');
const express = require('express');
const moment = require('moment');

module.exports = {
	name: 'ready',
	once: 'true',
	execute(client) {
		console.log([
			'----------\nStarting...\n',
			`----------\n${client.user.tag} (${client.user.id}) has started (at ${moment().format('YYYY-MM-DD HH:mm:ss')})`,
		].join(''));

		loadLanguages(client);
		const server = express();
		server.all('/kayano-uptime', (req, res) => {res.send('The bot is up & running!');});
		server.listen(process.env.PORT ? process.env.PORT : 5151, () => {console.log(`----------\nServer started at: http://localhost:${process.env.PORT ? process.env.PORT : 5151}`);});

		if (process.env.TOPGG_TOKEN) {
			AutoPoster(process.env.TOPGG_TOKEN, client);
			console.log('----------\nStarted top.gg autoposter');
		}

		const activities = [
			`with version ${version}`,
			`on ${client.guilds.cache.size} servers`,
		];

		let i = 0;
		setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: 'PLAYING' }), 7500);
	},
};
