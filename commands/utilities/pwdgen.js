const Discord = require("discord.js");

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

exports.run = async (client, message, args) => {
    message.delete()

    if(!(/^\d+$/.test(args[0]))){var length = 12}
    else{
        if(args[0]) 
        if(args[0] > 75) var length = 12
        else var length = args[0]; 
        else var length = 12}
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!£$%&@#*)({}][;:~.>,<?",
    retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    if(length < 8) var secure = "Insecure"
    else if(length >= 8) var secure = "Secure"
    else if(lenght >= 14) var secure = "Very Secure"

    var embed = new Discord.RichEmbed()
        .setTitle("Password Generator")
        .addField("Password", `**\`${retVal}\`**`, true)
        .addField("Length", length, true)
        .addField("Security Rating", secure, true)
        .setColor(client.config.colour)
        .setFooter("Note - Your passwords are never stored on our side!")

    const failed = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle(`🚫 Faild to send password!`)
        .setDescription("I can't DM you!\nFix this by changing your privacy settings for this server to allow direct messages!")
        .setFooter(`${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`)

    async function failf(){
        const fail = await message.channel.send(failed);wait(10000);fail.delete()
    }

    message.author.send(embed).catch(() => failf())

}