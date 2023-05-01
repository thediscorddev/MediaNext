const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
    console.log("test")
   const collection = clients.db("Leveling").collection('balance');
  let user = message.author.id;
    if(!args[0]) return message.reply(`invaild usage, command  + amount`);
    if(!parseInt(args[0])) return message.reply(`that's isn't a number tho`);

     

  collection.find({id:user}).toArray(function(err, docs) {
    if(parseInt(args[0]) < 1000) return message.reply(`min convert: 1000 shards`);
    let amount = parseInt(args[0]) / 1000;
    let embed = new Discord.MessageEmbed()
    .setTitle(`successfully converted ${parseInt(args[0])} shard to ${amount}`)
    .setThumbnail(`https://cdn.discordapp.com/avatars/${user}/${client.users.cache.find(u => u.id === user).avatar}.webp`)
    if(docs.length == 1) {
      docs.forEach(i => {
        if(i.shard > amount) {
        collection.updateOne({id:user},{$set:{"shard":i.shard - parseInt(args[0]),"crystal":i.crystal + amount}})
        message.channel.send({ embeds: [embed] })
        } else return message.reply(`not enough shards to perform action.`);
      })
    }
    if(docs.length == 0) {
       return;
    }
  })
  
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
  return "add-shard";
}
exports.desc = async() => {
  return `want a broken crystal? (jk it's not a broken crystal, is the crystal's fragment)`;
}