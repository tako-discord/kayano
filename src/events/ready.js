const { version } = require('../../package.json');

module.exports = {
	name: 'ready',
	once: 'true',
	execute(client) {
		console.log([
			'',
			'Starting...',
			`${client.user.tag} (${client.user.id}) has started`,
			'',
		].join('\n----------\n'));

		const activities = [
			`with version ${version}`,
			`on ${client.guilds.cache.size} servers`,
		];

		let i = 0;
		setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: 'PLAYING' }), 7500);
	},
};
