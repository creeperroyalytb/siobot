const Discord = require("discord.js");

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

exports.run = async (client, message, args) => {
    message.delete()

    if(!client.checkPermissions(client.config.permissions.announce)) return

    var announceMessage = args.join(" ")

    const invalidMsg = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle("🚫 Please enter a valid announcement message!")
        .setDescription(`Usage - \`${client.config.prefix}announce <message>\``)
        .setFooter(`${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`)
    if (!announceMessage) {const fail = await message.channel.send(invalidMsg); wait(3000); fail.delete(); return}

    var embed = new Discord.RichEmbed()
        .setDescription(`${announceMessage}`)
        .setThumbnail(client.user.avatarURL)
        .setColor(client.config.colour)
        .setFooter(`${client.config.footer}\n${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`)
        .setAuthor(`${client.config.serverName}`, client.user.avatarURL)

    message.channel.send(embed);

    const log = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle(`🗒 Announcement`)
        .setDescription(`**User** - ${message.author} (${message.author.id})\n**Channel** - ${message.channel}\n**Message** - ${announceMessage}`)
        .setTimestamp(message.createdAt)
    client.logChannel.send(log)

}