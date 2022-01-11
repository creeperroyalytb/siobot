const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete()

        let embed1 = new Discord.RichEmbed()
            .setColor(client.config.colour)
            .setTitle(`Checking Latency...`)
            .setFooter(`If this takes over 5 seconds,there is an issue with your host.`)
            .setFooter(`${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`)

        const latencyCheck = await message.channel.send(embed1)

        let latency = latencyCheck.createdTimestamp - message.createdTimestamp

        let embed2 = new Discord.RichEmbed()
            .setColor(client.config.colour)
            .setTitle(`__${client.config.botName} Latency__\n- Latency is ${latency}ms\n- API Latency is ${Math.round(client.ping)}ms`)
            .setFooter(`${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`)

        latencyCheck.edit(embed2)
}

