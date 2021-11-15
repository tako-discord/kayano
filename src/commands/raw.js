const { ContextMenuCommandBuilder, codeBlock } = require('@discordjs/builders');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('Get Raw Message')
		.setType(3),
	async execute(interaction) {
		const message = interaction.options.getMessage('message');

		await interaction.reply({ content: codeBlock(message.content), ephemeral: true });
	},
};
