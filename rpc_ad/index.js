const RPC = require('discord-rpc');
const rpc = new RPC.Client({ transport: 'ipc' });

rpc.on('ready', () => {
	rpc.setActivity({
		details: 'The only bot you\'ll need',
		largeImageKey: 'icon',
		largeImageText: 'Icon',
		buttons: [
			{ label: 'Invite the bot!', url: 'https://discord.com/api/oauth2/authorize?client_id=878366398269771847&permissions=8&scope=applications.commands%20bot' },
			{ label: 'Github Org', url: 'https://github.com/kayano-bot' },
		],
	});
	console.log('\x1b[1m\x1b[96m[Kayano RPC]\x1b[0m\x1b[0m RPC active');
});

rpc.login({ clientId : '878366398269771847' }).catch(console.error);