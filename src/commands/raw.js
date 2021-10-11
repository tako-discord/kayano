const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('raw')
        .setDescription('Get the raw message content from a given message')
        .addChannelOption(option => option.setName('channel').setDescription('The channel the message is in (Don\'t use a category)').setRequired(true))
        .addStringOption(option => option.setName('message_id').setDescription('The ID of the message').setRequired(true)),

    async execute(interaction) {
        let channel = interaction.options.getChannel('channel');
        let messageID = interaction.options.getString('message_id');

        let fetchedMessage = await channel.messages.fetch(messageID);
        
        interaction.reply({ content: `\`\`\`${fetchedMessage.content}\`\`\``, ephemeral: true });
    }
};
