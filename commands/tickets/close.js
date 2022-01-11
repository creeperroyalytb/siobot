const Discord = require("discord.js");

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

exports.run = async (client, message, args) => {
    if(client.config.ticketSystem === "off") return;
    message.delete()

    let everyone = message.guild.roles.find(x => x.name === "@everyone");

    const notATicketChannel = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle("🚫 You can only use this in a ticket channel")
        .setFooter(`${client.config.serverName} Support ➤ Command ran by ${message.author.username}`)

    if (!message.channel.name.startsWith(`ticket-`)) {const fail = await message.channel.send(notATicketChannel); wait(3000); fail.delete(); return}
       
    const closed = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle(`⛔ **This ticket is closed**`)
        .setDescription(`The ticket is closed, but has been kept under management veiw only.
                        \n**To delete this ticket use** \`${client.config.prefix}delete\`.`)
        .setFooter(`${client.config.serverName} Support ➤ Command ran by ${message.author.username}`, client.user.avatarURL)

    message.channel.send(closed)

    username = client.users.get(`${message.channel.topic}`)

    message.channel.overwritePermissions(client.staffRole, {SEND_MESSAGES: false,READ_MESSAGES: false})
    message.channel.overwritePermissions(everyone, {SEND_MESSAGES: false,READ_MESSAGES: false})
    message.channel.overwritePermissions(client.managementRole, {SEND_MESSAGES: true,READ_MESSAGES: true})
    message.channel.overwritePermissions(username, {SEND_MESSAGES: false,READ_MESSAGES: false})

    message.channel.setName(`closed-${message.channel.name.split("-")[1]}`)

    const log = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle(`🗒 Close Ticket`)
        .setDescription(`**User** - ${message.author}\n**Channel** - ${message.channel.name}`)
        .setTimestamp(message.createdAt)
    client.logChannel.send(log)
    return        

}