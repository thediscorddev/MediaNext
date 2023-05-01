const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
   const collection = clients.db("Leveling").collection('inv');
   const collections = clients.db("Leveling").collection('store');
  	 let user = message.mentions.members.first() ||  await message.guild.members.cache.get(args[0]) || await message.guild.members.cache.get(message.author.id);
  collection.find({id:user.user.id}).toArray(function(err, docs) {
            global.embed = new Discord.MessageEmbed()
   
     .setTitle(`${user.user.tag}'s inventory`)
    .setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${user.user.avatar}.webp`)
    if(docs.length == 1) {
      docs.forEach(i => {
        let arr = []

      
        let idss = 0
        if(i.items.length != 0) {
        i.items.map(i2 => {
          collections.find().toArray((err, docsh) => {    
          let v = docsh.find(e => e.id == i2.id)
            if(!v) {
     embed.addField(`deleted item`,`this item was deleted, but you own ${i2.amount} of them`,true)
      idss +=1
            } else {        
     embed.addField(`${v.firstintro} - ${v.displayname}`,`${user.user.username} own ${i2.amount}`,true) 
              idss +=1;
          }
              
                                                             
            
            if(idss == i.items.length) return message.channel.send({ embeds: [embed] })
          })
         
        })
        }
        if(i.items.length == 0) {
          embed.addField('u currently didnot own any item yet! buy some!',`** **`, true)
          return message.channel.send({ embeds: [embed] })
        }

        
      
      })
    }
    if(docs.length == 0) {
        collection.insertMany([{"id":user.user.id,"items":[],"spenditem":[]}], function(err, result) {
         console.log(result)
        embed.addField('Oh my gosh','You did not own any item in your inv :(((',true)
      message.channel.send({ embeds: [embed] })
  });
    }
  })
};
exports.slots = async() => {
// 1 = public
// 2 = developer only
// 3 = verifed member
// 4 = staff
// null = custom command(it doesn't have id);
return 1;
}
exports.name = async() => {
  return "inv";
}
exports.desc = async() => {
  return "view ur inv (outdated)";
}