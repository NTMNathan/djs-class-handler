const Event = require('../../structures/EventClass');

module.exports = class ReadyEvent extends Event {
	constructor(client) {
		super(client, {
			name: 'ready',
			once: true,
		});
	}
	async run() {
		const client = this.client;

		client.user.setActivity('👋 Hello World!', { type: 'PLAYING' });

		console.log(`Discord Bot is now online with ${client.users.cache.size} users and ${client.guilds.cache.size} servers.`);
	}
};