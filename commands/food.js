const fetch = require('node-fetch');
const Discord = require('discord.js'); 
module.exports = {
    name: "food",
    async execute(bot, message, args) {
        var endpoint = 'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=5aIwZESTh28oAq2i6Q4gLJcKLTgdAWaKQ7pJtuXa&query=';
        const food = args.join(' ');
        const url = endpoint + food;
        try {
            const response = await fetch(url);
            const json = await response.json();
            const foodData = json.foods[0];
            const foodEmbed = new Discord.MessageEmbed()
                .setTitle(foodData.description)
                .setColor("#23a55a")
                .setFooter('data provided by U.S. DEPARTMENT OF AGRICULTURE, which is no longer being updated, and may be incorrect.')
                .setAuthor(foodData.dataType + foodData.foodCategory)
                .setDescription(`
                    **Ingredients:** ${foodData.ingredients}
                    **Calories:** ${foodData.foodNutrients[3].value}${foodData.foodNutrients[3].unitName}
                    **Fat:** ${foodData.foodNutrients[1].value}${foodData.foodNutrients[1].unitName}
                    **Carbohydrates:** ${foodData.foodNutrients[2].value}${foodData.foodNutrients[2].unitName}
                    **Protein:** ${foodData.foodNutrients[0].value}${foodData.foodNutrients[0].unitName}
                    **Package weight:** ${foodData.packageWeight}
                    **Rating:** ${foodData.score}
                `);
            message.reply({ embeds: [foodEmbed]})
        } catch (e) {
            console.log(e);
            message.channel.send('Error');
        }
    }
}