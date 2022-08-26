const Command = require('../../structures/CommandClass');

const { ApplicationCommandType, ContextMenuCommandBuilder } = require('discord.js');

module.exports = class Hello extends Command {
	constructor(client) {
		super(client, {
			data: new ContextMenuCommandBuilder()
				.setName('Hello')
				.setType(ApplicationCommandType.Message)
				.setDMPermission(false),
			contextDescription: 'Sends a message that greets you, with a present!',
			usage: 'Hello',
			category: 'Context',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
		await interaction.reply({ content: `Hello ${interaction.user}! Here, you should have a slice of vanilla cake 😊🍰\n\nMessage ID: ${interaction.targetId}` });
	}
};