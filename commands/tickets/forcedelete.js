const Discord = require("discord.js");

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

exports.run = async (client, message, args) => {
    if(client.config.ticketSystem === "off") return;
    message.delete()

    const notATicketChannel = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle("🚫 You can only use this in a ticket channel")

    if(!client.checkPermissions(client.config.permissions.forcedelete)) return

    if (!message.channel.name.startsWith(`ticket-`) && !message.channel.name.startsWith(`closed-`)) {
        const fail = await message.channel.send(notATicketChannel); wait(3000); fail.delete(); return}

    const log = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle(`🗒 Force Delete Ticket`)
        .setDescription(`**User** - ${message.author}\n**Channel** - ${message.channel.name}`)
        .setTimestamp(message.createdAt)
    client.logChannel.send(log)

    wait(2000)
    message.channel.delete()
}