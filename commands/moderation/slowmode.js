const Discord = require("discord.js");

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

exports.run = async (client, message, args) => {
    message.delete()

    timeScale = args.join(" ")

    if(!client.checkPermissions(client.config.permissions.slowmode)) return

    const invalidTimeScale = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle("🚫 Please enter a valid slowmode time!")
        .setDescription(`Usage - \`${client.prefix.config}slowmode <time in secs/off>\``)
        .setFooter(`${client.config.serverName} Moderation ➤ Command ran by ${message.author.username}`) 

    if (!timeScale){const fail = await message.channel.send(invalidTimeScale); wait(3000); fail.delete(); return}

    if (timeScale === "0" || timeScale === "off"){
        message.channel.setRateLimitPerUser(0)
        const slow = new Discord.RichEmbed()
            .setColor(client.config.colour)
            .setTitle(`🐌 Slowmode has been turned off`)
            .setFooter(`${client.config.serverName} Moderation ➤ Command ran by ${message.author.username}`) 
        message.channel.send(slow)
        return
    }

    var timeAsInt = parseInt(timeScale)

    if(!timeAsInt){const fail = await message.channel.send(invalidTimeScale); wait(3000); fail.delete(); return}

    message.channel.setRateLimitPerUser(timeScale);

    const slow = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle(`🐌 Slowmode has been set to **${timeScale}** seconds`)
      .setFooter(`${client.config.serverName} Moderation ➤ Command ran by ${message.author.username}`) 
    message.channel.send(slow)
    
    const log = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle(`🗒 Slowmode`)
      .setDescription(`**Staff Member** - ${message.author} (${message.author.id})\n**Channel** - ${message.channel} (${message.channel.id})\n**Time** - ${timeScale}`)
      .setTimestamp(message.createdAt)
    client.logChannel.send(log)


}