module.exports = class Command {
    constructor(client, meta = {}) {
        this.client = client;
        this.name = meta.name;
        this.type = meta.type;
        this.description = meta.description || null;
        this.options = meta.options || [];
        this.defaultPermission = meta.defaultPermission;
        this.contextDescription = meta.contextDescription;
        this.usage = meta.usage || this.name;
        this.category = meta.category || "Info";
        this.permissions = meta.permissions || ["Use Application Commands", "Send Messages", "Embed Links"];
    }

    async run(message, run) {
        throw new Error(`The Slash Command "${this.name}" does not provide a run method.`);
    }
};