const fetch = require('node-fetch');
const Discord = require('discord.js');
const cheerio = require('cheerio');
const url = `https://fbi.paydaythegame.com/datafeed/datafeed-steamaccountinfo.php`;
module.exports = {
    name: "payday",
    async execute(bot, message, args) {
        const steamid = args[0];
        if (!steamid) return message.reply("provide a steamid");
        try {
            const formData = new URLSearchParams();
            formData.append('steamid', 'sparkfire298');
            formData.append('windowname', 'fbiwindowspawn26');

            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });

            const html = await response.text();
            const $ = cheerio.load(html);

            const level = $('p:contains("Level:")').text().replace('Level:', '').trim();
            const name = $('.fbiwindowcontentboxinnertitle1').text().replace('Armor and Equipment known to be used by the suspect', '').replace('Heist DataWeapon Statistics', '').trim();
            const timeSpent = $('p:contains("Time Spent Heisting:")').text().replace('Time Spent Heisting:', '').trim();
            const permalink = $('.fbipermalink input').val();

            const embed = new Discord.MessageEmbed()
                .setTitle(name)
                .setColor("#23a55a")
                .setURL(permalink)
                .addField("Level", level)
                .addField("Time Spent Heisting", timeSpent)
                .setFooter("this is a short summary of the data (i couldnt scrape much more), for more information, click the link")
            message.reply({ embeds: [embed] });
        } catch (e) {
            console.log(e);
            message.reply("error, service down/overwhelmed or malformed response");
        }
    }
}