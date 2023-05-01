const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
  
   const collection = clients.db("Leveling").collection('inv');
  const collections = clients.db("Leveling").collection('store');
  	 let user = message.mentions.members.first() ||  await message.guild.members.cache.get(args[0]);
  if(!user) return message.reply(`\`m!send-items <user ping/id> <item id> <amount>\``)
  collection.find({id:user.user.id}).toArray(function(err, docs) {
    if(parseInt(args[2]) == "NaN") return message.reply(`not a number`)
    
    collection.find({id:message.author.id}).toArray(function(err, dos) {
     dos.forEach(author => {
       if(parseInt(args[2]) < 1) return message.reply(`no sending half an item, or not full item here.`)
       if(author.items.find(x => x.id = args[1].toString()).amount - parseInt(args[2]) < 0)
        {
         return message.reply(`you don't have enough items to send!`);
       }else {
          let embed = new Discord.MessageEmbed()
    .setTitle(`successfully send ${args[2].toLowerCase()} items to ${user.user.username}`)
    .setThumbnail(`https://cdn.discordapp.com/avatars/${user.user.id}/${user.user.avatar}.webp`);
         if(docs.length == 0) collection.insertMany([{"id":user.user.id,"items":[],"spenditem":[]}])
   collections.find({"id":args[1]}).toArray((err, doa) => {
   if(doa.length == 0) return message.reply(`invaild item`)  
    madd(message,args,collection,user,embed,author);    
   })
        
        
       }
     })
    })
  })
};
async function madd(message,args,collection,user,embed,author) {
 collection.find({"id":user.user.id}).toArray(function (err, docs) {
 
   console.log("1")
   docs.forEach(i => {
       authoritems = author.items.find(x => x.id = args[1])
   reciveritems = i.items.find(id => id.id === args[1])
     console.log(authoritems,reciveritems)
   if(authoritems.amount == parseInt(args[2]) && reciveritems == undefined) {
     collection.updateOne({"id":message.author.id},{$pull:{items:{"id":args[1]}}}, (err, res) => {
       collection.updateOne({"id":user.user.id},{$push:{"items":{"id":args[1],"amount":parseInt(args[2])}}}, (er,rs) => {
         console.log(rs)
       })
     });

   }
     if(authoritems.amount > parseInt(args[2]) && reciveritems == undefined) {
       console.log("2")
     collection.updateOne({"id":message.author.id,'items.id':args[1].toString()},{$set:{'items.$.amount':parseInt(authoritems.amount) - parseInt(args[2])}}, (err, ds) => {
       collection.updateOne({"id":user.user.id},{$push:{"items":{"id":args[1],"amount":parseInt(args[2])}}}, (er, dc) => console.log(dc))
     })

     }
   
     if(authoritems.amount == parseInt(args[2]) && reciveritems != undefined) {
       console.log("3")
     collection.updateOne({"id":message.author.id},{$pull:{items:{"id":args[1]}}}, (err, ocs) => {
       collection.updateOne({"id":user.user.id,"items.id":args[1].toString()},{$set:{"items.$.amount":parseInt(reciveritems.amount) + parseInt(args[2])}}, (err, d) => console.log(d))
     })

   }
    if(authoritems.amount > parseInt(args[2]) && reciveritems != undefined) {
       console.log("4")
     collection.updateOne({"id":message.author.id,'items.id':args[1].toString()},{$set:{'items.$.amount':parseInt(authoritems.amount) - parseInt(args[2])}}, (err, ds) => {
      collection.updateOne({"id":user.user.id,"items.id":args[1].toString()},{$set:{"items.$.amount":parseInt(reciveritems.amount) + parseInt(args[2])}}, (err, d) => console.log(d))
     
     })

   }
     message.channel.send({embeds:[embed]})
 })
  
 })            
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