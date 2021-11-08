#!/usr/bin/node
/* eslint-disable prefer-const */
require('colors');
const inquirer = require('inquirer');

console.log([
	'\n',
	'░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░',
	'░   ░░░   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░',
	'▒   ▒▒   ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒',
	'▒   ▒   ▒▒▒▒▒▒▒▒   ▒▒▒▒▒   ▒▒▒   ▒▒▒▒   ▒▒▒▒▒   ▒   ▒▒▒▒▒▒   ▒▒▒▒',
	'▓  ▓  ▓▓▓▓▓▓▓▓   ▓▓   ▓▓▓   ▓   ▓▓▓   ▓▓   ▓▓▓   ▓▓   ▓▓   ▓▓   ▓',
	'▓   ▓▓   ▓▓▓▓   ▓▓▓   ▓▓▓▓▓    ▓▓▓   ▓▓▓   ▓▓▓   ▓▓   ▓   ▓▓▓▓   ',
	'▓   ▓▓▓   ▓▓▓   ▓▓▓   ▓▓▓▓▓▓   ▓▓▓   ▓▓▓   ▓▓▓   ▓▓   ▓▓   ▓▓   ▓',
	'█   █████   ███   █    ████   ██████   █    █    ██   ████   ████',
	'██████████████████████████   ████████████████████████████████████',
	'\n',
].join('\n'));

inquirer
	.prompt([
		{
			type: 'list',
			name: 'whatToDo',
			message: 'What do you want to do? (use your arrow keys)',
			choices: ['Start the bot', 'Start the RPC ad', 'Register Commands', 'Update (using ' + 'git'.bgGray + ')', 'Quit'],
		},
	])
	.then(answer => {
		if (answer.whatToDo == 'Start the bot') {
			console.info('Attempt to start the bot...');

			require('./src/index');
		}

		if (answer.whatToDo == 'Start the RPC ad') {
			console.info('Attempt to start the RPC...');

			require('./rpc_ad/index');
		}

		if (answer.whatToDo == 'Register Commands') {
			require('./src/deploy-commands');
		}

		if (answer.whatToDo == 'Update (using ' + 'git'.bgGray + ')') {
			console.info('Attempt to update using git...');

			let exec = require('child_process').exec,
				update;

			// eslint-disable-next-line no-unused-vars
			update = exec('git pull && yarn');

			console.info('✔️ Successfully updated and installed dependencies');
			console.info('Ending job...');
		}

		if (answer.whatToDo == 'Quit') {
			return;
		}
	});