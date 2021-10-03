const client = require('../index');

module.exports = {
    name: 'ready',
    once: 'true',
    execute(client) {
        console.log([
            ``,
            `Starting...`,
            `${client.user.tag} (${client.user.id}) has started`
        ].join(`\n----------\n`));

        const activities = [
            `over ${client.guilds.cache.size} servers!`,
			`Assasination Classroom`,
            `with you`
		];

        const activityTypes = [
            'PLAYING',
            'WATCHING',
            'WATCHING'
        ]

		let i = 0;
		setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: `${activityTypes[i++ % activityTypes.length]}` }), 12000);
    }
};