const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const fs = require('fs');
require('dotenv').config();

const deploy = async () => {
	const commandData = [];

	fs.readdirSync('./commands/').forEach(async category => {
		const commands = fs.readdirSync(`./commands/${category}/`).filter(cmd => cmd.endsWith('.js'));

		for (const command of commands) {
			const Command = require(`./commands/${category}/${command}`);

			const cmd = new Command();

			const cmdData = cmd.data.toJSON();
			commandData.push(cmdData);
		}
	});

	const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

	try {
		const clientId = process.env.CLIENT_ID;
		const guildId = process.env.DEPLOY_GUILD_ID;

		console.log('Started refreshing Slash Commands and Context Menus...');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commandData },
		).then(() => {
			console.log('Slash Commands and Context Menus have now been deployed.');
		});
	}
	catch (e) {
		console.error(e);
	}
};

deploy();