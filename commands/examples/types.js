const Command = require("../../structures/CommandClass");

const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = class Types extends Command {
    constructor(client) {
        super(client, {
            name: "types",
            description: "All option types (Excluding Sub commands and Sub command groups).",
            options: [
                {
                    name: "required",
                    type: "STRING",
                    description: "A required string value.",
                    required: true
                },
                {
                    name: "string",
                    type: "STRING",
                    description: "A optional string value.",
                    required: false
                },
                {
                    name: "choice",
                    type: "STRING",
                    description: "A optional string value, but uses a choice select.",
                    required: false,
                    choices: [
                        {
                            name: "Alice",
                            value: "alice"
                        },
                        {
                            name: "Bob",
                            value: "bob"
                        },
                        {
                            name: "Charlie",
                            value: "charlie"
                        }
                    ]
                },
                {
                    name: "number",
                    type: "NUMBER",
                    description: "A optional number value that accepts decimals, or as a whole.",
                    required: false
                },
                {
                    name: "integer",
                    type: "INTEGER",
                    description: "A optional integer value that only accepts a whole number.",
                    required: false
                },
                {
                    name: "boolean",
                    type: "BOOLEAN",
                    description: "A optional boolean value.",
                    required: false
                },
                {
                    name: "user",
                    type: "USER",
                    description: "A optional user value that returns a user object.",
                    required: false
                },
                {
                    name: "channel",
                    type: "CHANNEL",
                    description: "A optional channel value that returns a channel object.",
                    required: false
                },
                {
                    name: "role",
                    type: "ROLE",
                    description: "A optional role value that returns a role object.",
                    required: false
                },
                {
                    name: "mentionable",
                    type: "MENTIONABLE",
                    description: "A optional mentionable value that accepts users and roles.",
                }
            ],
            type: "CHAT_INPUT",
            usage: "types [options]",
            defaultPermission: true,
            category: "Examples",
            permissions: ["Use Application Commands", "Send Messages", "Embed Links"]
        });
    }
    async run(client, interaction) {
        const requiredValue = interaction.options.getString("required");
        const stringValue = interaction.options.getString("string");
        const choiceValue = interaction.options.getString("choice");
        const numberValue = interaction.options.getNumber("number");
        const integerValue = interaction.options.getInteger("integer");
        const booleanValue = interaction.options.getBoolean("boolean");
        const userValue = interaction.options.getUser("user");
        const channelValue = interaction.options.getChannel("channel");
        const roleValue = interaction.options.getRole("role");
        const mentionableValue = interaction.options.getMentionable("mentionable");

        console.log(mentionableValue);
        
        const embed = new MessageEmbed()
            .setTitle("**Slash Command Option Types**")
            .setColor(`#f67b63`)
            .setDescription(stripIndents`
            **Required Value:** ${requiredValue || "None"}
            **String Value:** ${stringValue || "None"}
            **Choice Value:** ${choiceValue || "None"}
            **Number Value:** ${numberValue || 0}
            **Integer Value:** ${integerValue || 0.0}
            **Boolean Value:** ${booleanValue || "N/A"}
            **User Value:** ${userValue ? userValue.username : "N/A"}
            **Channel Value:** ${channelValue ? channelValue.name : "N/A"}
            **Role Value:** ${roleValue ? roleValue.name : "N/A"}
            **Mentionable Value:** Check your console
            `);

        interaction.reply({ embeds: [embed] });
    }
};