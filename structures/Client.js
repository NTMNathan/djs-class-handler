const { Client, Constants, Intents } = require('discord.js');
const { Collection } = require('@discordjs/collection');
const CommandHandler = require('../handler/Command');
const EventHandler = require('../handler/Event');
const Util = require('./Util');

module.exports = class BotClient extends Client {
	constructor(...opt) {
		super({
			opt,
			partials: [
				Constants.PartialTypes.GUILD_MEMBER,
				Constants.PartialTypes.MESSAGE,
				Constants.PartialTypes.CHANNEL,
				Constants.PartialTypes.USER,
			],
			intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MEMBERS,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.GUILD_PRESENCES,
				Intents.FLAGS.GUILD_BANS,
				Intents.FLAGS.GUILD_INVITES,
				Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
				Intents.FLAGS.GUILD_INTEGRATIONS,
				Intents.FLAGS.GUILD_WEBHOOKS,
			],
			presence: {
				status: 'online',
				activity: [{ name: 'Bot is now starting up...', type: 'PLAYING' }],
			},
		});

		Object.defineProperty(this, 'location', { value: process.cwd() });

		this.config = require('../config');
		this.util = new Util(this);
		this.commands = new Collection();
		this.events = new Collection();

		new EventHandler(this).build('../events');
		new CommandHandler(this).build('../commands');

		Object.defineProperty(this, 'quitting', { value: false, writable: true });
		['beforeExit', 'SIGUSR1', 'SIGUSR2', 'SIGINT', 'SIGTERM'].map(event => process.once(event, this.exit.bind(this)));
	}

	async login() {
		await super.login(process.env.TOKEN);
	}

	exit() {
		if (this.quitting) return;
		this.quitting = true;
		this.destroy();
	}

	fetchCommand(cmd) {
		return this.commands.get(cmd);
	}

	async send(channelId, options) {
		const channel = await this.util.fetchChannel(channelId);
		if (!channel) return;
		if (!options) throw new TypeError('Cannot send an empty message');

		const { content, ...embed } = options;

		channel.send(content, embed);
	}
};