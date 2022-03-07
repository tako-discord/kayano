const { SlashCommandBuilder, bold } = require('@discordjs/builders');
const { Permissions, MessageActionRow, MessageSelectMenu, MessageEmbed, MessageAttachment } = require('discord.js');
const { noPermissionText, defaultColor } = require('../../config');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reactionrole')
		.setDescription('Sends a message and adds a dropdown menu to select roles to it')
		.addStringOption(option => option.setName('title').setDescription('The title of the message').setRequired(true))
		.addStringOption(option => option.setName('description').setDescription('The description of the message').setRequired(true))
		.addBooleanOption(option => option.setName('embed').setDescription('If the message should be send as an embed or not').setRequired(true))
		.addRoleOption(option => option.setName('role_1').setDescription('A role to add').setRequired(true))
		.addNumberOption(option => option.setName('max_values').setDescription('The maximum of roles a user can pick (Default: 0/infinite)'))
		.addRoleOption(option => option.setName('role_2').setDescription('A role to add'))
		.addRoleOption(option => option.setName('role_3').setDescription('A role to add'))
		.addRoleOption(option => option.setName('role_4').setDescription('A role to add'))
		.addRoleOption(option => option.setName('role_5').setDescription('A role to add'))
		.addRoleOption(option => option.setName('role_6').setDescription('A role to add'))
		.addRoleOption(option => option.setName('role_7').setDescription('A role to add'))
		.addRoleOption(option => option.setName('role_8').setDescription('A role to add'))
		.addRoleOption(option => option.setName('role_9').setDescription('A role to add'))
		.addRoleOption(option => option.setName('role_10').setDescription('A role to add')),
	async execute(interaction) {
		if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
			return await interaction.reply({ content: noPermissionText, ephemeral: true });
		}

		const role1 = interaction.options.getRole('role_1');
		const role2 = interaction.options.getRole('role_2');
		const role3 = interaction.options.getRole('role_3');
		const role4 = interaction.options.getRole('role_4');
		const role5 = interaction.options.getRole('role_5');
		const role6 = interaction.options.getRole('role_6');
		const role7 = interaction.options.getRole('role_7');
		const role8 = interaction.options.getRole('role_8');
		const role9 = interaction.options.getRole('role_9');
		const role10 = interaction.options.getRole('role_10');

		const roles = [
			role1,
		];

		if (role2) {roles.push(role2);}
		if (role3) {roles.push(role3);}
		if (role4) {roles.push(role4);}
		if (role5) {roles.push(role5);}
		if (role6) {roles.push(role6);}
		if (role7) {roles.push(role7);}
		if (role8) {roles.push(role8);}
		if (role9) {roles.push(role9);}
		if (role10) {roles.push(role10);}

		if (role1.name == '@everyone') {return interaction.reply({ content: '@everyone is not a valid role', ephemeral: true });}
		if (role2) {
			if (role2.name == '@everyone') {return interaction.reply({ content: '@everyone is not a valid role', ephemeral: true });}
		}
		if (role3) {
			if (role3.name == '@everyone') {return interaction.reply({ content: '@everyone is not a valid role', ephemeral: true });}
		}
		if (role4) {
			if (role4.name == '@everyone') {return interaction.reply({ content: '@everyone is not a valid role', ephemeral: true });}
		}
		if (role5) {
			if (role5.name == '@everyone') {return interaction.reply({ content: '@everyone is not a valid role', ephemeral: true });}
		}
		if (role6) {
			if (role6.name == '@everyone') {return interaction.reply({ content: '@everyone is not a valid role', ephemeral: true });}
		}
		if (role7) {
			if (role7.name == '@everyone') {return interaction.reply({ content: '@everyone is not a valid role', ephemeral: true });}
		}
		if (role8) {
			if (role8.name == '@everyone') {return interaction.reply({ content: '@everyone is not a valid role', ephemeral: true });}
		}
		if (role9) {
			if (role9.name == '@everyone') {return interaction.reply({ content: '@everyone is not a valid role', ephemeral: true });}
		}
		if (role10) {
			if (role10.name == '@everyone') {return interaction.reply({ content: '@everyone is not a valid role', ephemeral: true });}
		}

		let maxValues;
		if (interaction.options.getNumber('max_values')) { maxValues = interaction.options.getNumber('max_values'); }
		else { maxValues = roles.length; }

		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('auto_roles')
					.setPlaceholder('Nothing selected')
					.setMaxValues(maxValues)
					.setMinValues(0),
			);

		const menu = row.components[0];
		roles.forEach(role => {
			menu.addOptions([
				{
					label: role.name,
					value: role.id,
				},
			]);
		});

		if (interaction.options.getBoolean('embed') == true) {
			const image = new MessageAttachment('./assets/roles.png', 'roles.png');
			const embed = new MessageEmbed()
				.setColor(defaultColor)
				.setThumbnail('attachment://roles.png')
				.setTitle(interaction.options.getString('title'))
				.setDescription(interaction.options.getString('description'));

			await interaction.channel.send({ embeds: [embed], files: [image], components: [row] });
			await interaction.reply({ content: 'Successfully created reaction role menu!', ephemeral: true });
		}
		else {
			const msg = [
				bold(interaction.options.getString('title')),
				interaction.options.getString('description'),
			].join('\n');

			await interaction.reply({ content: 'Successfully created reaction role menu!', ephemeral: true });
			await interaction.channel.send({ content: msg, components: [row] });
		}

	},
};
