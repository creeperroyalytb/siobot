const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./data/udb.sqlite');

exports.run = (client, message, args) => {
    if(client.config.inviteSystem === "off") return;
    message.delete()

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if(!user){
        console.log("TEST")
        let myinvites = sql.prepare('SELECT * FROM joins WHERE inviter=?').get(message.author.id);
        console.log(myinvites)
        let joins = myinvites.length
        console.log("TEST2")
        console.log(joins)

        let myinvites2 = sql.prepare('SELECT * FROM leaves WHERE inviter=?').get(message.author.id);
        let leaves = myinvites2.length


        let is = new Discord.RichEmbed()
            .setColor(client.config.colour)
            .setAuthor(`${client.config.serverName}`,client.user.avatarURL)
            .setTitle(`💰 Invite info for ${message.author.username}`)
            .addField(`🔢 Net Invites`,`**${joins-leaves}**`, true)
            .addField(`⬆️ Joins`,`**${joins}**`, true)
            .addField(`⬇️ Leaves`,`**${leaves}**`, true)
            .setFooter(`${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`)

        message.channel.send(is)
    }
    else{
        username = client.users.get(`${user.id}`)
        let myinvites = sql.prepare('SELECT * FROM invites WHERE id=?').get(user.id);

        if (!myinvites) { 
            myinvites = { id: `${user.id}`, user: user.id, invites: 0}
            const insert = sql.prepare(`INSERT OR REPLACE INTO invites (id, user, invites) VALUES (@id, @user, @invites);`)
            }

        let is = new Discord.RichEmbed()
            .setColor(client.config.colour)
            .setTitle(`💰 ${username.username} currently has **${myinvites.invites}** invites!`)
            .setFooter(`${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`)

        message.channel.send(is)
    }

}