const Discord = require("discord.js");

exports.run = (client, message, args) => {
    message.delete()
    
    links = client.config.social

    let embed = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle(`🗯 **${client.config.serverName} Social Media**`)
        .setFooter(`${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`)

    let desc = ""

    if(links.facebook){desc += `- [Facebook](${links.facebook})\n`}
    if(links.twitter){desc += `- [Twitter](${links.twitter})\n`}
    if(links.instagram){desc += `- [Instagram](${links.instagram})\n`}
    if(links.youtube){desc += `- [YouTube](${links.youtube})\n`}
    if(links.twitch){desc += `- [Twitch](${links.twitch})\n`}
    if(!desc){desc += `We don't have any social media yet!`}

    embed.setDescription(desc)
    message.channel.send(embed)


}