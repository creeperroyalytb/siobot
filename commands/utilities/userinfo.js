const Discord = require("discord.js");

exports.run = (client, message, args) => {
    let inline = true
    let resence = true
    const status = {
        online: "Online",
        idle: "Idle",
        dnd: "Do Not Disturb",
        offline: "Offline/Invisible"
      }
        
const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
let target = message.mentions.users.first() || message.author

if (member.user.bot === true) {
    bot = " Yes";
  } else {
    bot = " No";
  }

  let embed = new Discord.RichEmbed()
      .setAuthor(target.username, target.displayAvatarURL)
      .setThumbnail((target.displayAvatarURL))
      .setColor(client.config.colour)
      .addField("Full Username", `${member.user.tag}`, inline)
      .addField("ID", member.user.id, inline)
      .addField("Nickname", `${member.nickname !== null ? `Nickname: ${member.nickname}` : "None"}`, true)
      .addField("Bot", `${bot}`,inline, true)
      .addField("Status", `${status[member.user.presence.status]}`, inline, true)
      .addField("Playing", `${member.user.presence.game ? `🎮 ${member.user.presence.game.name}` : "Not playing"}`,inline, true)
      .addField("Roles", `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || " No Roles"}`, true)
      .addField("Joined Discord At", member.user.createdAt)
      .setFooter(`Information about ${member.user.username}\n${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`)
      .setTimestamp()

  message.channel.send(embed);

  message.delete()
}