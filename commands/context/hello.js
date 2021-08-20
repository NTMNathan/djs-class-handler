const Command = require("../../structures/CommandClass");

module.exports = class Hello extends Command {
    constructor(client) {
        super(client, {
            name: "Hello",
            type: "MESSAGE",
            defaultPermission: true,
            contextDescription: "Sends a message that greets you, with a present!",
            category: "Context",
            permissions: ["Use Application Commands", "Send Messages", "Embed Links"]
        });
    }
    async run(client, interaction) {
        await interaction.reply({ content: `Hello ${interaction.user}! Here, you should have a slice of vanilla cake 😊🍰` });
    }
};