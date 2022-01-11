const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    if(client.config.ticketSystem === "off") return;
    message.delete()

    if(!client.checkPermissions(client.config.permissions.remove)) return

    const cantFindUser = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle("🚫 Please enter a valid user")
        .setDescription(`Usage - \`${client.config.prefix}remove <user>\``)
        .setFooter(`${client.config.serverName} Support ➤ Command ran by ${message.author.username}`)
    const notATicketChannel = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle("🚫 You can only use this in a ticket channel")   
        .setFooter(`${client.config.serverName} Support ➤ Command ran by ${message.author.username}`) 

    if (!message.channel.name.startsWith(`ticket-`)) {const fail = await message.channel.send(notATicketChannel); wait(3000); fail.delete()}
    
    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!user) {const fail = await message.channel.send(cantFindUser); wait(3000); fail.delete()}

    const removed = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setDescription(`👋 ${user} Has been **removed** from the ticket`)
        .setFooter(`${client.config.serverName} Support ➤ Command ran by ${message.author.username}`)
    message.channel.send(removed)

    message.channel.overwritePermissions(user,{READ_MESSAGES:false,SEND_MESSAGES:false})

    const log = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle(`🗒 Ticket User Removed`)
        .setDescription(`**User** - ${message.author}\n**Channel** - ${message.channel}\n**Removed** - ${user}`)
        .setTimestamp(message.createdAt)
    client.logChannel.send(log)

}