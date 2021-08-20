const Command = require("../../structures/CommandClass");

module.exports = class SlashPerms extends Command {
    constructor(client) {
        super(client, {
            name: "slashperms",
            description: "Tests slash permissions. Requires Admin role.",
            type: "CHAT_INPUT",
            usage: "slashperms",
            defaultPermission: false,
            category: "Examples",
            permissions: ["Use Application Commands", "Send Messages", "Embed Links"]
        });
    }
    async run(client, interaction) {
        interaction.reply({ content: "Hello World! You're granted to use this **slash** command." });
    }
};