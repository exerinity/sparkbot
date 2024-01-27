module.exports = {  
    name: 'ping',
    description: 'Ping!',
    async execute(bot, message, args) {
        const start = Date.now();
        const m = await message.reply("hello anyone there");
        const end = Date.now();
        m.edit(`${end - start}ms -- message\n${bot.ws.ping}ms -- websocket`);
    }
}