const BaseEvent = require("../structures/EventClass");
const path = require("path");
const fs = require("fs").promises;

module.exports = class EventClass {
    constructor(client) {
        this.client = client;
    }

    async build(dir) {
        const filePath = path.join(__dirname, dir);
        const files = await fs.readdir(filePath);

        for (const file of files) {
            const stat = await fs.lstat(path.join(filePath, file));
            if (stat.isDirectory()) this.build(path.join(dir, file));
            if (file.endsWith(".js")) {
                const Event = require(path.join(filePath, file));
                if (Event.prototype instanceof BaseEvent) {
                    const event = new Event(this.client);
                    this.client.events.set(event.name, event);
                    event.once ? this.client.once(event.name, event.run.bind(event)) : this.client.on(event.name, event.run.bind(event));
                }
            }
        }
    }
};