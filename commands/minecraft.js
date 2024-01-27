const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "minecraft",
    description: "Look up a minecraft user",
    async execute(bot, message, args) {
        const username = args[0];
        if (!username) return message.reply("provide a username");
        const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
        const data = await response.json();
        if (!data) return message.reply("no users found");
        const uuid = data.id;
        const embed = new MessageEmbed()
            .setTitle(data.name)
            .setColor("#23a55a")
            .setURL(`https://namemc.com/profile/${uuid}`)
            .setThumbnail(`https://crafatar.com/avatars/${uuid}`)
            .addField("UUID", uuid);
        message.reply({ embeds: [embed] });
    }
}