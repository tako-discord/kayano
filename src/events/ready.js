const { version } = require('../../package.json');
const { AutoPoster } = require('topgg-autoposter');
const express = require('express');
const moment = require('moment');
require('dotenv').config();

module.exports = {
	name: 'ready',
	once: 'true',
	execute(client) {
		console.log([
			'----------\nStarting...\n',
			`----------\n${client.user.tag} (${client.user.id}) has started (at ${moment().format('YYYY-MM-DD HH:mm:ss')})`,
		].join(''));

		const server = express();
		server.all('/kayano-healthcheck', (req, res) => {res.send('The bot is up & running!');});
		server.listen(process.env.PORT || 5151, () => {console.log(`----------\nServer started at port: ${process.env.PORT || 5151} (at ${moment().format('YYYY-MM-DD HH:mm:ss')})`);});

		if (process.env.TOPGG_TOKEN) {
			AutoPoster(process.env.TOPGG_TOKEN, client);
			console.log('----------\nStarted top.gg autoposter');
		}

		let state = 0;
		setInterval(() => {
			const presences = [
				{ type: 'PLAYING', message: `with version ${version}` },
				{ type: 'WATCHING', message: `over ${client.guilds.cache.size} servers` },
				{ type: 'LISTENING', message: `to ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users` },
			];

			state = (state + 1) % presences.length;
			const presence = presences[state];

			client.user.setActivity(presence.message, { type: presence.type });
		}, 7500);

		client.application.commands.fetch().then(collection => {
			collection.forEach(command => {
				if (command.name === 'set-message') {
					client.application.commands.permissions.set({ guild: process.env.TEST_GUILD || '884046271176912917', command: command.id, permissions: [
						{
							id: `${process.env.OWNER_ID}`,
							type: 'USER',
							permission: true,
						},
					] }).catch(console.log);
				}
			});
		}).catch(console.log);
	},
};
