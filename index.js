const Discord = require('discord.js');

const fs = require(`fs`);
Intents = new Discord.Intents(32767);
const client = new Discord.Client({intents: Intents });
client.options.http.api = "https://discord.com/api"
let prefix = "m!";
const MongoClient = require('mongodb').MongoClient;
const url = process.env.DB;
var dbs = null;
const clients = new MongoClient(url);
clients.connect(async function(err) {
  reload()              
setInterval(reload,120000);

});
const keepAlive = require(`./scripts/functions/uptime.js`);
fs.readdir(`./scripts/events/`, (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./scripts/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => {
      eventFunction.run(client, clients, prefix, ...args)
    });
  });
});

async function reload() {
 
}
keepAlive.run();
process.on('uncaughtException', (error) => { 
  console.log('Oh my god, something terrible happened: ', error)
    
})

  console.log('Connected successfully to server');
