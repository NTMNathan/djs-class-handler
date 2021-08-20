const Command = require("../../structures/CommandClass");

module.exports = class Clear extends Command {
    constructor(client) {
        super(client, {
            name: "clear",
            description: "Clears all the slash and context menu commands.",
            type: "CHAT_INPUT",
            usage: "clear",
            defaultPermission: false,
            category: "Examples",
            permissions: ["Use Application Commands", "Send Messages", "Embed Links"]
        });
    }
    async run(client, interaction) {
        await interaction.guild.commands.set([]);

        interaction.reply({ content: "Application Commands have been cleared. Bot needs to be restarted to have them created again." });
    }
};