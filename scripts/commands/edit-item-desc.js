const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
  const collection = clients.db("Leveling").collection('store');
 if (message.member.permissions.has('MANAGE_GUILD') || message.author.id == process.env['OWNERID']) {
   if(!args[0] || !args[1]) return message.reply(`invaild usage: command + item id + new desc`);
  await collection.find({"id":args[0]}).toArray(function(err, docs)  {
if(docs.length == 0) return message.reply(`item isn't exist in the database!`);
   
    let embed = new Discord.MessageEmbed()
    collection.updateOne({"id":args[0]},{$set:{"description":args.slice(1).join(' ')}}, function(err, result) {
        embed.setTitle('successfully edit item\'s description')
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
  return "edit-item-desc";
}
exports.desc = async() => {
  return "edit item desc!";
}