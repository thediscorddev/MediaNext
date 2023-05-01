const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
   if (message.author.id == process.env['OWNERID'] || message.member.permissions.has('MANAGE_GUILD')) {
  const collections = clients.db("Leveling").collection('store');
  const collectionsa = clients.db("Leveling").collection('inv');
      let member = message.mentions.members.first() ||  await message.guild.members.cache.get(args[0]);
     if(!member || !args[1]) return message.reply(`\`m!add-user-item <user ping /id> <item id> <amount>\``)
     let amountofitems = args[2]
     if(!args[2] || parseInt(args[2]) == "NaN") amountofitems = 1;
collectionsa.find({id:member.user.id}).toArray(function (err,inv) {
  if(inv.length == 0) return message.reply(`no user matched query selector`);
  collections.find({id:args[1].toString()}).toArray(function(err,doc) {
    if(doc.length != 1) return message.reply(`something wrong with the query selector :(, i'm mean no items found with that id!`);
    doc.forEach(item => {
      

       
        
        
            if(inv.length == 0) {
              collectionsa.insertMany([{"id":member.user.id,"items":[{"id":args[1].toString(),"amount":amountofitems}],"spenditem":[]}], function(err, result) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`successfully buy ${item.displayname}`);
            message.channel.send({embeds:[embed]});
  });
            }
            inv.forEach(invs => {
              let checkitems = invs.items.find(a => a.id == args[1].toString())
              
              if(checkitems == undefined) {
                collectionsa.updateOne({id:member.user.id},{$push:{items:{"id":args[1].toString(),"amount":parseInt(amountofitems)}}},function(err,results) {})
              } else {
                 collectionsa.updateOne({id:member.user.id,'items.id':args[1].toString()},{$set:{'items.$.amount':parseInt(checkitems.amount) + parseInt(amountofitems)}},function(err,results) {
                   
                 })
              }        
            
          
            })
            let embed = new Discord.MessageEmbed()
            .setTitle(`successfully added ${amountofitems} ${item.displayname} to ${member.user.username}`);
            message.channel.send({embeds:[embed]});
            return;
          
          
        
      
       
        
          //jj
              
            
          
            
      
    })
  })
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