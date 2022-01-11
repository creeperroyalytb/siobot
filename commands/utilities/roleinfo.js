const Discord = require("discord.js");
function getID (role) {
  if (!role.includes('<@&') && !role.includes('>')) return undefined
  role = role.replace('<@&', '')
  role = role.replace('>', '')
  return role
}
exports.run = (client, message, args) => {

    if (!args[0]) return message.channel.send('Undetected Role')
    let role = args[0]
    role = getID(role)
    if (role === undefined) return message.channel.send('Undetected Role')
    role = message.guild.roles.find(r=>r.id===role)
    if (role === undefined) return message.channel.send('Undetected Role')
    let s = role.serialize()
    let perms = []
    for (let [key, value] of Object.entries(s)) {
      if (value === true) perms.push(key)
}
    let emb = new Discord.RichEmbed()
        .setTitle(role.name)
        .setThumbnail(client.user.displayAvatarURL)
        .setColor(role.hexColor)
        .addField('Color', role.hexColor + ' Same as embed color', true)
        .addField('Created At', role.createdAt, true)
        .addField('Displayed Seperately?', role.hoist, true)
        .addField('ID', role.id, true)
        .addField('Members', role.members.size, true)
        .addField('Permissions', perms.join(',\n'), true)
        .setFooter(`${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`)
    message.channel.send(emb)

}