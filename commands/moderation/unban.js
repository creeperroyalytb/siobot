const Discord = require("discord.js");

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

exports.run = async (client, message, args) => {
    message.delete()

    if(!client.checkPermissions(client.config.permissions.unban)) return

    var cantFindUser = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle("🚫 Please enter a valid user")
      .setDescription(`Usage - \`${client.config.prefix}unban <user>\``)
      .setFooter(`${client.config.serverName} Moderation ➤ Command ran by ${message.author.username}`) 
    var staffMember = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle("🚫 You can't unban another staff member!")
      .setFooter(`${client.config.serverName} Moderation ➤ Command ran by ${message.author.username}`) 

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if(!user) {var fail = await message.channel.send(cantFindUser); wait(3000); fail.delete(); return}
    if(!message.member.roles.has(client.staffRole.id)) {var fail = await message.channel.send(noPerms); wait(3000); fail.delete(); return}    
    if(user.roles.has(client.staffRole.id)) {var fail = await message.channel.send(staffMember); wait(3000); fail.delete(); return}

    var unmuted = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle(`😮 User Has been un-banned! 😮`)
      .setDescription(`**User** - ${user}\n$**Staff Member** - ${message.author}`)  
      .setFooter(`${client.config.serverName} Moderation ➤ Command ran by ${message.author.username}`)   

      var DM = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle(`**${client.config.serverName}** - 😮 You have been un-banned! 😮`)
      .setDescription(`**Staff Member** - ${message.author}`)  

    user.send(DM)

    message.channel.send(unmuted)
    
    message.guild.member(user).unban()

    var log = new Discord.RichEmbed()
      .setColor(client.config.colour)
      .setTitle(`🗒 Un-Ban`)
      .setDescription(`**User** - ${user}\n**Staff Member** - ${message.author}`)
      .setTimestamp(message.createdAt)
    client.logChannel.send(log)


}