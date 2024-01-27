module.exports = {
    name: "coffee",
    async execute(bot, message, args) {
        const fetch = require('node-fetch');
        const Discord = require('discord.js');
        var endpoint = 'https://coffee.alexflipnote.dev/random.json';
        const url = endpoint;
        try {
            const response = await fetch(url);
            const json = await response.json();
            message.reply(json.file)

        } catch (e) {
            console.log(e);
            message.reply('**Error**, no coffee for you :(');
        }
    }
}