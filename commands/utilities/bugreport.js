const Discord = require("discord.js");

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

exports.run = async (client, message, args) => {
    message.delete()

    let bug = args.join(" ");

    var noBug = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle("🚫 Please enter a valid bug")
        .setDescription(`Usage - \`${client.config.prefix}bugreport <bug>\``)
        .setFooter(`${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`)

    if(!args.join(" ")) {const fail = await message.channel.send(noBug); wait(3000); fail.delete(); return} 

    var confirm = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle("✅ Bug report sent")
        .setFooter(`${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`)
    const fail = await message.channel.send(confirm); wait(3000); fail.delete()

    let bugEmbed = new Discord.RichEmbed()
        .setTitle(`🐛 Bug Report`)
        .setColor(client.config.colour)
        .setDescription(bug)
        .setFooter(`Repoted By ${message.author.username}`)
        .setTimestamp(message.createdAt)
    client.bugChannel.send(bugEmbed)

    const log = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle(`🗒 Bug Report`)
        .setDescription(`**User** - ${message.author} (${message.author.id})\n**Channel** - ${message.channel}\n**Bug** - ${bug}`)
        .setTimestamp(message.createdAt)
    client.logChannel.send(log)

}