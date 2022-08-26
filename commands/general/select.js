const Command = require('../../structures/CommandClass');

const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');

module.exports = class Select extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('select')
				.setDescription('Examples of the Discord Select Menu component.')
				.setDMPermission(false),
			usage: 'select',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
		const selectMenuRow = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setPlaceholder('Select a color!')
					.setCustomId('selectColor')
					.setDisabled(false)
					.setMaxValues(3)
					.setOptions([
						{
							label: 'Red',
							value: 'red',
							description: '#ff0000',
							emoji: '🔴',
						},
						{
							label: 'Blue',
							value: 'blue',
							description: '#0000ff',
							emoji: '🔵',
						},
						{
							label: 'Green',
							value: 'green',
							description: '#00ff00',
							emoji: '🟢',
						},
						{
							label: 'Yellow',
							value: 'yellow',
							description: '#ffff00',
							emoji: '🟡',
						},
					]),
			);

		await interaction.reply({ content: 'What **color** is your favorite? *Use the dropdown to select your choice:*', components: [selectMenuRow] });

		const filter = i => i.customId === 'selectColor';

		await interaction.channel.awaitMessageComponent({ filter, time: 30000 }).then(async i => {
			selectMenuRow.components[0].setDisabled(true);
			selectMenuRow.components[0].setPlaceholder('Already selected a color!');

			return await i.update({ content: `You selected: ${i.values.map(v => `**${v}**`).join(', ')}`, components: [selectMenuRow] });
		}).catch(async () => {
			return await interaction.editReply({ content: 'Timing out as you didn\'t pick a color on time.', components: [] });
		});
	}
};