const Command = require('../../structures/CommandClass');

const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = class Button extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('button')
				.setDescription('Examples of the Discord Button component.')
				.setDMPermission(true),
			usage: 'button',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
		const buttonRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Cake')
					.setCustomId('btnCake')
					.setEmoji('🍰')
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setLabel('Cookie')
					.setCustomId('btnCookie')
					.setEmoji('🍪')
					.setStyle(ButtonStyle.Danger)
					.setDisabled(true),
				new ButtonBuilder()
					.setLabel('Ice Cream')
					.setStyle(ButtonStyle.Link)
					.setEmoji('🍨')
					.setURL('https://discord.com/'),
			);

		await interaction.reply({ content: 'Click on a **Button** to see what it does:', components: [buttonRow] });

		const filter = i => i.customId === 'btnCake';
		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

		let cakeEaten = 0;

		collector.on('collect', async i => {
			if (i.customId === 'btnCake') {
				if (i.user.id === interaction.user.id) {
					cakeEaten++;

					await i.update({ content: `Click on a **Button** to see what it does:\n**You ate cake!** 🍰 *[+${cakeEaten}]*` });
				}
				else {
					await i.reply({ content: `**${interaction.user.username}**, you are not permitted to click this button!`, ephemeral: true });
				}
			}
		});

		collector.on('end', async collected => {
			if (collected.size === 0) {
				return await interaction.editReply({ content: 'Didn\'t want any cake? Aw that\'s fine!', components: [] });
			}
			else {
				return await interaction.editReply({ content: `**Time is now up!** You ate cake \`${collected.size}\` times!`, components: [] });
			}
		});
	}
};