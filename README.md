# Discord Command Handler
A Discord.js Command Class Handler example using Slash Commands and Context Menus.

## Features
- 🖱 Using Classes
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
node bot
```

## Usage

To create commands, you need to run the following command in the console:
```bash
npm run deploy
```

These will create a new set of commands in the server.

> NOTE: You may need to wait an hour for the commands to create. 200 Command Creates per day is the limit.

**Command Folder Structure:**
- `context` folder contains the Context Menu commands.
- `general` and other folders are slash commands.
## 📚 Guides
- [Creating commands](https://discordjs.guide/creating-your-bot/creating-commands.html)
- [Replying to Slash Commands](https://discordjs.guide/interactions/slash-commands.html#replying-to-slash-commands)
- [Handling Commands](https://discordjs.guide/creating-your-bot/command-handling.html#command-handling)

## 👋 Support
If you have found an issue with using this command handler example or have any suggestions? Feel free to join the [NTM Discord Server](https://discord.gg/G2rb53z), send an [issue](https://github.com/NTMNathan/djs-command-handler/issues) or [pull request](https://github.com/NTMNathan/djs-command-handler/pulls). We'll be happy to help and take a look!

## ❤️ Thanks!
I am currently maintaining this repo during my spare time, so if you would like to support me. Feel free to do so by donating [here](https://buymeacoffee.com/ntmnathan) on Buy me a coffee.

Also, don't forget to star the repo! 😋

## ⚖️ License
The `MIT` license applies to this repository. Please see the `LICENSE` file to learn more.
