const Discord = require("discord.js");

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

exports.run = async (client, message, args) => {
    if(client.config.ticketSystem === "off") return;
    message.delete()

    const notATicketChannel = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle("🚫 You can only use this in a closed ticket channel")
        .setFooter(`${client.config.serverName} Support ➤ Command ran by ${message.author.username}`)
    if (!message.channel.name.startsWith(`closed-`)) {const fail = await message.channel.send(notATicketChannel); wait(3000); fail.delete(); return}
    
    if(!client.checkPermissions(client.config.permissions.delete)) return

    function embed (title,msg) {
        let emb = new Discord.RichEmbed()
        .setTitle(title)
        .setDescription(msg)
        .setColor(client.config.colour)
        .setFooter(`${client.config.serverName} Support ➤ Command ran by ${message.author.username}`)
        return emb
    }

    const confirm = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle(`**⚠ Are you sure you want to delete this ticket?**`)
        .setDescription(`The channel will be deleted.
        \n**React with ✅ to confirm your delete**
        *Your request will be voided in 20 seconds.*`)
        .setFooter(`${client.config.serverName} Support ➤ Command ran by ${message.author.username}.`, client.user.avatarURL)
        
    const not = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle("⛔ Ticket not deleted!")
        .setFooter(`${client.config.serverName} Support ➤ Command ran by ${message.author.username}`)
        
    const failed = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle("⛔ The ticket failed to delete because no confirmation was given in time.")
        .setFooter(`${client.config.serverName} Support ➤ Command ran by ${message.author.username}`)

    let pos = ["no", "yes"]
    let n = getRandomInt(3);
    result = pos[n]
    const filter = (reaction, user) => {
        return ['❌', '✅'].includes(reaction.emoji.name) && user.id === message.author.id;
    };
    message.channel.send(confirm).then((m) => {
    m.react("❌").then(() => m.react("✅"))
    .then(() => {
    m.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
            const reaction = collected.first()
            n = getRandomInt(3);
            result = undefined
            result = pos[n]
    
            if (reaction.emoji.name === '❌') {
                message.channel.send(not)
            }
            else if (reaction.emoji.name === '✅'){
                const log = new Discord.RichEmbed()
                    .setColor(client.config.colour)
                    .setTitle(`🗒 Delete Ticket`)
                    .setDescription(`**User** - ${message.author}\n**Channel** - ${message.channel.name}`)
                    .setTimestamp(message.createdAt)
                client.logChannel.send(log)
                wait(2000)
                message.channel.delete()
            }
               
      m.clearReactions()
    }).catch(() => {message.channel.send(failed)} )
    })
    })


}