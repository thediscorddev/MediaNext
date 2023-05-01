const Discord = require('discord.js');
let ms = require('ms') 
    let db = require('quick.db') 
exports.run = async(client, message, args, clients) => {
  const collection = clients.db("Leveling").collection('balance');
  //check if there is cooldown 	
  const timeout = 3600000; 
  // 1 hour in milliseconds, change to the desired cooldown time, in milliseconds 
  let embed = new Discord.MessageEmbed()
    
    .setThumbnail(`https://cdn.discordapp.com/avatars/${message.author.id}/${client.users.cache.find(u => u.id === message.author.id).avatar}.webp`)
  const cooldown = await db.fetch(`cooldown_Work_${message.author.id}`); 	
  if (cooldown !== null && timeout - (Date.now() - cooldown) > 0) { 
    console.log(Date.now())
    const time = timeout - (Date.now() - cooldown); 
   embed.setTitle(`❌oops❌`);  
                                                                   embed.setDescription(`${message.author.tag} you must till <t:${parseInt((Date.now() + time) / 1000)}> before start working again (or ${ms(time)})`)                                                    
                                                                   message.reply({embeds:[embed]}); 	} else {
    let job = [{"max":25,"shardmax":50,"crystalmax":5,"title":"student"},{"max":50,"shardmax":75,"crystalmax":7,"title":"worker"},{"max":70,"shardmax":100,"crystalmax":10,"title":"rich youtuber"}]
    let curjob = job[Math.floor(Math.random() * job.length)]
    let money = Math.floor(Math.random() * curjob.max)
    let shard = Math.floor(Math.random() * curjob.shardmax)
    let crystal = Math.floor(Math.random() * curjob.crystalmax)
    collection.find({id:message.author.id}).toArray(function (err, docs) {
      if(docs.length == 1) {
        docs.forEach(i => {
          collection.updateOne({id:message.author.id},{$set:{"mpd":i.mpd + parseInt(money),"shard":i.shard + parseInt(shard),"crystal":i.crystal + parseInt(crystal)}})
        })
      }
    })
    embed.setTitle(`📣wohoo yay📣`);
    embed.setDescription(`you earned ${money} $mpd, ${shard} shards & ${crystal} crystals as a ${curjob.title}!`)
    message.reply({embeds:[embed]})
  //code here that runs if there is no cooldown
  // code put after no cooldown code, to set the cooldown 		
  db.set(`cooldown_Work_${message.author.id}`, Date.now()); 
}
    console.log("test")
    };
exports.slots = async() => {
// 3 = verifed member
// 4 = staff
// null = custom command(it doesn't have id);
return 1;
}
exports.name = async() => {
  return "work";
}
exports.desc = async() => {
  return `work4money`;
}