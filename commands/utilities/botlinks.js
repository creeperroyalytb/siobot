const Discord = require("discord.js");

exports.run = (client, message, args) => {
    message.delete()

    let bot = new Discord.RichEmbed()
        .setAuthor("Zeltux","https://cdn.discordapp.com/attachments/632238663094370366/632916675808854026/profile.png")
        .setTitle("Zeltux - Quick Links")
        .setColor(`#FF0062`)
        .addField(`Website`,`[Website](https://zeltux.net)`, true)
        .addField(`GitHub`,`[Github](https://github.com/Craftymatt2/Zeltux)`, true)
        .addField(`Wiki`,`[Wiki](https://github.com/Craftymatt2/Zeltux/wiki)`, true)
        .addField(`MC Market`,`[MC Market](https://www.mc-market.org/resources/12800/)`, true)
        .addField(`Marketplace`,`[Marketplace](https://www.zeltux.net/marketplace/resources/)`, true)
        .addField(`Discord`,`[Discord](https://discord.gg/hXKuUYM)`, true)
        .setFooter(`© Zeltux | Owned by Matt | Developed by Matt, Azono & amaan\n${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`,"https://cdn.discordapp.com/attachments/632238663094370366/632916675808854026/profile.png")

    message.channel.send(bot)
}