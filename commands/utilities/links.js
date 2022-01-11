const Discord = require("discord.js");

exports.run = (client, message, args) => {
    message.delete()
    
    links = client.config.online

    let embed = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle(`📎 **${client.config.serverName} Usefull Links**`)
        .setFooter(`${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`)

    let desc = ""

    if(links.website){desc += `- [Website](${links.website})\n`}
    if(links.forums){desc += `- [Forums](${links.forums})\n`}
    if(!desc){desc += `We don't have any links yet!`}

    embed.setDescription(desc)
    message.channel.send(embed)


}