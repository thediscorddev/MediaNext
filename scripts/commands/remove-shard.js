const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
    console.log("test")
 if (message.member.permissions.has('MANAGE_GUILD') || message.author.id == process.env['OWNERID']) {
   const collection = clients.db("Leveling").collection('balance');
  let user = null;
    if(!args[0] || !args[1]) return message.reply(`invaild usage, command + userid + amount`);
    if(!parseInt(args[1])) return message.reply(`that's isn't a number tho`);

    try {
    await client.users.fetch(args[0]).then(m => user = m.id)
      
      }catch (e){
      if (message.mentions.members.first()) {
        user = message.mentions.members.first().user.id;
      }else return message.reply(`${e} <--- check again. (if the user exist, don't need to be in balance's db, then blame thein for that)`)
      
    }

  collection.find({id:user}).toArray(function(err, docs) {
    let embed = new Discord.MessageEmbed()
    .setTitle(`successfully remove ${parseInt(args[1])} shard ${client.users.cache.find(u => u.id === user).tag}'s balance`)
    .setThumbnail(`https://cdn.discordapp.com/avatars/${user}/${client.users.cache.find(u => u.id === user).avatar}.webp`)
    if(docs.length == 1) {
      docs.forEach(i => {
        collection.updateOne({id:user},{$set:{"shard":i.shard - parseInt(args[1])}})
        embed.addField('now:','he own:',false)
        embed.addField(`$mpd:`,`${i.mpd}`,true)
        embed.addField(`Shards:`,`${i.shard- parseInt(args[1])}`,true)
        embed.addField(`Crystal:`,`${i.crystal}`,true)
        embed.addField(`$premium:`,`${i.premium}`,true)
        embed.addField(`Seasonal Items:`,`${i.seasons}`,true)
        message.channel.send({ embeds: [embed] })
      })
    }
    if(docs.length == 0) {
       collection.insertMany([{"id":user,"mpd":0,"0-shard":parseInt(args[1]),"crystal":0,"premium":0,"seasons":0}], function(err, result) {
        embed.addField('now:','he own:',false)
        embed.addField(`$mpd:`,`0`,true)
        embed.addField(`Shards:`,`${0-parseInt(args[1])}`,true)
        embed.addField(`Crystal:`,`0`,true)
        embed.addField(`$premium:`,`0`,true)
        embed.addField(`Seasonal Items:`,`0`,true)
      message.channel.send({ embeds: [embed] })
  });
    }
  })
  } else return message.reply("u are not staff or dev team")
};
exports.slots = async() => {
// 1 = public
// 2 = developer only
// 3 = verifed member
// 4 = staff
// null = custom command(it doesn't have id);
return 4;
}
exports.name = async() => {
  return "remove-shard";
}
exports.desc = async() => {
  return `remove shard! (don't remove my shard ok jk)`;
}