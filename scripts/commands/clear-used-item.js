const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
if (message.author.id === process.env.OWNERID || message.member.permissions.has("MANAGE_GUILD")) {
  const collectionsa = clients.db("Leveling").collection('inv');
      let member = message.mentions.members.first() ||  await message.guild.members.cache.get(args[0]);
     if(!member) return message.reply(`\`m!clear-used-item <user ping /id> \``)
collectionsa.find({id:member.user.id}).toArray(function (err,inv) {
  if(inv.length == 0) return message.reply(`no user matched query selector`);


   
      

       
           
                 collectionsa.updateOne({id:member.user.id},{$set:{'spenditem':[]}},function(err,results) {
                   
                 })
                     
            
          
            
            let embed = new Discord.MessageEmbed()
            .setTitle(`successfully clear ${member.user.username}'s used item`);
            message.channel.send({embeds:[embed]});
            return;
          
          
        
      
       
        
          //jj
              
            
          
            
      
    
  
})
   }
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
  return "buy";
}
exports.desc = async() => {
  return "buy!";
}