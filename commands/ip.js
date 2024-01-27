const fetch = require('node-fetch');
const Discord = require('discord.js');
module.exports = {
    name: "ip",
    async execute(bot, message, args) {
        const ip = args[0];
        if (!ip) return message.reply("provide an ip");
        try {
            const response = await fetch(`https://ipwho.is/${ip}`);
            const data = await response.json();
            const embed = new Discord.MessageEmbed()
                .setTitle(data.ip)
                .setColor("#23a55a")
                .setFooter("* not precise, geolocation")
                .addFields(
                    { name: "Type", value: `[${data.type}](https://en.wikipedia.org/wiki/${data.type})` },
                    { name: "Internet Service Provider (ISP)", value: `[${data.connection.isp}](http://${data.connection.domain||"sparkfire298.com"})` },
                    { name: "Location\*", value: `${data.city}, ${data.region}, ${data.country} :flag_${data.country_code.toLowerCase()}:` },
                    { name: "Lat-Lon", value: `${data.latitude}, ${data.longitude}` },
                    { name: "Timezone", value: `${data.timezone.abbr} (${data.timezone.utc})` },
                    { name: "Time Now", value: `${data.timezone.current_time}` },
                );
                message.reply({ embeds: [embed]})
        } catch (e) {
            console.log(e);
            message.reply('no IP found, or request error');
        }
    }
}