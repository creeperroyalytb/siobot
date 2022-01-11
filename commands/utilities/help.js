const Discord = require("discord.js");

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

exports.run = async (client, message, args) => {
    message.delete()
    
        function embed (msg) {
            let emb = new Discord.RichEmbed()
                .setColor(client.config.colour)
                .setAuthor(`${client.config.serverName} - Help`, client.user.avatarURL)
                .setDescription(`${msg}
                                \nCheck out our [full command list](https://github.com/Craftymatt2/UniversalDiscordBot/wiki/Commands)!`)
                .setThumbnail(client.user.avatarURL)
                .setFooter(`${client.config.footer}\n${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`)
            return emb
        }
    
        let pos = ["moderation", "fun", "utilities"]
        let o = ``
        let n = getRandomInt(3);
        let result = undefined
        result = pos[n]
        const filter = (reaction, user) => {
            return ['🔒', '🎲', '📋'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
        message.channel.send(embed("Choose an option below\n\n🔒 - Moderation\n🎲 - Fun & Games\n📋 - Support & Utilities")).then((m) => {
        m.react("🔒").then(() => m.react("🎲").then(() => m.react("📋")))
        .then(() => {
        m.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first()
                n = getRandomInt(3);
                result = undefined
                result = pos[n]
                let p = client.config.prefix
                if (reaction.emoji.name === '🔒') {
                  o += `**${client.config.serverName} Moderation Commands**\n\n`
                  o += `\`${p}mute <user> <reason>\`\n`
                  o += `\`${p}tempmute <user> <time> <reason>\`\n`
                  o += `\`${p}kick <user> <reason>\`\n`
                  o += `\`${p}ban <user> <reason>\`\n`
                  o += `\`${p}clear <amount> [user]\`\n`
                  o += `\`${p}lockdown <time>\`\n`
                  o += `\`${p}slowmode <time>\`\n`
                  o += `\`${p}speak <message>\`\n`
                  o += `\`${p}say <message>\`\n`
                  o += `\`${p}shout <message>\`\n`
                  o += `\`${p}warn <user> <reason>\`\n`
                  o += `\`${p}unmute <user>\`\n`
                  o += `\`${p}mute <user>\`\n`
                  o += `\`${p}report <user> <user>\``
                }
                else if (reaction.emoji.name === '🎲'){
                  o += `**${client.config.serverName} Fun & Games Commands**\n\n`
                  o += `\`${p}8ball <future>\`\n`
                  o += `\`${p}flip\`\n`
                  o += `\`${p}hug <user>\`\n`
                  o += `\`${p}joke\`\n`
                  o += `\`${p}meme\`\n`
                  o += `\`${p}numbergen\`\n`
                  o += `\`${p}poll <topic>\`\n`
                  o += `\`${p}roll\`\n`
                  o += `\`${p}rps <rock/paper/scissors>\`\n`
                  o += `\`${p}slap <user>\`\n`
                  o += `\`${p}play <YouTube link>\`\n`
                  o += `\`${p}skip\`\n`
                  o += `\`${p}stop\``
                }
                 else if (reaction.emoji.name === '📋'){
                  o += `**${client.config.serverName} Support & Utilites Commands**\n\n`
                  o += `\`${p}announce <message>\`\n`
                  o += `\`${p}bot\`\n`
                  o += `\`${p}botlinks\`\n`
                  o += `\`${p}bugreport <bug>\`\n`
                  o += `\`${p}channelinfo [#channel]\`\n`
                  o += `\`${p}gcreate\`\n`
                  o += `\`${p}gdelete\`\n`
                  o += `\`${p}gredraw\`\n`
                  o += `\`${p}help\`\n`
                  o += `\`${p}invites [user]\`\n`
                  o += `\`${p}latency\`\n`
                  o += `\`${p}leaderboard\`\n`
                  o += `\`${p}level [user]\`\n`
                  o += `\`${p}links\`\n`
                  o += `\`${p}lmgtfy <question>\`\n`
                  o += `\`${p}ping\`\n`
                  o += `\`${p}roleinfo [@role]\`\n`
                  o += `\`${p}serverinfo\`\n`
                  o += `\`${p}setup\`\n`
                  o += `\`${p}social\`\n`
                  o += `\`${p}suggest <suggestion>\`\n`
                  o += `\`${p}userinfo [@user]\`\n`
                  o += `\`${p}weather <location>\`\n`
                  o += `\`${p}links\`\n`
                  o += `\`${p}links\`\n`
                  o += `\`${p}add <user>\`\n`
                  o += `\`${p}close\`\n`
                  o += `\`${p}delete\`\n`
                  o += `\`${p}forcedelete\`\n`
                  o += `\`${p}lower\`\n`
                  o += `\`${p}new <reason>\`\n`
                  o += `\`${p}notice\`\n`
                  o += `\`${p}raise\`\n`
                  o += `\`${p}remove <user>\``
                 }

          m.clearReactions()
          m.edit(embed(o))
        }).catch(() => {message.channel.send(embed("Too Slow!"))} )
        })
        })

}