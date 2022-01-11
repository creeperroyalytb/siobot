const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    if(client.config.ticketSystem === "off") return;
    message.delete()
    
    if(!client.checkPermissions(client.config.permissions.lower)) return

    const notATicketChannel = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle("🚫 You can only use this in a ticket channel")    
        .setFooter(`${client.config.serverName} Support ➤ Command ran by ${message.author.username}`)
    if (!message.channel.name.startsWith(`ticket-`)) {const fail = await message.channel.send(notATicketChannel); wait(3000); fail.delete()}
    
    const raised = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setDescription("📉 This ticket has been **lowered** to the **staff team**.")
        .setFooter(`${client.config.serverName} Support ➤ Command ran by ${message.author.username}`)
    message.channel.send(raised)

    message.channel.overwritePermissions(client.managementRole,{READ_MESSAGES:true,SEND_MESSAGES:true})
    message.channel.overwritePermissions(client.staffRole,{READ_MESSAGES:true,SEND_MESSAGES:true});

}