const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
  
  const collection = clients.db("Leveling").collection('balance');
  const collections = clients.db("Leveling").collection('store');
  const collectionsa = clients.db("Leveling").collection('inv');
  if(!args[0]) return message.reply(`there is so many air in the world! m!buy + item id`)
collection.find({id:message.author.id}).toArray(function (err,docs) {
  collections.find({id:args[0].toString()}).toArray(function(err,doc) {
    if(docs.length != 1 && doc.length != 1) return
    doc.forEach(item => {
      docs.forEach(wallet => {
        if(item.currency == "$mpd") {
         if (wallet.mpd < item.cost) return message.reply(`aww man, you don't have enough $mpd for that item, you need more ${item.cost - wallet.mpd} $mpd to buy!`)
        else {
          collection.updateOne({id:message.author.id},{$set:{mpd:parseInt(wallet.mpd) - parseInt(item.cost)}})
          collectionsa.find({id:message.author.id}).toArray(function(err, inv ) {
            if(inv.length == 0) {
              collectionsa.insertMany([{"id":message.author.id,"items":[{"id":args[0].toString(),"amount":1}],"spenditem":[]}], function(err, result) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`successfully buy ${item.displayname}`);
            message.channel.send({embeds:[embed]});
  });
            }
            inv.forEach(invs => {
              let counter = 0
              if(invs.items.length == 0) collectionsa.updateOne({id:message.author.id},{$push:{items:{"id":args[0].toString(),"amount":1}}},function(err,results) {})
          invs.items.forEach(eachitem => {
            console.log(eachitem.id != args[0].toString() && counter < invs.items.length)
            console.log(eachitem.id !=args[0].toString() && counter == invs.items.length)
            if(!eachitem.id != args[0].toString() && counter < invs.items.length) counter+=1;
            if(!eachitem.id !=args[0].toString() && counter == invs.items.length) {
              //the item didn't exist and so on, need to be added
              collectionsa.updateOne({id:message.author.id},{$push:{items:{"id":args[0].toString(),"amount":1}}},function(err,results) {})
            }                                                                         
            if(eachitem.id == args[0].toString()){
              collectionsa.updateOne({id:message.author.id},{$set:{items:[{"id":args[0].toString(),"amount":eachitem.amount + 1}]}},function(err,results) {})
            }
            
          })
            })
            let embed = new Discord.MessageEmbed()
            .setTitle(`successfully buy ${item.displayname}`);
            message.channel.send({embeds:[embed]});
            return;
          })
          
        }
      }
         if(item.currency == "shards") {
         if (wallet.shard < item.cost) return message.reply(`aww man, you don't have enough Shards for that item, you need more ${item.cost - wallet.shard} shards to buy!`)
        else {
          collection.updateOne({id:message.author.id},{$set:{shard:parseInt(wallet.shard) - parseInt(item.cost)}})
          collectionsa.find({id:message.author.id}).toArray(function(err, inv ) {
            if(inv.length != 1) return
            inv.forEach(invs => {
              let counter = 0
              if(invs.items.length == 0) collectionsa.updateOne({id:message.author.id},{$push:{items:{"id":args[0].toString(),"amount":1}}},function(err,results) {})
          invs.items.forEach(eachitem => {
            console.log(eachitem.id != args[0].toString() && counter < invs.items.length)
            console.log(eachitem.id !=args[0].toString() && counter == invs.items.length)
            if(!eachitem.id != args[0].toString() && counter < invs.items.length) counter+=1;
            if(!eachitem.id !=args[0].toString() && counter == invs.items.length) {
              //the item didn't exist and so on, need to be added
              collectionsa.updateOne({id:message.author.id},{$push:{items:{"id":args[0].toString(),"amount":1}}},function(err,results) {})
            }
            if(eachitem.id == args[0].toString()){
              collectionsa.updateOne({id:message.author.id},{$set:{items:[{"id":args[0].toString(),"amount":eachitem.amount + 1}]}},function(err,results) {})
            }
            
          })
            })
            let embed = new Discord.MessageEmbed()
            .setTitle(`successfully buy ${item.displayname}`);
            message.channel.send({embeds:[embed]});
            return;
          })
          
        }
        }
          //jj
           if(item.currency == "crystal") {
         if (wallet.crystal < item.cost) return message.reply(`aww man, you don't have enough crystal for that item, you need more ${item.cost - wallet.crystal} crystal to buy!`)
        else {
          collection.updateOne({id:message.author.id},{$set:{crystal:parseInt(wallet.crystal) - parseInt(item.cost)}})
          collectionsa.find({id:message.author.id}).toArray(function(err, inv ) {
            if(inv.length != 1) return
            inv.forEach(invs => {
              let counter = 0
              if(invs.items.length == 0) collectionsa.updateOne({id:message.author.id},{$push:{items:{"id":args[0].toString(),"amount":1}}},function(err,results) {})
          invs.items.forEach(eachitem => {
            console.log(eachitem.id != args[0].toString() && counter < invs.items.length)
            console.log(eachitem.id !=args[0].toString() && counter == invs.items.length)
            if(!eachitem.id != args[0].toString() && counter < invs.items.length) counter+=1;
            if(!eachitem.id !=args[0].toString() && counter == invs.items.length) {
              //the item didn't exist and so on, need to be added
              collectionsa.updateOne({id:message.author.id},{$push:{items:{"id":args[0].toString(),"amount":1}}},function(err,results) {})
            }
            if(eachitem.id == args[0].toString()){
              collectionsa.updateOne({id:message.author.id},{$set:{items:[{"id":args[0].toString(),"amount":eachitem.amount + 1}]}},function(err,results) {})
            }
            
          })
            })
            let embed = new Discord.MessageEmbed()
            .setTitle(`successfully buy ${item.displayname}`);
            message.channel.send({embeds:[embed]});
            return;
          })
          
        }
           }
             //jj
             if(item.currency == "$premium") {
         if (wallet.premium < item.cost) return message.reply(`aww man, you don't have enough $premium for that item, you need more ${item.cost - wallet.premium} $mpd to buy!`)
        else {
          collection.updateOne({id:message.author.id},{$set:{premium:parseInt(wallet.premium) - parseInt(item.cost)}})
          collectionsa.find({id:message.author.id}).toArray(function(err, inv ) {
            if(inv.length != 1) return
            inv.forEach(invs => {
              let counter = 0
              if(invs.items.length == 0) collectionsa.updateOne({id:message.author.id},{$push:{items:{"id":args[0].toString(),"amount":1}}},function(err,results) {})
          invs.items.forEach(eachitem => {
            console.log(eachitem.id != args[0].toString() && counter < invs.items.length)
            console.log(eachitem.id !=args[0].toString() && counter == invs.items.length)
            if(!eachitem.id != args[0].toString() && counter < invs.items.length) counter+=1;
            if(!eachitem.id !=args[0].toString() && counter == invs.items.length) {
              //the item didn't exist and so on, need to be added
              collectionsa.updateOne({id:message.author.id},{$push:{items:{"id":args[0].toString(),"amount":1}}},function(err,results) {})
            }
            if(eachitem.id == args[0].toString()){
              collectionsa.updateOne({id:message.author.id},{$set:{items:[{"id":args[0].toString(),"amount":eachitem.amount + 1}]}},function(err,results) {})
            }
            
          })
            })
            let embed = new Discord.MessageEmbed()
            .setTitle(`successfully buy ${item.displayname}`);
            message.channel.send({embeds:[embed]});
            return;
          })
          
        }
              }
                //jj
             if(item.currency == "seasonal-item") {
         if (wallet.seasons < item.cost) return message.reply(`aww man, you don't have enough seasonal items for that item, you need more ${item.cost - wallet.seasons} seasonal items to buy!`)
        else {
          collection.updateOne({id:message.author.id},{$set:{seasons:parseInt(wallet.seasons) - parseInt(item.cost)}})
          collectionsa.find({id:message.author.id}).toArray(function(err, inv ) {
            if(inv.length != 1) return
            inv.forEach(invs => {
              let counter = 0
              if(invs.items.length == 0) collectionsa.updateOne({id:message.author.id},{$push:{items:{"id":args[0].toString(),"amount":1}}},function(err,results) {})
          invs.items.forEach(eachitem => {
            console.log(eachitem.id != args[0].toString() && counter < invs.items.length)
            console.log(eachitem.id !=args[0].toString() && counter == invs.items.length)
            if(!eachitem.id != args[0].toString() && counter < invs.items.length) counter+=1;
            if(!eachitem.id !=args[0].toString() && counter == invs.items.length) {
              //the item didn't exist and so on, need to be added
              collectionsa.updateOne({id:message.author.id},{$push:{items:{"id":args[0].toString(),"amount":1}}},function(err,results) {})
            }
            if(eachitem.id == args[0].toString()){
              collectionsa.updateOne({id:message.author.id},{$set:{items:[{"id":args[0].toString(),"amount":eachitem.amount + 1}]}},function(err,results) {})
            }
            
          })
            })
            let embed = new Discord.MessageEmbed()
            .setTitle(`successfully buy ${item.displayname}`);
            message.channel.send({embeds:[embed]});
            return;
          })
          
}
                } else return console.log(item.currency)
              
            
          
            
      })
    })
  })
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
  return "buy";
}
exports.desc = async() => {
  return "buy!";
}