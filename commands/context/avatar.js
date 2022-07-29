const Command = require('../../structures/CommandClass');

const { EmbedBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
module.exports = class Avatar extends Command {
	constructor(client) {
		super(client, {
			data: new ContextMenuCommandBuilder()
				.setName('Avatar')
				.setType(ApplicationCommandType.User),
			contextDescription: 'Fetches the avatar of a user.',
			usage: 'Avatar',
			category: 'Context',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
		const user = client.users.cache.get(interaction.targetId);

		const embed = new EmbedBuilder()
			.setTitle(`**${user.username}'s Avatar**`)
			.setColor(client.config.embedColor)
			.setImage(user.displayAvatarURL({ size: 2048 }));

		await interaction.reply({ embeds: [embed] });
	}
};