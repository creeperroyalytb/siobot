const Discord = require("discord.js");
const weather = require("weather-js")

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

exports.run = async (client, message, args) => {
    message.delete()
    
    const invalidLocation = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle("🚫 Please Enter A Valid Location!")

    weather.find({search: args.join(" "), degreeType: 'C'}, async function (err, result) { 
    if (result === undefined || result.length === 0) {const fail = await message.channel.send(invalidLocation); wait(3000); fail.delete(); return}

    var current = result[0].current
    var location = result[0].location

    const weatherembed = new Discord.RichEmbed()
        .setDescription(`😎 **${current.skytext}**`)
        .setAuthor(`🌞 Weather for ${current.observationpoint}`)
        .setThumbnail(current.imageUrl) 
        .setColor(client.config.colour)
        .addField('⏰ Timezone', `UTC${location.timezone}`, true)
        .addField('Degree Type', location.degreetype, true) 
        .addField('🌡 Temperature', `${current.temperature} Degrees`, true)
        .addField('Feels Like', `${current.feelslike} Degrees`, true)
        .addField('🌪 Winds', current.winddisplay, true)
        .addField('Humidity', `${current.humidity}%`, true)
        .setFooter(`${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`)
    
    message.channel.send(weatherembed)})

}