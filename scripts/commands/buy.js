const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
  
  const collection = clients.db("Leveling").collection('balance');
  const collections = clients.db("Leveling").collection('store');
  const collectionsa = clients.db("Leveling").collection('inv');
  if(!args[0]) return message.reply(`there is so many air in the world! m!buy + item id`)
collection.find({id:message.author.id}).toArray(function (err,docs) {
  collections.find({id:args[0].toString()}).toArray(function(err,doc) {
    if(docs.length != 1 && doc.length != 1) return
    doc.forEach(items => {
      docs.forEach(wallet => {

       
             let embed = new Discord.MessageEmbed()
            embed.setTitle(`ouch`)
            embed.setColor(`BLUE`)
            embed.setDescription(`😢${message.author.username}, you do not have enough cash to buy that item \n you need:`)
            
               if (wallet.mpd < items.mpd || wallet.shard < items.shard || wallet.crystal < items.crystal || wallet.premium < items.premium || wallet.seasons < items.seasons) {
                embed.addField(`$mpd:`,`${items.mpd - wallet.mpd}`,true)
                embed.addField(`Shards:`,`${items.shard - wallet.shard}`,true)
                embed.addField(`Crystal:`,`${items.crystal - wallet.crystal}`,true)
                embed.addField(`$Premium coin:`,`${items.premium - wallet.premium}`,true)
                embed.addField(`Seasonal items:`,`${items.seasons - wallet.seasons}`,true)
                 embed.setFooter(`${Date.now()}`)
                 message.channel.send({embeds:[embed]})
               }else {
                 purchase(client,message,args,collection,collectionsa,items,wallet);
               }
            
          
        

      
              
            
          
            
      })
    })
  })
})
};
function purchase(client,message,args,collection,collectionsa,item,wallet) {
            collection.updateOne({id:message.author.id},{$set:{
              mpd:parseInt(wallet.mpd) -parseInt(item.mpd),shard:parseInt(wallet.shard) - parseInt(item.mpd),crystal:parseInt(wallet.crystal) - parseInt(item.crystal),premium:parseInt(wallet.premium) - parseInt(item.premium),seasons:parseInt(wallet.seasons) - parseInt(item.seasons)}})
          collectionsa.find({id:message.author.id}).toArray(function(err, inv ) {
            if(inv.length == 0) {
              collectionsa.insertMany([{"id":message.author.id,"items":[{"id":args[0].toString(),"amount":1}],"spenditem":[]}], function(err, result) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`successfully buy ${item.displayname}`);
            message.channel.send({embeds:[embed]});
  });
            }
            inv.forEach(invs => {
let iten = invs.items.find(iteminfo => iteminfo.id === args[0].toString());
              if(iten == "undefined" || !iten) {
                //the item didn't exist
                collectionsa.updateOne({id:message.author.id},{$push:{items:{"id":args[0].toString(),"amount":1}}},function(err,results) {})
              } else {
                 collectionsa.updateOne({id:message.author.id},{$set:{items:[{"id":args[0].toString(),"amount":iten.amount + 1}]}},function(err,results) {})
              }
            })
            let embed = new Discord.MessageEmbed()
            .setTitle(`successfully buy ${item.displayname}`);
            message.channel.send({embeds:[embed]});
            return;
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