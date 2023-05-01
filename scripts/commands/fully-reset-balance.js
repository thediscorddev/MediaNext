const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
    console.log("test")
      if(message.member.permissions.has('MANAGE_GUILD') || message.author.id == process.env['OWNERID']) {
       const collection = clients.db("Leveling").collection('balance');
    if(!args[0]) return message.reply(`invaild usage, command  + type (money, shards, crystals, premium, seasons or all) (cap lock does not required!)`);
  let typeical = args[0].toString().toLowerCase()
        let typical = args[0].toString().toLowerCase()


  collection.find().toArray(async (err, docs) => {
   

      docs.forEach(i => {
        console.log("e");
        let user = i.id
         let embed = new Discord.MessageEmbed()
    .setTitle(`successfully reset
user with id ${i.id}'s ${typeical} balance`)
      if(typical == "money") {
        collection.updateOne({id:user},{$set:{"mpd":0}})
        embed.addField('now:','he own:',false)
        embed.addField(`$mpd:`,`0`,true)
        embed.addField(`Shards:`,`${i.shard}`,true)
        embed.addField(`Crystal:`,`${i.crystal}`,true)
        embed.addField(`$premium:`,`${i.premium}`,true)
        embed.addField(`Seasonal Items:`,`${i.seasons}`,true)
        client.channels.cache.get('795253328266919957').send({ embeds: [embed] })
                              return
                             }
        if(typical == "shards") {
          collection.updateOne({id:user},{$set:{"shard":0}})
        embed.addField('now:','he own:',false)
        embed.addField(`$mpd:`,`${i.mpd}`,true)
        embed.addField(`Shards:`,`0`,true)
        embed.addField(`Crystal:`,`${i.crystal}`,true)
        embed.addField(`$premium:`,`${i.premium}`,true)
        embed.addField(`Seasonal Items:`,`${i.seasons}`,true)
         client.channels.cache.get('795253328266919957').send({ embeds: [embed] })
                                 return
                               }
        if(typical == "crystals") {
          collection.updateOne({id:user},{$set:{"crystal":0}})
        embed.addField('now:','he own:',false)
        embed.addField(`$mpd:`,`${i.mpd}`,true)
        embed.addField(`Shards:`,`${i.shard}`,true)
        embed.addField(`Crystal:`,`0`,true)
        embed.addField(`$premium:`,`${i.premium}`,true)
        embed.addField(`Seasonal Items:`,`${i.seasons}`,true)
        client.channels.cache.get('795253328266919957').send({ embeds: [embed] })
                                   return
                               }
        if(typical == "premium") {
          collection.updateOne({id:user},{$set:{"premium":0}})
        embed.addField('now:','he own:',false)
        embed.addField(`$mpd:`,`${i.mpd}`,true)
        embed.addField(`Shards:`,`${i.shard}`,true)
        embed.addField(`Crystal:`,`${i.crystal}`,true)
        embed.addField(`$premium:`,`0`,true)
        embed.addField(`Seasonal Items:`,`${i.seasons}`,true)
        client.channels.cache.get('795253328266919957').send({ embeds: [embed] })
                                  return
} 
        if(typical == "seasons") {
          collection.updateOne({id:user},{$set:{"seasons":0}})
        embed.addField('now:','he own:',false)
        embed.addField(`$mpd:`,`${i.mpd}`,true)
        embed.addField(`Shards:`,`${i.shard}`,true)
        embed.addField(`Crystal:`,`${i.crystal}`,true)
        embed.addField(`$premium:`,`${i.premium}`,true)
        embed.addField(`Seasonal Items:`,`0`,true)
         client.channels.cache.get('795253328266919957').send({ embeds: [embed] })
                                  return
                       }
        if(typical == "all") {
          collection.updateOne({id:user},{$set:{"mpd":0,"shard":0,"crystal":0,"premium":0,"seasons":0}})
        embed.addField('now:','he own:',false)
        embed.addField(`$mpd:`,`0`,true)
        embed.addField(`Shards:`,`0`,true)
        embed.addField(`Crystal:`,`0`,true)
        embed.addField(`$premium:`,`0`,true)
        embed.addField(`Seasonal Items:`,`0`,true)
         client.channels.cache.get('795253328266919957').send({ embeds: [embed] })
                              return
                             } else return message.reply("invaild synax");
      })
    
  })
   
  } else return message.reply("u are not staff or dev team")
};
exports.slots = async() => {
// 1 = public
//) 2 = developer only
// 3 = verifed member
// 4 = staff
// null = custom command(it doesn't have id);
return 4;
}
exports.name = async() => {
  return "fully-reset-balance";
}
exports.desc = async() => {
  return `reset everyone's wallet! (ofc staff only)`;
}