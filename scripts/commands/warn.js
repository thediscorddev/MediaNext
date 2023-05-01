const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
if(message.guild.id == 809722018953166858) return;
    
      
    if(message.author.id === process.env.OWNERID) {
     
    warn(client,message,args,clients);  
      
    } else if(message.member.permissions.has('MANAGE_GUILD')) {
      warn(client,message,args,clients)
}else return
};
async function warn(client, message, args, clients) {
  const collection = clients.db("Leveling").collection('warnings');
  var reply = args.slice(1).join(' ');
   let member = message.mentions.members.first() ||  await message.guild.members.cache.get(args[0]);
			if (!member) return message.reply('Please mention a valid member of this server');
 
      if(!reply) reply = "no reason provided."

   collection.find({"id":member.user.id}).toArray(function(err, docs) {
    if(docs.length == 1) {
     collection.updateOne({"id":member.user.id},{$push:{warn:{"id":Math.floor(Math.random() * 999999999),"time":parseInt(Date.now() / 1000),"reason":reply,"by":message.author.id}}},function(err, result) {
       client.users.cache.get(member.id).send(`you have been warned in ${message.guild.name} because ${reply}`)
    message.channel.send(`${member.user.tag} has been warned because ${reply}`);
     })
    }
    if(docs.length == 0) {
       collection.insertMany([{"id":member.user.id,"kick":[],"ban":[],"warn":[{"id":Math.floor(Math.random() * 999999999),"time":parseInt(Date.now() / 1000),"reason":reply,"by":message.author.id}],"mute":[]}], function(err, result) {
         client.users.cache.get(member.id).send(`you have been warned in ${message.guild.name} because ${reply}`)
    message.channel.send(`${member.user.tag} has been warned because ${reply}`);
  });
    }
  })
  return;
     
}
exports.slots = async() => {
// 1 = public
// 2 = developer only
// 3 = verifed member
// 4 = staff
// null = custom command(it doesn't have id);
return 4;
}
exports.name = async() => {
  return "add-command";
}
exports.desc = async() => {
  return "add custom to the mediaNext's database";
}