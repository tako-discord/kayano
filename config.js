// Text which will be shown when a member has no permission to use a specific command
const noPermissionText = 'You don\'t have the permission to use that command!';

// Text which will be shown when the bot has no permission to execute the command (cannot ban etc.)
const noBotPermissionText = 'I don\'t have the permission to execute your command!';

// Used for donators (defined in src/donators.js) in the userinfo
const donatorEmoji = '<:blobcatheart:873846489292619776>';
// Used for the developer (Pukima) in the userinfo
const developerEmoji = '<:blob_dev:891643826895212575>';
// Used for the owner (defined in .env) in the userinfo
const senseiEmoji = '<:verified:891645797874151445>';

// Used for embeds
const defaultColor = 'EF9F75';

// Used for the vote command
const voteLink = 'https://top.gg/bot/878366398269771847/vote';

// Flags used in the userinfo command
const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer',
};

// Ping messages used in the ping command
const pingMessages = ['Is this really my ping? 😟', 'Is this okay? I can\'t look! 😣', 'I hope it isn\'t bad! 🥺'];

module.exports = {
	noPermissionText,
	noBotPermissionText,
	donatorEmoji,
	developerEmoji,
	senseiEmoji,
	defaultColor,
	voteLink,
	flags,
	pingMessages,
};