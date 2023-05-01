const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
  
  const collection = clients.db("Leveling").collection('balance');
  const collections = clients.db("Leveling").collection('store');
  const collectionsa = clients.db("Leveling").collection('inv');
  if(!args[0] || !args[1]) return message.reply(`there is so many air in the world! m!sell + item id + amount`)
  let amountofi = 0;
  if(!parseInt(args[1])|| parseInt(args[1]) == 0 || parseInt(args[1]) < 0) amountofi = 1;
  if(parseInt(args[1])|| parseInt(args[1]) > 0) amountofi = args[1];
collection.find({id:message.author.id}).toArray(function (err,docs) {
  collections.find({id:args[0].toString()}).toArray(function(err,doc) {
    if(docs.length != 1 && doc.length != 1) return
    doc.forEach(items => {
      docs.forEach(wallet => {

                 purchase(client,message,args,collection,collectionsa,items,wallet,amountofi);

      })
    })
  })
})
};
function purchase(client,message,args,collection,collectionsa,item,wallet,amountofi) {

  
            collectionsa.find({id:message.author.id}).toArray(function(err, inv ) {
             if (inv.length ==  0) {
               let embed = new Discord.MessageEmbed()
            embed.setTitle(`ouch`)
            embed.setColor(`BLUE`)
            embed.setDescription(`😢${message.author.username}, you do not have enough items to sell \n you need:`)
                embed.addField(`item needed:`,`${amountofi} more`,true)
                 embed.setFooter(`${Date.now()}`)
                 message.channel.send({embeds:[embed]})
               }
                inv.forEach(invs => {
                    let iten = invs.items.find(iteminfo => iteminfo.id === args[0].toString());
                  if(!iten){
                let embed = new Discord.MessageEmbed()
            embed.setTitle(`ouch`)
            embed.setColor(`BLUE`)
            embed.setDescription(`😢${message.author.username}, you do not have enough items to sell \n you need:`)
                embed.addField(`item needed:`,`${parseInt(amountofi) } more`,true)
                 embed.setFooter(`${Date.now()}`)
                 message.channel.send({embeds:[embed]})
                return;
              }
              if(parseInt(iten.amount) < parseInt(amountofi)) {
                let embed = new Discord.MessageEmbed()
            embed.setTitle(`ouch`)
            embed.setColor(`BLUE`)
            embed.setDescription(`😢${message.author.username}, you do not have enough items to sell \n you need:`)
                embed.addField(`item needed:`,`${parseInt(amountofi) - parseInt(iten.amount)} more`,true)
                 embed.setFooter(`${Date.now()}`)
                 message.channel.send({embeds:[embed]})
                return;
              }else {
            collection.updateOne({id:message.author.id},{$set:{
              mpd:parseInt(wallet.mpd) + parseInt(item.mpd) * parseInt(amountofi),shard:parseInt(wallet.shard) + parseInt(item.mpd) * parseInt(amountofi),crystal:parseInt(wallet.crystal) + parseInt(item.crystal ) * parseInt(amountofi),premium:parseInt(wallet.premium) + parseInt(item.premium) * parseInt(amountofi),seasons:parseInt(wallet.seasons) + parseInt(item.seasons) * parseInt(amountofi)}})

                
           
             

              
              if(parseInt(iten.amount) == parseInt(amountofi)) {
                //the item didn't exist
                collectionsa.updateOne({id:message.author.id},{$pull:{items:{"id":args[0].toString()}}},function(err,results) {
                  let embed = new Discord.MessageEmbed()
            .setTitle(`successfully sell ${amountofi} ${item.displayname}`);
            message.channel.send({embeds:[embed]});
            return;
                })
                
              } else {
                 collectionsa.updateOne({id:message.author.id},{$set:{items:[{"id":args[0].toString(),"amount":parseInt(iten.amount) - parseInt(amountofi)}]}},function(err,results) {
                   let embed = new Discord.MessageEmbed()
            .setTitle(`successfully sell ${amountofi} ${item.displayname}`);
            message.channel.send({embeds:[embed]});
            return;
                 })
              }
                }
            })
            
          })
}
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