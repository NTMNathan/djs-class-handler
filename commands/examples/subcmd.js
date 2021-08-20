const Command = require("../../structures/CommandClass");

const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = class Avatar extends Command {
    constructor(client) {
        super(client, {
            name: "avatar",
            description: "Returns a user's avatar.",
            options: [
                {
                    name: "me",
                    description: "Returns your avatar",
                    type: "SUB_COMMAND"
                },
                {
                    name: "user",
                    description: "Returns a user's avatar",
                    type: "SUB_COMMAND",
                    options: [
                        {
                            name: "user",
                            description: "The user to get the avatar from",
                            type: "USER",
                            required: true
                        }
                    ]
                }
            ],
            type: "CHAT_INPUT",
            usage: "avatar [sub command] [user]",
            defaultPermission: true,
            category: "Examples",
            permissions: ["Use Application Commands", "Send Messages", "Embed Links"]
        });
    }
    async run(client, interaction) {
        const command = interaction.options.getSubcommand(interaction.options.data[0].name);
        const user = interaction.options.getUser("user");

        const embed = new MessageEmbed()
            .setTitle(`**Avatar**`);

        switch(command) {
            case "me":
                embed.setColor("#3adec0");
                embed.setImage(interaction.user.displayAvatarURL({ dynamic: true, size: 2048 }));

                interaction.reply({ embeds: [embed] });
            break;
            case "user":
                embed.setColor("#7792ff");
                embed.setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }));

                interaction.reply({ embeds: [embed] });
            break;
        }
    }
};