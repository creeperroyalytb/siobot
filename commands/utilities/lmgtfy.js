const Discord = require("discord.js");
const encode = require('strict-uri-encode')

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

exports.run = async (client, message, args) => {
    message.delete()

    let question = encode(args.join(''))
    let q = args.join(" ")

    const invalidLMGTFY = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle("🚫 Please enter a valid question to google!")
        .setDescription(`Usage - \`${client.config.prefix}lmgtfy <question>\``)
        .setFooter(`${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`)

    if (!q) {const fail = await message.channel.send(invalidLMGTFY); wait(3000); fail.delete(); return}

    let link = `https://www.lmgtfy.com/?q=${question}`

    embedLink = new Discord.RichEmbed()
        .setTitle(`LMGTFY`)
        .setDescription(`${q}\n${link}`)
        .setTimestamp(message.createdAt)
        .setColor(client.config.colour)
        .setFooter(`${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`)

    message.channel.send(embedLink)

}