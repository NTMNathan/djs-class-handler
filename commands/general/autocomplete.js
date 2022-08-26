const Command = require('../../structures/CommandClass');

const { SlashCommandBuilder } = require('discord.js');

module.exports = class Button extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('autocomplete')
				.setDescription('Examples of Autocomplete.')
				.setDMPermission(false)
				.addStringOption((str) =>
					str
						.setName('device')
						.setDescription('What device would you want to pick?')
						.setRequired(true)
						.setAutocomplete(true),
				),
			usage: 'autocomplete',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
		const device = interaction.options.getString('device');

		return await interaction.reply(`Your picked device: **${device}**`);
	}
};