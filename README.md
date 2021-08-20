# Discord Command Handler
A Discord.js Command Handler example using Slash Commands and Context Menus.

## Features
- 🖱 Using Classes
- 👀 Examples for Top Level, Sub Commands and Sub Command Groups
- 🔐 Examples for Permissions
- 👍 Automated Command Creation System
- ✅ Easy to setup
- 💻 Stable and 99.9% Bug Free

## Setup
1. Create a folder on your computer, then type the following console command to clone this repository.
```bash
git clone https://github.com/NTMNathan/djs-command-handler
```

2. Create a Discord Application and name it.

![bot create](https://i.imgur.com/luHPTGL.png "Step 2")

3. Rename `example.env` to `.env` and `example.config` to `config.js` and fill the required values from the Discord **Bot** Page. **Do not show anyone these!**

4. Install Node.js v16.6 or higher by selecting the **Current** tab, and then **"OS Name" Installer**. [Click here](https://nodejs.org/en/download/current/) for the download page.

![nodejs](https://i.imgur.com/mtJcz5E.png "Step 4")

5. Install all of the required NPM modules, and `Visual Studio C++ Build Tools` on Windows (if you have issues).
```bash
npm install
```

```bash
npm i -g --add-python-to-path --vs2015 --production windows-build-tools
```

6. Start the bot.
```bash
node index
```

## Usage
### Commands
This bot is designed to create and handle application commands automatically on start-up (using the `ready` event) which means you do not need to keep manually `set`ting and deploying commands. 
> There is a `clear` command which can let you clear all of the commands easily.


Also, the bot will only create commands for the server, so if you want to have application commands created globally; Replace the following line in `handler/Command.js`:

```js
this.client.guilds.cache.get(YOUR_SERVER_ID).create(cmd);
```
with

```js
this.client.application.commands.create(cmd);
```
> NOTE: You may need to wait an hour for the commands to create. 200 Global Command Creations per day is the limit.

**Command Folder Structure:**
- `context` folder contains the Context Menu commands. Change the `type` property to either `USER` or `MESSAGE` to specify the type of context menu. **`description`** must be `null` (using `contextDescription` instead) and `options` must have an empty array `[]`.
- `general` and other folders are slash commands. The `CHAT_INPUT` type must be used to specify the slash command.

### Permissions
Using the `defaultPermission` boolean in your command file, this will determine the permissions for both the Slash and Context Menu commands when the bot starts up (through the `ready` event). The bot may require another restart for it to work properly (even after commands are created).

> Read more about Application Command Permissions [here](https://discordjs.guide/interactions/slash-command-permissions.html)!

**Examples:**
```js
// User
const permissions = [
    {
        id: USER_ID,
        type: "USER",
        permission: true // Change to "false" to deny them command access
    }
];

await r.permissions.set({ permissions });

// Role
const permissions = [
    {
        id: ADMIN_ROLE_ID,
        type: "ROLE",
        permission: true
    }
];

await r.permissions.set({ permissions });
```

- `true`: Means that the command can be used by anyone.
- `false`: Means that the command will only be available to be select users and roles.

## 📚 Guides
- [Registering Slash Commands](https://discordjs.guide/interactions/registering-slash-commands.html)
- [Replying to Slash Commands](https://discordjs.guide/interactions/replying-to-slash-commands.html)
- [Slash Command Permissions](https://discordjs.guide/interactions/slash-command-permissions.html.html)
- [Handling Commands](https://discordjs.guide/command-handling/#individual-command-files)

## 👋 Support
If you have found an issue with using this command handler example or have any suggestions? Feel free to join the [NTM Discord Server](https://discord.gg/G2rb53z), send an [issue](https://github.com/NTMNathan/djs-command-handler/issues) or [pull request](https://github.com/NTMNathan/djs-command-handler/pulls). We'll be happy to help and take a look!

## ❤️ Thanks!
I am currently maintaining this repo during my spare time, so if you would like to support me. Feel free to do so by donating [here](https://buymeacoffee.com/ntmnathan) on Buy me a coffee.

Also, don't forget to star the repo! 😋

## ⚖️ License
The `MIT` license applies to this repository. Please see the `LICENSE` file to learn more.