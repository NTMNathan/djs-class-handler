const BaseCommand = require('../structures/CommandClass');
const path = require('path');
const { readdir, lstat } = require('fs').promises;

module.exports = class CommandClass {
	constructor(client) {
		this.client = client;
	}

	async build(dir) {
		const filePath = path.join(__dirname, dir);
		const files = await readdir(filePath);

		for (const file of files) {
			const stat = await lstat(path.join(filePath, file));
			if (stat.isDirectory()) this.build(path.join(dir, file));
			if (file.endsWith('.js')) {
				const Command = require(path.join(filePath, file));

				if (Command.prototype instanceof BaseCommand) {
					const cmd = new Command(this.client);

					const cmdData = cmd.data.toJSON();

					const cmdSet = {
						name: cmdData.name,
						description: cmdData.description,
						options: cmdData.options,
						defaultPermission: cmdData.default_permission,
						contextDescription: cmd.contextDescription,
						usage: cmd.usage,
						category: cmd.category,
						permissions: cmd.permissions,
						run: cmd.run,
					};

					this.client.commands.set(cmdSet.name, cmdSet);
				}
			}
		}
	}
};