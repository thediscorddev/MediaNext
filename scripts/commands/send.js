const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
   const collection = clients.db("Leveling").collection('balance');
  	 let user = message.mentions.members.first() ||  await message.guild.members.cache.get(args[0]);
  if(!user || user.user.id == message.author.id) return message.reply(`\`m!send <user ping/id> <amount> <mpd, shard. crystal,premium or seasons>\``)
  collection.find({id:user.user.id}).toArray(function(err, docs) {
    if(parseInt(args[1]) == "NaN") return message.reply(`not a number`)
    let jsonss = ["mpd","shard","crystal","premium","seasons"]
    if(jsonss.indexOf(args[2].toLowerCase()) == -1) return message.reply(`invaild currency`)
    let currency = {
      "mpd":"$MPD",
      "shard":"shards",
      "crystal":"crystals",
      "premium":"$premium",
      "seasons":"Seasonal Items"
    }
    collection.find({id:message.author.id}).toArray(function(err, dos) {
     dos.forEach(author => {
       if(author[`${args[2].toLowerCase()}`] - parseInt(args[1]) < 0)
        {
         return message.reply(`you don't have enough ${currency[args[2].toLowerCase()]} to send!`);
       }else {
          let embed = new Discord.MessageEmbed()
    .setTitle(`successfully send ${args[1]} ${currency[args[2].toLowerCase()]} to ${user.user.username}`)
    .setThumbnail(`https://cdn.discordapp.com/avatars/${user.user.id}/${user.user.avatar}.webp`);
     madd(message,docs,args,collection,user,embed,author);    
  
        
        
       }
     })
    })
  })
};
async function madd(message,docs,args,collection,user,embed,author) {
 
  let choice = args[2]
  if(choice == "mpd") {
     if(docs.length == 1) {
           docs.forEach(i => {
              collection.updateOne({"id":message.author.id},{$set:{mpd:parseInt(author[args[2].toLowerCase()]) - parseInt(args[1])}})
                   collection.updateOne({"id":user.user.id},{$set:{mpd:parseInt(i[args[2].toLowerCase()]) + parseInt(args[1])}})
            
             message.channel.send({embeds:[embed]})
           })
         }
         if(docs.length == 0) {
           collection.insertMany([{"id":user.user.id,"mpd":parseInt(args[1]),"shard":0,"crystal":0,"premium":0,"seasons":0}], function(err, result) {
       
      message.channel.send({ embeds: [embed] })
  });
         }
  }
  if(choice == "shard") {
     if(docs.length == 1) {
           docs.forEach(i => {
              collection.updateOne({"id":message.author.id},{$set:{shard:parseInt(author[args[2].toLowerCase()]) - parseInt(args[1])}})
                   collection.updateOne({"id":user.user.id},{$set:{shard:parseInt(i[args[2].toLowerCase()]) + parseInt(args[1])}})
            
             message.channel.send({embeds:[embed]})
           })
         }
         if(docs.length == 0) {
           collection.insertMany([{"id":user.user.id,"mpd":0,"shard":parseInt(args[1]),"crystal":0,"premium":0,"seasons":0}], function(err, result) {
       
      message.channel.send({ embeds: [embed] })
  });
         }
  }

  if(choice == "crystal") {
     if(docs.length == 1) {
           docs.forEach(i => {
              collection.updateOne({"id":message.author.id},{$set:{crystal:parseInt(author[args[2].toLowerCase()]) - parseInt(args[1])}})
                   collection.updateOne({"id":user.user.id},{$set:{crystal:parseInt(i[args[2].toLowerCase()]) + parseInt(args[1])}})
            
             message.channel.send({embeds:[embed]})
           })
         }
         if(docs.length == 0) {
           collection.insertMany([{"id":user.user.id,"mpd":0,"shard":0,"crystal":parseInt(args[2]),"premium":0,"seasons":0}], function(err, result) {
       
      message.channel.send({ embeds: [embed] })
  });
         }
  }

  if(choice == "premium") {
     if(docs.length == 1) {
           docs.forEach(i => {
              collection.updateOne({"id":message.author.id},{$set:{premium:parseInt(author[args[2].toLowerCase()]) - parseInt(args[1])}})
                   collection.updateOne({"id":user.user.id},{$set:{premium:parseInt(i[args[2].toLowerCase()]) + parseInt(args[1])}})
            
             message.channel.send({embeds:[embed]})
           })
         }
         if(docs.length == 0) {
           collection.insertMany([{"id":user.user.id,"mpd":0,"shard":0,"crystal":0,"premium":parseInt(args[1]),"seasons":0}], function(err, result) {
       
      message.channel.send({ embeds: [embed] })
  });
         }
  }

    if(choice == "premium") {
     if(docs.length == 1) {
           docs.forEach(i => {
              collection.updateOne({"id":message.author.id},{$set:{seasons:parseInt(author[args[2].toLowerCase()]) - parseInt(args[1])}})
                   collection.updateOne({"id":user.user.id},{$set:{seasons:parseInt(i[args[2].toLowerCase()]) + parseInt(args[1])}})
            
             message.channel.send({embeds:[embed]})
           })
         }
         if(docs.length == 0) {
           collection.insertMany([{"id":user.user.id,"mpd":0,"shard":0,"crystal":0,"premium":0,"seasons":parseInt(args[1])}], function(err, result) {
       
      message.channel.send({ embeds: [embed] })
  });
         }
  }
}
exports.slots = async() => {
// 1 = public
// 2 = developer only
// 3 = verifed member
// 4 = staff
// null = custom command(it doesn't have id);
return 1;
}
exports.name = async() => {
  return "balance";
}
exports.desc = async() => {
  return "view ur wallet (outdated)";
}