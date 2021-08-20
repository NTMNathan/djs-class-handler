const Command = require("../../structures/CommandClass");

const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = class Help extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            description: "Returns command information.",
            options: [
                {
                    name: "command",
                    description: "The name of the command to pick.",
                    type: "STRING",
                    required: true,
                    choices: [
                        {
                            name: "Avatar",
                            value: "Avatar"
                        },
                        {
                            name: "User Info",
                            value: "User Info"
                        },
                        {
                            name: "Help",
                            value: "help"
                        },
                        {
                            name: "Ping",
                            value: "ping"
                        },
                        {
                            name: "Not Found",
                            value: "notfound"
                        }
                    ]                
                }
            ],
            type: "CHAT_INPUT",
            usage: "ping",
            defaultPermission: true,
            category: "Info",
            permissions: ["Use Application Commands", "Send Messages", "Embed Links"]
        });
    }
    async run(client, interaction) {
        const now = Date.now();

        const query = interaction.options.getString("command");

        if (query.toLowerCase()) {
            if (client.commands.has(query)) {
                const command = client.commands.get(query);

                const commandEmbed = new MessageEmbed()
                    .setTitle(`**\`${command.name}\`** Help`)
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
                    .setColor("#57f287")
                    .setDescription(stripIndents`
                    > ${command.contextDescription ? command.contextDescription : command.description}

                    **Usage:** ${command.contextDescription ? "Right-Click > Apps > " : "/"}${command.usage}
                    **Category:** ${command.category}
                    **Permissions Needed:** ${command.permissions[0] ? `${command.permissions.join(`, `)}` : "None"}
                    `)

                interaction.reply({ embeds: [commandEmbed] });
            } else {
                interaction.reply({ content: `Command \`${query}\` was not found.` });
            }
        }
    }
};