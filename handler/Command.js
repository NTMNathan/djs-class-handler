const BaseCommand = require("../structures/CommandClass");
const path = require("path");
const { readdir, lstat } = require("fs").promises;

module.exports = class CommandClass {
    constructor(client) {
        this.client = client;
    }

    async build(dir) {
        const filePath = path.join(__dirname, dir);
        const files = await readdir(filePath);

        const registeredCommand = await this.client.application.commands.fetch();

        for (const file of files) {
            const stat = await lstat(path.join(filePath, file));
            if (stat.isDirectory()) this.build(path.join(dir, file));
            if (file.endsWith(".js")) {
                const Command = require(path.join(filePath, file));

                if (Command.prototype instanceof BaseCommand) {
                    const cmd = new Command(this.client);
                    this.client.commands.set(cmd.name, cmd);

                    registeredCommand.find(c => cmd.name === c.name);

                    if (!registeredCommand || registeredCommand.description !== cmd.description || registeredCommand.options.length !== (cmd.options.length < 0) || !registeredCommand.options.every(option => cmd.options.find(o => option.name === o.name && option.type === o.type && option.description === o.description && option.choices.length === o.choices.length && option.choices.every(choice => o.choices.find(c => c.name === choice.name && c.value === choice.value)) !== false))) {
                        await this.client.guilds.cache.get(this.client.config.serverId).commands.create(cmd);
                    }
                }
            }
        }
    }
}