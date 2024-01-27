const Discord = require('discord.js');
const fs = require('fs');

const bot = new Discord.Client({ 
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGES
    ]
});

const prefix = 's!';
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}`);
    bot.user.setActivity("Playing Playing Playing Playing Playing"); // lol
});

bot.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = bot.commands.get(commandName);

    if (!command) return;

    try {
        message.channel.sendTyping();
        command.execute(bot, message, args);
    } catch (error) {
        console.error(error);
        message.reply('An error occurred while executing the command.');
    }
});

bot.login();