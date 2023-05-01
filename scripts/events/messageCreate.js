const Chatbot  =  require("discord-chatbot");

const chatbot  =  new  Chatbot({name: "MediaNext", gender: "Male"});
exports.run = async(client, clients, prefix, message) => {
if(message.author.bot || message.channel.type === "DM" || message.webhookId) return;
check(message,clients);
const args = message.content.slice(prefix.length).trim().split(' ');
  if (message.content.indexOf(prefix) !== 0) {
     let cd = require(`./../functions/levelingsystem.js`);
cd.run(client, message, args, clients);
    if(message.channel.id == "977889136679743608") {
      chatbot.chat(args.join(' ')).then(response=>message.reply(response)).catch(e => message.reply('hmm'));
    }
    return;
  }

	const command = args.shift().toLowerCase();
   
try {
		let commands = require(`./../commands/${command}.js`);
  commands.run(client, message, args, clients);
	} catch (err) {
        let collection = clients.db("Leveling").collection("customcommand");
   collection.find({"name":command}).toArray(function(err, docs) {
    if(docs.length == 1) {
      docs.forEach(commando => {
        message.channel.send(commando.reply
        .replace('<member.tag>',`${message.author.tag}`)
.replace('<member.id>',`${message.author.id}`)
.replace('<member>',`${message.author}`));
return;
      })
      return;
    }
    return;
  });

			}
		}

function check(user,clients) {
  const collection = clients.db("Leveling").collection('warnings');
     collection.find({"id":user.author.id}).toArray(function(err, docs) {
    if(docs.length == 1) {
      return console.log(user.author.username,user.author.id);
    }
    if(docs.length == 0) {
       collection.insertMany([{"id":user.author.id,"kick":[],"ban":[],"warn":[],"mute":[]}], function(err, result) {
         return console.log(user.author.username,user.author.id);
  });
    }
  })
}
