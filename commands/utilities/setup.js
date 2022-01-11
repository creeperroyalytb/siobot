const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    
    let ownerID = message.guild.ownerID

    let ownerOnly = new Discord.RichEmbed()
        .setAuthor("Zeltux Setup","https://cdn.discordapp.com/attachments/632238663094370366/632916675808854026/profile.png")
        .setColor(`#FF0062`)
        .setTitle(`🚫 Only The Owner Of The Server Can Run This Command! 🚫`)
        .setFooter(`© Zeltux | Owned by Matt | Developed by Matt, Azono & MCThunder\n${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`,"https://cdn.discordapp.com/attachments/632238663094370366/632916675808854026/profile.png")

    if(message.author.id != ownerID){return message.channel.send(ownerOnly)}

    let setUp = new Discord.RichEmbed()
        .setAuthor("Zeltux Setup","https://cdn.discordapp.com/attachments/632238663094370366/632916675808854026/profile.png")
        .setColor(`#FF0062`)
        .setTitle(`Thanks for purchasing Zeltux`)
        .setDescription(`Make sure to checkout the [setup guide](https://github.com/Craftymatt2/Zeltux/wiki/Setup) to see what I create/remove!`)
        .setFooter(`© Zeltux | Owned by Matt | Developed by Matt, Azono & MCThunder\n${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`,"https://cdn.discordapp.com/attachments/632238663094370366/632916675808854026/profile.png")

    message.channel.send(setUp)

    // Create Roles
    // Default
    if(!message.guild.roles.find(x => x.name === client.config.defaultRole)){
        if(!message.guild.roles.find(x => x.id === client.config.defaultRole))
        message.guild.createRole({
            name: client.config.defaultRole,
            color: '#faff87',
            permissions:["SEND_MESSAGES","SEND_TTS_MESSAGES","CREATE_INSTANT_INVITE","CHANGE_NICKNAME","VIEW_CHANNEL","EMBED_LINKS","ATTACH_FILES","READ_MESSAGE_HISTORY","MENTION_EVERYONE","USE_EXTERNAL_EMOJIS","ADD_REACTIONS","CONNECT","SPEAK","USE_VAD"]
        })}
    // Verified
    if(client.config.verificationSystem === "on"){
    if(!message.guild.roles.find(x => x.name === client.config.verificationRole)){
        if(!message.guild.roles.find(x => x.id === client.config.verificationRole))
        message.guild.createRole({
            name: client.config.verificationRole,
            permissions:["SEND_MESSAGES","SEND_TTS_MESSAGES","CREATE_INSTANT_INVITE","CHANGE_NICKNAME","VIEW_CHANNEL","EMBED_LINKS","ATTACH_FILES","READ_MESSAGE_HISTORY","MENTION_EVERYONE","USE_EXTERNAL_EMOJIS","ADD_REACTIONS","CONNECT","SPEAK","USE_VAD"]
        })}}
    // Muted
    if(!message.guild.roles.find(x => x.name === client.config.mutedRole)){
        if(!message.guild.roles.find(x => x.id === client.config.mutedRole))
        message.guild.createRole({
            name: client.config.mutedRole,
            permissions:["CREATE_INSTANT_INVITE","CHANGE_NICKNAME","VIEW_CHANNEL","EMBED_LINKS","ATTACH_FILES","READ_MESSAGE_HISTORY","MENTION_EVERYONE","USE_EXTERNAL_EMOJIS","ADD_REACTIONS","CONNECT","SPEAK","USE_VAD"]
        })}
    // Staff
    if(!message.guild.roles.find(x => x.name === client.config.staffRole)){
        if(!message.guild.roles.find(x => x.id === client.config.staffRole))
        message.guild.createRole({
            name: client.config.staffRole,
            permissions:["SEND_MESSAGES","SEND_TTS_MESSAGES","CREATE_INSTANT_INVITE","CHANGE_NICKNAME","VIEW_CHANNEL","EMBED_LINKS","ATTACH_FILES","READ_MESSAGE_HISTORY","MENTION_EVERYONE","USE_EXTERNAL_EMOJIS","ADD_REACTIONS","CONNECT","SPEAK","USE_VAD"]
        })}
    // Management
    if(!message.guild.roles.find(x => x.name === client.config.managementRole)){
        if(!message.guild.roles.find(x => x.id === client.config.managementRole))
        message.guild.createRole({
            name: client.config.managementRole,
            permissions:["SEND_MESSAGES","SEND_TTS_MESSAGES","CREATE_INSTANT_INVITE","CHANGE_NICKNAME","VIEW_CHANNEL","EMBED_LINKS","ATTACH_FILES","READ_MESSAGE_HISTORY","MENTION_EVERYONE","USE_EXTERNAL_EMOJIS","ADD_REACTIONS","CONNECT","SPEAK","USE_VAD"]
        })}

    let everyone = message.guild.roles.find(x => x.name === "@everyone");
    const staffRole = client.staffRole
    const managementRole = client.managementRole

    // Create Logs Channel
    if(!message.guild.channels.find(x => x.name === client.config.logChannel)){
        if(!message.guild.channels.find(x => x.id === client.config.logChannel))
        message.guild.createChannel(`${client.config.logChannel}`, {type: 'text'}).then(c => {
        c.overwritePermissions(staffRole, {SEND_MESSAGES: false,READ_MESSAGES: false})
        c.overwritePermissions(everyone, {SEND_MESSAGES: false,READ_MESSAGES: false})
        c.overwritePermissions(managementRole, {SEND_MESSAGES: true,READ_MESSAGES: true})})}

    // Create Welcome Channel
    if(client.config.joinLeaveMessage === "on"){
        if(!message.guild.channels.find(x => x.name === client.config.joinLeaveChannel)){
            if(!message.guild.channels.find(x => x.id === client.config.joinLeaveChannel))
            message.guild.createChannel(`${client.config.joinLeaveChannel}`, {type: 'text'}).then(c => {
            c.overwritePermissions(staffRole, {SEND_MESSAGES: false,READ_MESSAGES: true})
            c.overwritePermissions(everyone, {SEND_MESSAGES: false,READ_MESSAGES: true})
            c.overwritePermissions(managementRole, {SEND_MESSAGES: true,READ_MESSAGES: true})})}
    }

    // Create Verification Channel
    if(client.config.verificationSystem === "on"){
        if(!message.guild.channels.find(x => x.name === client.config.verificationChannel)){
            if(!message.guild.channels.find(x => x.id === client.config.verificationChannel))
            message.guild.createChannel(`${client.config.verificationChannel}`, {type: 'text'}).then(c => {
            c.overwritePermissions(staffRole, {SEND_MESSAGES: true,READ_MESSAGES: true})
            c.overwritePermissions(everyone, {SEND_MESSAGES: true,READ_MESSAGES: true})
            c.overwritePermissions(managementRole, {SEND_MESSAGES: true,READ_MESSAGES: true})})}
    }

    // Create Level Channel
    if(client.config.levelSystem === "on"){
        if(!client.config.levelChannel === "current"){
        if(!message.guild.channels.find(x => x.name === client.config.levelChannel)){
            if(!message.guild.channels.find(x => x.id === client.config.levelChannel))
            message.guild.createChannel(`${client.config.levelChannel}`, {type: 'text'}).then(c => {
            c.overwritePermissions(staffRole, {SEND_MESSAGES: false,READ_MESSAGES: true})
            c.overwritePermissions(everyone, {SEND_MESSAGES: false,READ_MESSAGES: true})
            c.overwritePermissions(managementRole, {SEND_MESSAGES: true,READ_MESSAGES: true})})}
    }}

    // Create Application Channel
    if(client.config.applicationsystem === "on"){
        if(!client.config.applicationChannel === "current"){
        if(!message.guild.channels.find(x => x.name === client.config.applicationChannel)){
            if(!message.guild.channels.find(x => x.id === client.config.applicationChannel))
            message.guild.createChannel(`${client.config.applicationChannel}`, {type: 'text'}).then(c => {
            c.overwritePermissions(staffRole, {SEND_MESSAGES: false,READ_MESSAGES: false})
            c.overwritePermissions(everyone, {SEND_MESSAGES: false,READ_MESSAGES: false})
            c.overwritePermissions(managementRole, {SEND_MESSAGES: true,READ_MESSAGES: true})})}
    }}

    // Create Report Channel
    if(`${client.config.reportChannel}` != `${client.config.logChannel}`){
        if(!message.guild.channels.find(x => x.name === client.config.reportChannel)){
            if(!message.guild.channels.find(x => x.id === client.config.reportChannel))
            message.guild.createChannel(`${client.config.reportChannel}`, {type: 'text'}).then(c => {
            c.overwritePermissions(staffRole, {SEND_MESSAGES: false,READ_MESSAGES: true})
            c.overwritePermissions(everyone, {SEND_MESSAGES: false,READ_MESSAGES: true})
            c.overwritePermissions(managementRole, {SEND_MESSAGES: true,READ_MESSAGES: true})})}
    }

    // Create Suggestion Channel
    if(`${client.config.suggestionChannel}` != `${client.config.logChannel}`){
        if(!message.guild.channels.find(x => x.name === client.config.suggestionChannel)){
            if(!message.guild.channels.find(x => x.id === client.config.suggestionChannel))
            message.guild.createChannel(`${client.config.suggestionChannel}`, {type: 'text'}).then(c => {
            c.overwritePermissions(staffRole, {SEND_MESSAGES: false,READ_MESSAGES: true})
            c.overwritePermissions(everyone, {SEND_MESSAGES: false,READ_MESSAGES: true})
            c.overwritePermissions(managementRole, {SEND_MESSAGES: true,READ_MESSAGES: true})})}
    }

    // Create Bug Report
    if(`${client.config.bugChannel}` != `${client.config.logChannel}`){
        if(!message.guild.channels.find(x => x.name === client.config.bugChannel)){
            if(!message.guild.channels.find(x => x.id === client.config.bugChannel))
            message.guild.createChannel(`${client.config.bugChannel}`, {type: 'text'}).then(c => {
            c.overwritePermissions(staffRole, {SEND_MESSAGES: true,READ_MESSAGES: true})
            c.overwritePermissions(everyone, {SEND_MESSAGES: false,READ_MESSAGES: false})
            c.overwritePermissions(managementRole, {SEND_MESSAGES: true,READ_MESSAGES: true})})}
    }

    // Create Application Category
    if(client.config.applicationsystem === "on"){
        if(!message.guild.channels.find(x => x.name === client.config.applicationCategory)){
            if(!message.guild.channels.find(x => x.id === client.config.applicationCategory))
            message.guild.createChannel(`${client.config.applicationCategory}`, {type: 'category'}).then(c => {
            c.overwritePermissions(staffRole, {SEND_MESSAGES: false,READ_MESSAGES: false})
            c.overwritePermissions(everyone, {SEND_MESSAGES: false,READ_MESSAGES: false})
            c.overwritePermissions(managementRole, {SEND_MESSAGES: true,READ_MESSAGES: true})})}
    }

    // Create Ticket Category
    if(client.config.ticketSystem === "on"){
        if(!message.guild.channels.find(x => x.name === client.config.ticketCategory)){
            if(!message.guild.channels.find(x => x.id === client.config.ticketCategory))
            message.guild.createChannel(`${client.config.ticketCategory}`, {type: 'category'}).then(c => {
            c.overwritePermissions(staffRole, {SEND_MESSAGES: true,READ_MESSAGES: true})
            c.overwritePermissions(everyone, {SEND_MESSAGES: false,READ_MESSAGES: false})
            c.overwritePermissions(managementRole, {SEND_MESSAGES: true,READ_MESSAGES: true})})}
    }
    
    if(client.config.verificationSystem === "on"){

    // Set Channel Perms For Default
    message.guild.channels.forEach(channel => { 
        var defaultRole = message.guild.roles.find(x => x.name === client.config.defaultRole)
        if(!defaultRole){var defaultRole = message.guild.roles.find(x => x.id === client.config.defaultRole)}
        channel.overwritePermissions(defaultRole, {SEND_MESSAGES: true, READ_MESSAGES: false})
    })

    // Set Channel Perms For Everyone
    message.guild.channels.forEach(channel => { 
        let everyone = message.guild.roles.find(x => x.name === "@everyone");
        channel.overwritePermissions(everyone, {SEND_MESSAGES: true, READ_MESSAGES: false})
    })
    
    // Set Channel Perms For Verified Group
    message.guild.channels.forEach(channel => { 
        var verificationRole = message.guild.roles.find(x => x.name === client.config.verificationRole)
        if(!verificationRole){var verificationRole = message.guild.roles.find(x => x.id === client.config.verificationRole)}
        channel.overwritePermissions(verificationRole, {SEND_MESSAGES: true, READ_MESSAGES: true})
    })

    // Everyone can talk in verification channel
    everyone = message.guild.roles.find(x => x.name === "@everyone");
    client.verificationChannel.overwritePermissions(everyone, {SEND_MESSAGES: true,READ_MESSAGES: true})
    }

    // Set Channel Perms For Muted Group
    message.guild.channels.forEach(channel => { 
        var mutedRole = message.guild.roles.find(x => x.name === client.config.mutedRole)
        if(!mutedRole){var mutedRole = message.guild.roles.find(x => x.id === client.config.mutedRole)}
        channel.overwritePermissions(mutedRole, {SEND_MESSAGES: false,READ_MESSAGES: null})
    })

}