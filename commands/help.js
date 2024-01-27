module.exports = {  
    name: 'help',
    description: 'ha ha ha ha',
    async execute(bot, message, args) {
        const commands = bot.commands; 
        const commandNames = commands.map(command => command.name);
        message.reply("```sparkbot resurrection - 2024\nCommands:\n"+commandNames.join("\n")+"```");

    }
}