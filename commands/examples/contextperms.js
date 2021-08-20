const Command = require("../../structures/CommandClass");

module.exports = class ContextPerms extends Command {
    constructor(client) {
        super(client, {
            name: "Context Perms",
            type: "USER",
            defaultPermission: false,
            contextDescription: "Tests context permissions. Requires Admin role.",
            category: "Context",
            permissions: ["Use Application Commands", "Send Messages", "Embed Links"]
        });
    }
    async run(client, interaction) {
        interaction.reply({ content: "Hello World! You're granted to use this **context menu** command." });
    }
};