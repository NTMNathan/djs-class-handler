module.exports = class Command {
	constructor(client, meta = {}) {
		this.client = client;
		this.data = meta.data;
		this.contextDescription = meta.contextDescription || null;
		this.usage = meta.usage || this.name;
		this.category = meta.category || 'Info';
		this.permissions = meta.permissions || ['Use Application Commands', 'Send Messages', 'Embed Links'];
	}

	async run() {
		throw new Error(`The Slash Command "${this.name}" does not provide a run method.`);
	}
};