const Discord = require("discord.js");

exports.run = (client, message, args) => {
 
  function getChan (chan) {
    if (!chan.includes('<#') && !chan.includes('>')) return undefined
    chan = chan.replace('<#', '')
    chan = chan.replace('>', '')
    return chan
  }

  let chan = args[0]
    if (chan) {
      chan = getChan(chan)
      if (chan === undefined) {
        let parent = ''
    if (message.channel.parentID) parent = message.guild.channels.find(c=>c.id===message.channel.parentID)
    parent=parent.name
    let emb = new Discord.RichEmbed()
        .setTitle('#' + message.channel.name)
        .setThumbnail(client.user.displayAvatarURL)
        .setColor(client.config.colour)
        .addField('Type', chan.type, true)
        .addField('Created At', message.channel.createdAt, true)
        .addField('ID', message.channel.id, true)
        .addField('Topic', message.channel.topic ?  message.channel.topic : 'N/A', true)
        .addField('NSFW?', message.channel.nsfw, true)
        .addField('Category', message.channel.parentID ? parent : 'N/A', true)
        .setFooter(`${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`)
    message.channel.send(emb)
      }
      else {
    chan = message.guild.channels.find(c=>c.id===chan)
    let parent = ''
    if (chan.parentID) parent = message.guild.channels.find(c=>c.id===chan.parentID)
    parent=parent.name
    let emb = new Discord.RichEmbed()
        .setTitle('#' + chan.name)
        .setThumbnail(client.user.displayAvatarURL)
        .setColor(client.config.colour)
        .addField('Type', chan.type, true)
        .addField('Created At', chan.createdAt, true)
        .addField('ID', chan.id, true)
        .addField('Topic', chan.topic ?  chan.topic : 'N/A', true)
        .addField('NSFW?', chan.nsfw, true)
        .addField('Category', chan.parentID ? parent : 'N/A', true)
        .setFooter(`${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`)
    message.channel.send(emb)
      }
    }
    else {
    let parent = ''
    if (message.channel.parentID) parent = message.guild.channels.find(c=>c.id===message.channel.parentID)
    parent=parent.name
    chan = message.guild.channels.find(c=>c.id===message.channel.id)
    let emb = new Discord.RichEmbed()
        .setTitle('#' + message.channel.name)
        .setThumbnail(client.user.displayAvatarURL)
        .setColor(client.config.colour)
        .addField('Type', chan.type, true)
        .addField('Created At', message.channel.createdAt, true)
        .addField('ID', message.channel.id, true)
        .addField('Topic', message.channel.topic ?  message.channel.topic : 'N/A', true)
        .addField('NSFW?', message.channel.nsfw, true)
        .addField('Category', message.channel.parentID ? parent : 'N/A', true)
        .setFooter(`${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`)
    message.channel.send(emb)
    }
 
}