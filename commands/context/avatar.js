const Command = require('../../structures/CommandClass');

const { MessageEmbed } = require('discord.js');
const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const { ApplicationCommandType } = require('discord-api-types/v10');

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

		const embed = new MessageEmbed()
			.setTitle(`**${user.username}'s Avatar**`)
			.setColor(client.config.embedColor)
			.setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }));

		await interaction.reply({ embeds: [embed] });
	}
};