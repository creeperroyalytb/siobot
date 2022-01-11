
// Zeltux

// Created By Matt
// In collaboration with Azono & amaan1028

// Version 1.0.11

const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client();

config = require('config-yml');
client.config = config

const giveaways = require(__dirname + '/custom_modules/giveaways.js')

const SQLite = require("better-sqlite3");
const sql = new SQLite('./data/udb.sqlite');
 
client.invites = {};

const wait = require('util').promisify(setTimeout);

require('console-stamp')(console,{
  label: false,
  pattern: 'HH:MM:ss',
  colors: {
      stamp: 'white',
  }
});

fs.copyFile('./custom_modules/economy-handler.js', './node_modules/quick.db/bin/handler.js', (err) => {if (err) console.log("Please install the quick.db package.")});

// Secures The Bot Into The Server
const myServer = [`${client.config.setup.serverID}`];
client.on('guildCreate', (guild) => {if(!myServer.includes(guild.id)) {guild.leave();
console.log(`\x1b[41mSECURITY\x1b[40m \x1b[31mWe detected that someone tried to invite your bot to another server so I automatically left it.
              \x1b[41mSECURITY\x1b[40m \x1b[31mYou may need to restart the bot to ensure I have left unauthorised servers and the bot runs smoothly again.`);return}})
client.on('ready', () => {client.guilds.forEach(guild => {if(!myServer.includes(guild.id)){guild.leave();
console.log(`\x1b[41mSECURITY\x1b[40m \x1b[31mWe detected that someone tried to invite your bot to another server so I automatically left it.
            \x1b[41mSECURITY\x1b[40m \x1b[31mYou may need to restart the bot to ensure I have left unauthorised servers and the bot runs smoothly again.`);return}});});

client.on("ready", () => {

  client.user.setActivity(client.config.statusMessage, {type: `PLAYING`})

  client.dir = __dirname;
  giveaways.launch(client, __dirname)

  // Invites
  wait(1000);
  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      client.invites[g.id] = guildInvites;
    })})

  // Levels
  const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get()
  if (!table['count(*)']) {
    sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);").run()
    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run()
    sql.pragma("synchronous = 1")
    sql.pragma("journal_mode = wal")}
  client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
  client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);");

  // Invites
  const table2 = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'invites';").get();
  if (!table2['count(*)']) {
    sql.prepare("CREATE TABLE invites (id TEXT PRIMARY KEY, user TEXT, invites INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_invites_id ON invites (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");}

});
 
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const modules = ['fun','moderation','tickets','utilities','levels','giveaways','economy','modules']

async function fail(f){
  console.log(console.log('\x1b[41mERROR\x1b[40m Recieved an \x1b[31merror \x1b[37mloading commands in the module: \x1b[31m' + f + '\x1b[37m Please contact a Zeltux support member.'))
}

console.log(`\x1b[37m`)
console.log(`\x1b[42mINFO\x1b[40m \x1b[30m\x1b[32mStarting...\x1b[37m`)
console.log(`\x1b[37m`)
console.log(`\x1b[42mINFO\x1b[40m \x1b[37m----------------------------------\x1b[37m`)
console.log(`\x1b[42mINFO\x1b[40m \x1b[36m          Zeltux v${config.setup.version}\x1b[37m`)
console.log(`\x1b[42mINFO\x1b[40m \x1b[34m        Developed by \x1b[31mMatt\x1b[37m`)
console.log(`\x1b[42mINFO\x1b[40m \x1b[34m      with Azono & amaan1028\x1b[37m`)
console.log(`\x1b[42mINFO\x1b[40m \x1b[37m----------------------------------\x1b[37m`)
console.log(`\x1b[37m`)

modules.forEach(c => {
  fs.readdir(`./commands/${c}/`, (err, files) => {
  if (err) throw err;

  if(c === `fun`){if(client.config.core.fun === "off") return}
  if(c === `moderation`){if(client.config.core.moderation === "off") return}
  if(c === `tickets`){if(client.config.core.support === "off") return}
  if(c === `utilities`){if(client.config.core.utilities === "off") return}
  if(c === `giveaways`){if(client.config.core.giveaways === "off") return}
  if(c === `economy`){if(client.config.core.economy === "off") return}
  if(c === `levels`){if(client.config.core.levels === "off") return}

  if(c === 'modules'){

    files.forEach((f, i) =>{
      let props = require(`./commands/modules/${f}`)
      if(f.split(".").pop() === "js"){
      console.log(`\x1b[42mINFO\x1b[40m \x1b[33mLoaded \x1b[35mmodule \x1b[36m${f}\x1b[33m.\x1b[37m`);

      try {
        props.ready(client)
      }
      catch{return}

      try{
        if (props.cmd1 && !props.cmd1.help.name) return fail(f)
        if (!props.cmd1 && props.cmd1.help.name) return fail(f)
        client.commands.set(props.cmd1.help.name, props.cmd1);
        props.cmd1.help.aliases.forEach(function(a) {
          client.commands.set(a, props.cmd1)
        })
        }
        catch{return}
        try{
        if (props.cmd2 && !props.cmd2.help.name) return fail(f)
        if (!props.cmd2 && props.cmd2.help.name) return fail(f)
        client.commands.set(props.cmd2.help.name, props.cmd2);
        props.cmd2.help.aliases.forEach(function(a) {
          client.commands.set(a, props.cmd2)
        })
        }
        catch{return}
        try{
        if (props.cmd3 && !props.cmd3.help.name) return fail(f)
        if (!props.cmd3 && props.cmd3.help.name) return fail(f)
        client.commands.set(props.cmd3.help.name, props.cmd3);
        props.cmd3.help.aliases.forEach(function(a) {
          client.commands.set(a, props.cmd3)
        })
        }
        catch{return}
        try{
        if (props.cmd4 && !props.cmd4.help.name) return fail(f)
        if (!props.cmd4 && props.cmd4.help.name) return fail(f)
        client.commands.set(props.cmd4.help.name, props.cmd4);
        props.cmd4.help.aliases.forEach(function(a) {
          client.commands.set(a, props.cmd4)
        })
        }
        catch{return}
        try{
        if (props.cmd5 && !props.cmd5.help.name) return fail(f)
        if (!props.cmd5 && props.cmd5.help.name) return fail(f)
        client.commands.set(props.cmd5.help.name, props.cmd5);
        props.cmd5.help.aliases.forEach(function(a) {
          client.commands.set(a, props.cmd5)
        })
        }
        catch{return}
        try{
        if (props.cmd6 && !props.cmd6.help.name) return fail(f)
        if (!props.cmd6 && props.cmd6.help.name) return fail(f)
        client.commands.set(props.cmd6.help.name, props.cmd6);
        props.cmd6.help.aliases.forEach(function(a) {
          client.commands.set(a, props.cmd6)
        })
        }
        catch{return}
        try{
        if (props.cmd7 && !props.cmd7.help.name) return fail(f)
        if (!props.cmd7 && props.cmd7.help.name) return fail(f)
        client.commands.set(props.cmd7.help.name, props.cmd7);
        props.cmd7.help.aliases.forEach(function(a) {
          client.commands.set(a, props.cmd7)
        })
        }
        catch{return}
        try{
        if (props.cmd8 && !props.cmd8.help.name) return fail(f)
        if (!props.cmd8 && props.cmd8.help.name) return fail(f)
        client.commands.set(props.cmd8.help.name, props.cmd8);
        props.cmd8.help.aliases.forEach(function(a) {
          client.commands.set(a, props.cmd8)
        })
        }
        catch{return}
        try{
        if (props.cmd9 && !props.cmd9.help.name) return fail(f)
        if (!props.cmd9 && props.cmd9.help.name) return fail(f)
        client.commands.set(props.cmd9.help.name, props.cmd9);
        props.cmd9.help.aliases.forEach(function(a) {
          client.commands.set(a, props.cmd9)
        })
        }
        catch{return}
        try{
        if (props.cmd10 && !props.cmd10.help.name) return fail(f)
        if (!props.cmd10 && props.cmd10.help.name) return fail(f)
        client.commands.set(props.cmd10.help.name, props.cmd10);
        props.cmd10.help.aliases.forEach(function(a) {
          client.commands.set(a, props.cmd10)
        })
        }
        catch{return}
     }});
    console.log(`\x1b[37m`)
    console.log(`\x1b[42mINFO\x1b[40m \x1b[32mSuccesfully Started!\x1b[37m`)
    console.log(`\x1b[37m`)
  }
  else{
  console.log(`\x1b[42mINFO\x1b[40m \x1b[33mLoaded \x1b[35mcore \x1b[36m${c}\x1b[33m.\x1b[37m`);
    files.forEach(f => {
      let commandName = f.split(".")[0];
      const props = require(`./commands/${c}/${f}`);
      if(!client.config.disabledCommands.includes(commandName)){
      client.commands.set(commandName, props)}
    });
  }
  });
});

client.login(config.setup.token);