const Event = require("../../structures/EventClass");
const CommandHandler = require("../../handler/Command");

module.exports = class ReadyEvent extends Event {
    constructor(client) {
        super(client, {
            name: "ready",
            once: true
        });
    }
    async run() {
        const client = this.client;

        new CommandHandler(client).build("../commands").then(() => console.log(`Slash Commands and Context Menu Options are now loaded.`));

        const commands = await client.guilds.cache.get(client.config.serverId).commands.fetch();
        commands.filter(async (r) => {
            if (r.defaultPermission === false) {
                const permissions = [
                    {
                        id: client.config.adminRoleId,
                        type: "ROLE",
                        permission: true
                    },
                ];

                await r.permissions.set({ permissions });
            }
        });

        client.user.setActivity(`👋 Hello World!`, { type: "PLAYING" });

        console.log(`Discord Bot is now online with ${client.users.cache.size} users and ${client.guilds.cache.size} servers.`);
    }
};