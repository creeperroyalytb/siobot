const Discord = require("discord.js");

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

exports.run = async (client, message, args) => {
    if(client.config.ticketSystem === "off") return;
    message.delete()

    if(!client.checkPermissions(client.config.permissions.add)) return

    const cantFindUser = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle("🚫 Please enter a valid user")
        .setDescription(`Usage - \`${client.config.prefix}add <user>\``)
        .setFooter(`${client.config.serverName} Support ➤ Command ran by ${message.author.username}`)
    const notATicketChannel = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle("🚫 You can only use this in a ticket channel") 
        .setFooter(`${client.config.serverName} Support ➤ Command ran by ${message.author.username}`)   
        
    if (!message.channel.name.startsWith(`ticket-`)) {const fail = await message.channel.send(notATicketChannel); wait(3000); fail.delete()}
    
    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!user) {const fail = await message.channel.send(cantFindUser); wait(3000); fail.delete()}

    const added = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setDescription(`👋 ${user} Has been **added** to the ticket`)
        .setFooter(`${client.config.serverName} Support ➤ Command ran by ${message.author.username}`)
    message.channel.send(added)

    message.channel.overwritePermissions(user,{READ_MESSAGES:true,SEND_MESSAGES:true})

    const log = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle(`🗒 Ticket User Added`)
        .setDescription(`**User** - ${message.author}\n**Channel** - ${message.channel}\n**Added** - ${user}`)
        .setTimestamp(message.createdAt) 
    client.logChannel.send(log)

}th(`ticket-
