const Discord = require("discord.js");

function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

exports.run = async (client, message, args) => {
    if(client.config.applicationSystem === "off") return;

    let everyone = message.guild.roles.find(x => x.name === "@everyone");

    message.guild.createChannel(`application-${message.author.username}`, {type: 'text',
    topic: message.author.id}).then(async c => {
    c.overwritePermissions(client.staffRole, {SEND_MESSAGES: false,READ_MESSAGES: false})
    c.overwritePermissions(everyone, {SEND_MESSAGES: false,READ_MESSAGES: false})
    c.overwritePermissions(client.managementRole, {SEND_MESSAGES: true,READ_MESSAGES: true})
    c.overwritePermissions(message.author, {SEND_MESSAGES: true,READ_MESSAGES: true})
    c.setParent(client.applicationCategory)

    var questions = client.config.applicationQuestions
    var n = 1
    var answers = []
    var sent = false

    totalParts = Math.ceil(questions.length/5)

    var embed = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setAuthor(`${client.config.serverName} Application`,client.user.avatarURL)
        .setTitle(`${message.author.tag}'s Application`)
        .setDescription(`For the position of **${client.config.applicationPosition}**.`)
        .setFooter(`This application is split into ${totalParts} parts. This is part ${n}/${totalParts}.`)

    var openEmbed = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setDescription(`**${message.author.username}** has started an application in ${c}.`)
    message.channel.send(openEmbed)

    var startEmbed = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setAuthor(`${client.config.serverName} Application`,client.user.avatarURL)
        .setDescription(`Position - **${client.config.applicationPosition}**\n\n- Please answer all **${questions.length}** questions below.\n- To cancel your application, type **stop**.`)
    c.send(startEmbed)

    for (i = 0; i < questions.length; i++) {

        var questionEmbed = new Discord.RichEmbed()
            .setColor(client.config.colour)
            .setTitle(`Question ${i+1}`)
            .setDescription(questions[i])

        await c.send(questionEmbed)
        const msgs = await c.awaitMessages(msg => msg.author.id === message.author.id, {time: 10000000, max: 1});
        response = msgs.map(msg => msg.content).join(" ")

        if(response === "stop" || response === "Stop" || response === "STOP"){
            
            var stopEmbed = new Discord.RichEmbed()
                .setColor(client.config.colour)
                .setAuthor(`${client.config.serverName} Application`,client.user.avatarURL)
                .setDescription(`Your application has been **cancelled** and **not** sent to ${client.config.serverName}\n\n To try again, type \`${client.config.prefix}apply\` in the ${client.config.serverName} Discord server.`)
            
            await c.send(stopEmbed).then(value => {wait(5000)})
            c.delete()
            
            return}

        embed.addField(questions[i],response)

        if(((i+1)%5) === 0 & i != 0){ 
            n++
            answers.push(embed)
            var embed = new Discord.RichEmbed()
                .setColor(client.config.colour)
                .setFooter(`This application is split into ${totalParts} parts. This is part ${n}/${totalParts}.`)

            sent = true 
                      
        }
        else{
            sent = false
        }

    }
    if(sent === false){
        answers.push(embed)
    }

    var endEmbed = new Discord.RichEmbed()
        .setColor(client.config.colour)
        .setTitle(`✅ Thank you for applying to ${client.config.serverName}.`)
        .setDescription(`This channel will be deleted soon, but your application will be sent!`)
    await c.send(endEmbed).then(value => {wait(5000)})
    c.delete()

    for (i = 0; i < answers.length; i++) { 
        client.applicationChannel.send(answers[i])
    }
})

}