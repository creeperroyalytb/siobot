const Discord = require("discord.js");

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

exports.run = async (client, message, args) => {
    message.delete()

    let suggestion = args.join(" ");

    var noSuggestion = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle("🚫 Please enter a valid suggestion")
        .setDescription(`Usage - \`${client.config.prefix}suggest <suggestion>\``)
        .setFooter(`${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`)

    if(!args.join(" ")) {const fail = await message.channel.send(noSuggestion); wait(3000); fail.delete(); return} 

    var confirm = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle("✅ Suggestion sent")
        .setFooter(`${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`)
    const fail = await message.channel.send(confirm); wait(3000); fail.delete()

    let suggestEmbed = new Discord.RichEmbed()
        .setTitle(`🔗 New Suggestion`)
        .setColor(client.config.colour)
        .setDescription(suggestion)
        .setThumbnail(client.user.displayAvatarURL)
        .setFooter(`${client.config.serverName} Utilities ➤ Suggestion by ${message.author.username}`)
        .setTimestamp(message.createdAt)

    client.suggestionChannel.send(suggestEmbed).then(function (message) {message.react(`✅`).then(() => {message.react(`❎`)})})

    const log = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle(`🗒 Suggestion`)
        .setDescription(`**User** - ${message.author} (${message.author.id})\n**Channel** - ${message.channel}\n**Suggestion** - ${suggestion}`)
        .setTimestamp(message.createdAt)
    client.logChannel.send(log)

}