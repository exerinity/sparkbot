module.exports = {
    name: "invite",
    description: "Invite the bot to your server",
    async execute(bot, message, args) {
        message.reply(`https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot%20applications.commands`);
    }
}