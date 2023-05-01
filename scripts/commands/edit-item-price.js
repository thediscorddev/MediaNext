const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
  const collection = clients.db("Leveling").collection('store');
 if (message.member.permissions.has('MANAGE_GUILD') || message.author.id == process.env['OWNERID']) {
   if(!args[0]) return message.reply(`\`command + <item id> + amount of $MPD + amount of shards + amount of crystals + amount of premium coins + amount of seasonal items (you can just provide empty item price and it'll set to 0, or fill up 1 or 2 currency and leave other empty)\``);
  await collection.find({"id":args[0]}).toArray(function(err, docs)  {
if(docs.length == 0) return message.reply(`item isn't exist in the database!`);

    let mpd = parseInt(args[1]) || 0;
    let shards = parseInt(args[2]) || 0;
    let crystal = parseInt(args[3]) || 0;
    let pcoin = parseInt(args[4]) || 0;
    let sitems = parseInt(args[5]) || 0;
    let embed = new Discord.MessageEmbed()
    collection.updateOne({"id":args[0]},{$set:{"mpd":mpd,"shard":shards,"crystal":crystal,"premium":pcoin,"seasons":sitems}}, function(err, result) {
        embed.setTitle('successfully edit item\'s price')
      message.channel.send({ embeds: [embed] })
  });
    
  })
 }else return message.reply(`you aren't in the dev or staff team!`);
};
exports.slots = function() {
// 1 = public
// 2 = developer only
// 3 = verifed member
// 4 = staff
// null = custom command(it doesn't have id);
return 1;
}
exports.name = async() => {
  return "edit-item-price";
}
exports.desc = async() => {
  return "how much do you want to get from ppl?";
}