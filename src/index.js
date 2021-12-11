const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const client = new Client({ intents: [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MEMBERS,
], allowedMentions: {
	parse: ['users', 'roles'],
	repliedUser: false,
} });
module.exports = client;

// Events
const eventFiles = fs.readdirSync(__dirname + '/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(__dirname + `/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Slash Commands
client.commands = new Collection();
const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(__dirname + `/commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.login(process.env.TOKEN);
