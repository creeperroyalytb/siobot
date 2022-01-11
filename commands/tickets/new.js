const Discord = require("discord.js");

function wait(ms){
    var start = new Date().getTime()
    var end = start
    while(end < start + ms) {end = new Date().getTime();}
}

exports.run = async (client, message, args) => {
    if(client.config.ticketSystem === "off") return;
    message.delete()

    var reason = args.join(" ")
    const includeReason = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle("🚫 Please enter a valid reason to open the ticket.")
      .setDescription(`Usage - \`${client.config.prefix}new <reason>\``)
      .setFooter(`${client.config.serverName} Support ➤ Command ran by ${message.author.username}`)

    if(!reason) {const fail = await message.channel.send(includeReason); wait(3000); fail.delete(); return}

    let everyone = message.guild.roles.find(x => x.name === "@everyone");

    message.guild.createChannel(`ticket-${message.author.username}`, {type: 'text',
    topic: message.author.id}).then(c => {
    c.overwritePermissions(client.staffRole, {SEND_MESSAGES: true,READ_MESSAGES: true, EMBED_LINKS: true, ATTACH_FILES: true})
    c.overwritePermissions(everyone, {SEND_MESSAGES: false,READ_MESSAGES: false, EMBED_LINKS: true, ATTACH_FILES: true})
    c.overwritePermissions(client.managementRole, {SEND_MESSAGES: true,READ_MESSAGES: true, EMBED_LINKS: true, ATTACH_FILES: true})
    c.overwritePermissions(message.author, {SEND_MESSAGES: true,READ_MESSAGES: true, EMBED_LINKS: true, ATTACH_FILES: true})
    c.setParent(client.ticketCategory)

    let openEmbed = new Discord.RichEmbed()
        .setTitle(`✅ ${message.author.username}, your ticket has been created!`)
        .setDescription(`Location - ${c}!`)
        .setColor(client.config.colour)
        .setFooter(`${client.config.serverName} Support ➤ Command ran by ${message.author.username}`)
    message.channel.send(openEmbed)

    c.send(`${message.author}`)

    let thanksEmbed = new Discord.RichEmbed()
        .setTitle(`🦺 ${client.config.serverName} Support`)
        .setDescription(`Thank you for creating a ticket!\nA member of our support team will be with you shortly.
        \nWhile you wait, please explain your issue in detail.\n\n**Reason -** ${reason}`)
        .setFooter(`${client.config.serverName} Support ➤ Opened by ${message.author.username}`, client.user.avatarURL)
        .setColor(client.config.colour)
    c.send(thanksEmbed)

    let log = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle(`🗒 Open Ticket`)
        .setDescription(`**User** - ${message.author} (${message.author.id})\n**Channel** - ${message.channel}\n**Ticket** - ${c}`)
        .setTimestamp(message.createdAt)
    client.logChannel.send(log)

    })

}