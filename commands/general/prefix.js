const Command = require('../../structures/CommandClass');

const { Modal, MessageActionRow, TextInputComponent } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = class Prefix extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('prefix')
				.setDescription('Sets a new bot prefix (testing modals)'),
			usage: 'prefix',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
		const prefixModal = new Modal()
			.setTitle('Set Bot Prefix')
			.setCustomId('prefixForm')
			.addComponents(
				new MessageActionRow()
					.addComponents(
						new TextInputComponent()
							.setLabel('Prefix')
							.setCustomId('prefix')
							.setStyle('SHORT')
							.setMinLength(1)
							.setMaxLength(5)
							.setRequired(true)
							.setPlaceholder('Enter a new prefix. Make sure it\'s easy to remember!'),
					),
			);

		await interaction.showModal(prefixModal);
	}
};