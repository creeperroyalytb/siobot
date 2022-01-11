const Discord = require("discord.js");

exports.run = (client, message, args) => {
    message.delete()
    
    let embed = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle("🏓 Pong!")
        .setFooter(`${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`)

    message.channel.send(embed)

}