const Command = require("../../structures/CommandClass");

const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = class Ping extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            description: "Returns the bot ping.",
            type: "CHAT_INPUT",
            usage: "ping",
            defaultPermission: true,
            category: "Info",
            permissions: ["Use Application Commands", "Send Messages", "Embed Links"]
        });
    }
    async run(client, interaction) {
        const now = Date.now();
        await interaction.deferReply();

        const pingEmbed = new MessageEmbed()
            .setAuthor(`${client.user.username}'s Ping`, client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setColor("#fee75c")
            .setDescription(stripIndents`
            **⏱ Roundtrip:** ${Math.round(Date.now() - now)} ms
            **💓 API »** ${Math.round(client.ws.ping)} ms
            `);

        interaction.editReply({ embeds: [pingEmbed] });
    }
};