const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');
const { defaultColor } = require('../../config');
require('dotenv').config();

const activities = {
	// Stable
	'Watch YouTube': '880218394199220334',
	'Poker Night': '755827207812677713',
	'Fishington.io': '814288819477020702',
	'Betrayal.io': '773336526917861400',
	'Chess In The Park': '832012774040141894',
	'Doodle Crew': '878067389634314250',
	'Letter Tile': '879863686565621790',
	'Word Snacks': '879863976006127627',
	'Sketchy Artist': '879864070101172255',
	'Awkword': '879863881349087252',
	'SpellCast': '852509694341283871',
	// Dev
	'Old Youtube': '755600276941176913',
	'Poker Night Staging': '763116274876022855',
	'Poker Night Dev': '763133495793942528',
	'Poker QA': '801133024841957428',
	'Chess In the Park 2 Staging': '832012730599735326',
	'Chess In the Park 2 Dev': '832012586023256104',
	'Chess In the Park 2 QA': '832012815819604009',
	'Chess In the Park 3 Staging': '832012938398400562',
	'Chess In the Park 3 Dev': '832012682520428625',
	'Chess In the Park 3 QA': '832012894068801636',
	'Watch YouTube Dev': '880218832743055411',
	'iframe-playground': '880559245471408169',
	'Doodle Crew Dev': '878067427668275241',
	'Letter Tile Dev': '879863753519292467',
	'Word Snacks Dev': '879864010126786570',
	'Sketchy Artist Dev': '879864104980979792',
	'Awkword Dev': '879863923543785532',
	'Decoders Dev': '891001866073296967',
	'SpellCast Staging': '893449443918086174',
	'CG4 Dev': '832013108234289153',
	'CG4 Staging': '832025061657280566',
	'CG4 QA': '832025114077298718',
	'CG4 Prod': '832025144389533716',
	// Unnamed
	'Discord Game 14': '832025179659960360',
	'Discord Game 15': '832025219526033439',
	'Discord Game 16': '832025249335738428',
	'Discord Game 17': '832025333930524692',
	'Discord Game 18': '832025385159622656',
	'Discord Game 19': '832025431280320532',
	'Discord Game 20': '832025470685937707',
	'Discord Game 21': '832025799590281238',
	'Discord Game 22': '832025857525678142',
	'Discord Game 23': '832025886030168105',
	'Discord Game 24': '832025928938946590',
	'Discord Game 25': '832025993019260929',
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('activity')
		.setDescription('Start an activity')
		.addSubcommand(subcommand => subcommand
			.setName('stable')
			.setDescription('Start a stable activity (recommended)')
			.addChannelOption(option => option.setName('channel').setDescription('The channel where the activity should start in').setRequired(true))
			.addStringOption(option => option.setName('activity').setDescription('The activity to start').setRequired(true)
				.addChoice('Watch Youtube', 'Watch Youtube')
				.addChoice('Poker Night', 'Poker Night')
				.addChoice('Fishington.io', 'Fishington.io')
				.addChoice('Betrayal.io', 'Betrayal.io')
				.addChoice('Chess In The Park', 'Chess In The Park')
				.addChoice('Doodle Crew', 'Doodle Crew')
				.addChoice('Letter Tile', 'Letter Tile')
				.addChoice('Word Snacks', 'Word Snacks')
				.addChoice('Sketchy Artist', 'Sketchy Artist')
				.addChoice('Awkword', 'Awkword')
				.addChoice('SpellCast', 'SpellCast')))
		.addSubcommand(subcommand => subcommand
			.setName('development')
			.setDescription('Start a dev activity (might be buggy)')
			.addChannelOption(option => option.setName('channel').setDescription('The channel the activity should start In').setRequired(true))
			.addStringOption(option => option.setName('activity').setDescription('The activity to start').setRequired(true)
				.addChoice('Old Youtube', 'Old Youtube')
				.addChoice('Poker Night Staging', 'Poker Night Staging')
				.addChoice('Poker Night Dev', 'Poker Night Dev')
				.addChoice('Poker QA', 'Poker QA')
				.addChoice('Chess In The Park 2 Staging', 'Chess In The Park 2 Staging')
				.addChoice('Chess In The Park 2 Dev', 'Chess In The Park 2 Dev')
				.addChoice('Chess In The Park 2 QA', 'Chess In The Park 2 QA')
				.addChoice('Chess In The Park 3 Staging', 'Chess In The Park 3 Staging')
				.addChoice('Chess In The Park 3 Dev', 'Chess In The Park 3 Dev')
				.addChoice('Chess In The Park 3 QA', 'Chess In The Park 3 QA')
				.addChoice('Watch YouTube Dev', 'Watch YouTube Dev')
				.addChoice('iframe-playground', 'iframe-playground')
				.addChoice('Doodle Crew Dev', 'Doodle Crew Dev')
				.addChoice('Letter Tile Dev', 'Letter Tile Dev')
				.addChoice('Word Snacks Dev', 'Word Snacks Dev')
				.addChoice('Sketchy Artist Dev', ' Sketchy Artist Dev')
				.addChoice('Awkword Dev', 'Awkword Dev')
				.addChoice('Decoders Dev', 'Decoders Dev')
				.addChoice('SpellCast Staging', 'SpellCast Staging')
				.addChoice('CG4 Dev', 'CG4 Dev')
				.addChoice('CG4 Staging', 'CG4 Staging')
				.addChoice('CG4 QA', 'CG4 QA')
				.addChoice('CG4 Prod', 'CG4 Prod')))
		.addSubcommand(subcommand => subcommand
			.setName('unnamed')
			.setDescription('Start an unnamed activity (THE MOST DOESN\'T WORK!)')
			.addChannelOption(option => option.setName('channel').setDescription('The channel the activity should start In').setRequired(true))
			.addStringOption(option => option.setName('activity').setDescription('The activity to start').setRequired(true)
				.addChoice('Discord Game 14', 'Discord Game 14')
				.addChoice('Discord Game 15', 'Discord Game 15')
				.addChoice('Discord Game 16', 'Discord Game 16')
				.addChoice('Discord Game 17', 'Discord Game 17')
				.addChoice('Discord Game 18', 'Discord Game 18')
				.addChoice('Discord Game 19', 'Discord Game 19')
				.addChoice('Discord Game 20', 'Discord Game 20')
				.addChoice('Discord Game 21', 'Discord Game 21')
				.addChoice('Discord Game 22', 'Discord Game 22')
				.addChoice('Discord Game 23', 'Discord Game 23')
				.addChoice('Discord Game 24', 'Discord Game 24')
				.addChoice('Discord Game 25', 'Discord Game 25'))),
	async execute(interaction) {
		const channel = (!interaction.options.getChannel('channel')) ? interaction.member.voice.channel : interaction.options.getChannel('channel');
		const activity = interaction.options.getString('activity');

		if (channel.type !== 'GUILD_VOICE') {
			return await interaction.reply({ content: 'You need to specifiy a valid voicechannel In order to create an activity', ephemeral: true });
		}

		await fetch(`https://discord.com/api/v9/channels/${channel.id}/invites`, {
			method: 'POST',
			body: JSON.stringify({
				max_age: 86400,
				max_uses: 0,
				target_application_id: activities[activity],
				target_type: 2,
				temporary: false,
				validate: null,
			}),
			headers: {
				Authorization: `Bot ${process.env.TOKEN}`,
				'Content-Type': 'application/json',
			},
		}).then(response => response.json())
			.then(data => {
				const image = new MessageAttachment('./assets/rocket.png', 'rocket.png');
				const embed = new MessageEmbed()
					.setColor(defaultColor)
					.setThumbnail('attachment://rocket.png')
					.setTitle('Created Activity')
					.setDescription(`Successfully created an activity for <#${channel.id}>!`)
					.addField('Activity', activity)
					.addField('Please Note', 'The invites just work for Desktop as of right now :(');

				const row = new MessageActionRow()
					.addComponents(
						new MessageButton()
							.setURL(`https://discord.com/invite/${data.code}`)
							.setLabel('Start/Join')
							.setStyle('LINK'),
					);

				return interaction.reply({ files: [image], embeds: [embed], components: [row], ephemeral: true });
			});

	},
};