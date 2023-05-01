const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
  const collection = clients.db("Leveling").collection('store');
 if (message.member.permissions.has('MANAGE_GUILD') || message.author.id == process.env['OWNERID']) {
   if(!args[0] || !args[1] || !args[2] || !args[3] || !args[4] || !args[5] || !args[6] || !args[7]) return message.reply(`\`m!add-item <item name> <emoiji> <MPD> <SHARD> <CRYSTAL> <PREMIUM> <SEASONAL ITEMS> <DESC> (you'll have to take every args)\``);
  await collection.find({"displayname":args[0]}).toArray(function(err, docs)  {
if(docs.length == 1) return message.reply(`item already exist in the database!`);
    let itemid = Math.floor(Math.random() * (129384755383 - 159890) + (9/2))

       let mpd = parseInt(args[2]) || 0;
    let shards = parseInt(args[3]) || 0;
    let crystal = parseInt(args[4]) || 0;
    let pcoin = parseInt(args[45]) || 0;
    let sitems = parseInt(args[6]) || 0;
    let desc = args.slice(7).join(' ')
    let embed = new Discord.MessageEmbed()
    collection.insertMany([{"id":itemid.toString(),"displayname":args[0].toString(),"mpd":mpd,"shard":shards,"crystal":crystal,"premium":pcoin,"seasons":sitems,"firstintro":args[1],"description":desc}], function(err, result) {
        embed.setTitle('successfully add new item to database')
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
  return "store";
}
exports.desc = async() => {
  return "what does we offer today?";
}