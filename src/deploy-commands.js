const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
require('dotenv').config();

const commands = [];
const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(__dirname + `/commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
	try {
		if (process.env.TESTING == 'true') {
			console.log('Started refreshing application (/) commands. (TESTING)');

			await rest.put(
				Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.TEST_GUILD),
				{ body: commands },
			);

			console.log('Successfully reloaded application (/) commands. (TESTING)');
		}
		else {
			console.log('Started refreshing application (/) commands.');

			await rest.put(
				Routes.applicationCommands(process.env.CLIENT_ID),
				{ body: commands },
			);

			console.log('Successfully reloaded application (/) commands.');
		}
	}
	catch (error) {
		console.log('An error occured while refreshing application (/) commands.');
		console.error(error);
	}
})();
