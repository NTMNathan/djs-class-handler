const { Client, GatewayIntentBits, Partials, ActivityType } = require('discord.js');
const { Collection } = require('@discordjs/collection');
const CommandHandler = require('../handler/Command');
const EventHandler = require('../handler/Event');
const Util = require('./Util');

module.exports = class BotClient extends Client {
	constructor(...opt) {
		super({
			opt,
			partials: [
				Partials.GuildMember,
				Partials.Message,
				Partials.Channel,
				Partials.User,
			],
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.GuildPresences,
				GatewayIntentBits.GuildBans,
				GatewayIntentBits.GuildEmojisAndStickers,
				GatewayIntentBits.GuildIntegrations,
			],
			presence: {
				status: 'online',
				activity: [{ name: 'Bot is now starting up...', type: ActivityType.Playing }],
			},
		});

		this.config = require('../config');
		this.util = new Util(this);
		this.commands = new Collection();
		this.events = new Collection();

		new EventHandler(this).build('../events');
		new CommandHandler(this).build('../commands');
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
};