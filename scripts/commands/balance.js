const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
   const collection = clients.db("Leveling").collection('balance');
  let user = null;
  if(args[0]) {
    try {
    await client.users.fetch(args[0]).then(m => user = m.id)
      
      }catch (e){
      console.log("unkown checking err with " + e)
      user = message.author.id
    }
  } else user = message.author.id
  collection.find({id:user}).toArray(function(err, docs) {
    console.log(user)
    let embed = new Discord.MessageEmbed()
    .setTitle(`${client.users.cache.find(u => u.id === user).tag}'s balance`)
    .setThumbnail(`https://cdn.discordapp.com/avatars/${user}/${client.users.cache.find(u => u.id === user).avatar}.webp`)
    if(docs.length == 1) {
      console.log("reachable")
      docs.forEach(i => {
        embed.addField(`$mpd:`,`${i.mpd}`,true)
        embed.addField(`Shards:`,`${i.shard}`,true)
        embed.addField(`Crystal:`,`${i.crystal}`,true)
        embed.addField(`$premium:`,`${i.premium}`,true)
        embed.addField(`Seasonal Items:`,`${i.seasons}`,true)
        message.channel.send({ embeds: [embed] })
      })
    }
    if(docs.length == 0) {
       collection.insertMany([{"id":user,"mpd":0,"shard":0,"crystal":0,"premium":0,"seasons":0}], function(err, result) {
        embed.addField(`mpd:`,`0`,true)
        embed.addField(`shard:`,`0`,true)
        embed.addField(`crystal:`,`0`,true)
        embed.addField(`premium:`,`0`,true)
        embed.addField(`seasons:`,`0`,true)
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
  return "balance";
}
exports.desc = async() => {
  return "view ur wallet (outdated)";
}