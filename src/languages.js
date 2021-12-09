const lang = require('./i18n/lang.json');
const { supabase } = require('./supabase');

const guildLanguages = {};

const loadLanguages = async (client) => {
	for (const guild of client.guilds.cache) {
		const guildId = guild[0].toString();

		const { data } = await supabase
			.from('guilds')
			.select('language')
			.eq('guild_id', `${guildId}`);

		guildLanguages[guildId] = data[0].language ? data[0].language : 'en';
	}
};

const setLanguage = async (guild, language) => {
	guildLanguages[guild.id.toString()] = language;
};

const language = (guild, textId) => {
	if (!lang.translations[textId]) {
		throw new TypeError(`Unknown text ID "${textId}"`);
	}

	const translatedString = lang.translations[textId][guildLanguages[guild.id.toString()]];

	return translatedString ? translatedString : lang.translations[textId]['en'];
};

module.exports = {
	guildLanguages,
	loadLanguages,
	setLanguage,
	language,
};
