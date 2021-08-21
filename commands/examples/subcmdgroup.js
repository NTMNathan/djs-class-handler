const Command = require("../../structures/CommandClass");

const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = class Food extends Command {
    constructor(client) {
        super(client, {
            name: "food",
            description: "Returns emojis of a type of food.",
            options: [
                {
                    name: "fruit",
                    description: "Returns a fruit emoji",
                    type: "SUB_COMMAND_GROUP",
                    options: [
                        {
                            name: "apple",
                            description: "It fell from a tree!",
                            type: "SUB_COMMAND"
                        },
                        {
                            name: "banana",
                            description: "Don't slip!",
                            type: "SUB_COMMAND"
                        },
                        {
                            name: "pear",
                            description: "Yum!",
                            type: "SUB_COMMAND"
                        }
                    ]
                },
                {
                    name: "vegetable",
                    description: "Returns a vegetable emoji",
                    type: "SUB_COMMAND_GROUP",
                    options: [
                        {
                            name: "type",
                            description: "The type of vegetable",
                            type: "SUB_COMMAND",
                            options: [
                                {
                                    name: "name",
                                    description: "The name of the vegetable",
                                    type: "STRING",
                                    required: true,
                                    choices: [
                                        {
                                            name: "carrot",
                                            value: "carrot"
                                        },
                                        {
                                            name: "potato",
                                            value: "potato"
                                        },
                                        {
                                            name: "tomato",
                                            value: "tomato"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            type: "CHAT_INPUT",
            usage: "fruit [sub command] [options]",
            defaultPermission: true,
            category: "Examples",
            permissions: ["Use Application Commands", "Send Messages", "Embed Links"]
        });
    }
    async run(client, interaction) {
        const group = interaction.options.getSubcommandGroup(interaction.options.data[0].name);
        const subcommand = interaction.options.getSubcommand(interaction.options.data[0].options[0].name);
        const choice = interaction.options.getString("name");

        switch(group) {
            case "fruit":
                switch(subcommand) {
                    case "apple":
                        interaction.reply("Apple - 🍎");
                    break;
                    case "banana":
                        interaction.reply("Banana - 🍌");
                    break;
                    case "pear":
                        interaction.reply("Pear - 🍐");
                    break;
                }
            break;
            case "vegetable":
                switch(choice) {
                    case "carrot":
                        interaction.reply("Carrot - 🥕");
                    break;
                    case "potato":
                        interaction.reply("Potato - 🥔");
                    break;
                    case "tomato":
                        interaction.reply("Tomato - 🍅");
                    break;
                }
            break;
        }
    }
};