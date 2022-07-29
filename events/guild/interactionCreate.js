const Event = require('../../structures/EventClass');

const { InteractionType } = require('discord.js');

const defaultAutoComplete = require('../../assets/json/autocomplete.json');

module.exports = class InteractionCreate extends Event {
	constructor(client) {
		super(client, {
			name: 'interactionCreate',
			category: 'interactions',
		});
	}
	async run(interaction) {
		const client = this.client;

		if (interaction.type === InteractionType.ApplicationCommand) {
			const command = client.commands.get(interaction.commandName);

			if (interaction.user.bot) return;
			if (!interaction.inGuild() && interaction.type === InteractionType.ApplicationCommand) return interaction.reply({ content: 'You must be in a server to use commands.' });

			if (!command) return interaction.reply({ content: 'This command is unavailable. *Check back later.*', ephemeral: true }) && client.commands.delete(interaction.commandName);

			try {
				command.run(client, interaction);
			}
			catch (e) {
				console.log(e);
				return interaction.reply({ content: `An error has occurred.\n\n**\`${e.message}\`**` });
			}
		}

		if (interaction.type === InteractionType.ModalSubmit) {
			if (interaction.customId === 'prefixForm') {
				const prefix = interaction.fields.getTextInputValue('prefix');
				const reason = interaction.fields.getTextInputValue('reason');

				return await interaction.reply({ content: `Prefix has been set to: **\`${prefix}\`**\n**Reason:** ${reason}` });
			}
		}

		if (interaction.type === InteractionType.ApplicationCommandAutocomplete) {
			const focused = interaction.options.getFocused().toLowerCase();
			let filter;

			switch (interaction.commandName) {
			case 'autocomplete':
				filter = defaultAutoComplete.filter(option => option.value.toLowerCase().startsWith(focused));
				await interaction.respond(filter);
				break;
			}
		}
	}
};