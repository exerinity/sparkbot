const { MessageActionRow, MessageButton } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'wallpaper',
    description: 'Searches Unsplash for wallpapers',
    async execute(bot, message, args) {
        try {
        if (!args.length) return message.reply('provide a query');
        const query = args.join(' ');

        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=5&client_id=BydxOhrvX_ruXmRO3Ic4JYa82Dfb4LSChpbFueDr4xA`);
        const data = await response.json();

        if (!data || !data.results || data.results.length === 0) {
            return message.reply('No results');
        }

        const previousButton = new MessageButton()
            .setCustomId('previous')
            .setLabel('Previous')
            .setStyle('PRIMARY');
        const nextButton = new MessageButton()
            .setCustomId('next')
            .setLabel('Next')
            .setStyle('PRIMARY');

        const actionRow = new MessageActionRow().addComponents(previousButton, nextButton);
        let currentIndex = 0;

        const embed = createEmbed(data.results[0]);
        const initialMessage = await message.channel.send({ embeds: [embed], components: [actionRow] });

        const collector = initialMessage.createMessageComponentCollector();


        collector.on('collect', async (interaction) => {
            if (interaction.customId === 'previous') {
                currentIndex = (currentIndex - 1 + data.results.length) % data.results.length;
            } else if (interaction.customId === 'next') {
                currentIndex = (currentIndex + 1) % data.results.length;
            }

            const newEmbed = createEmbed(data.results[currentIndex]);
            await interaction.update({ embeds: [newEmbed] });
        });

        collector.on('end', () => {
            initialMessage.edit({ components: [] });
        });
    } catch (e) {
        console.log(e)
    }
    },
};

function createEmbed(image) {
    return {
        color: "23a55a",
        title: image.alt_description || 'Untitled',
        image: { url: image.urls.regular },
        author: {
            name: image.user.name,
            icon_url: image.user.profile_image.small,
            url: image.user.links.html,
        },
    };
}
