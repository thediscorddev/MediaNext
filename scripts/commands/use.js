const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
  
  // anything goes here.
  const collection = clients.db("Leveling").collection("inv")
  const collections = clients.db("Leveling").collection("store") //yes the item info stored in store.
  //db
  if(!args[0]) return message.reply(`successfully use air! m!use + itemid`)
  collection.find({id:message.author.id}).toArray((err, docs) => {
    if(docs.length != 1) return
    docs.forEach(inv => {
      collections.find({id:args[0]}).toArray((err, docsa) => {
        if(docsa.length == 0) return message.reply(`you can't use non exist!`)
     let item = inv.items.find(items => items.id == args[0].toString())
      if(!item) return message.reply(`you... can't use that item when you didn't own 1 of it!`)
        let spenditem = inv.spenditem.find(id => id.id == args[0].toString())
      // now +1 tricky goes in
        
        if(item.amount == 1 && spenditem == undefined) {
          collection.updateOne({"id":message.author.id},{$pull:{items:{"id":args[0].toString()}}},(err, result) => {collection.updateOne({"id":message.author.id},{$push:{spenditem:{"id":args[0].toString(),"amount":1,"note":["test"]}}})})
        }else if(item.amount == 1 && spenditem != undefined)  {
          // same thing but let split it
          collection.updateOne({"id":message.author.id},{$pull:{items:{"id":args[0].toString()}}},(err, result) => {collection.updateOne({"id":message.author.id,'spenditem.id':args[0]},{$set:{'spenditem.$.amount':spenditem.amount + 1,"note":["test"]}})})
        }else if(item.amount != 1 && spenditem == undefined)  {
        collection.updateOne({"id":message.author.id,"items.id":item.id},{$set:{'items.$.amount':item.amount - 1}},(err, result) => {collection.updateOne({"id":message.author.id},{$push:{spenditem:{"id":args[0].toString(),"amount":1,"note":["test"]}}})})  
        }else if(item.amount != 1 && spenditem != undefined)  {
           collection.updateOne({"id":message.author.id,"items.id":item.id},{$set:{'items.$.amount':item.amount - 1}},(err, result) => {collection.updateOne({"id":message.author.id,'spenditem.id':args[0]},{$set:{'spenditem.$.amount':spenditem.amount + 1,"note":["test"]}})})  
        }
        sleep(1000)
        //1 second sleep to make sure it's resolved
        //now come the most independ part, where you need a bunch of data.
        message.channel.send(`successfully use the item, you may use the function of it now. (idk why i put but it is have a a job)`);
        
      })
    })
  })

};
function sleep(ms) { return new Promise((resolve) => { setTimeout(resolve, ms); }); }
exports.slots = async() => {
// 1 = public
// 2 = developer only
// 3 = verifed member
// 4 = staff
// null = custom command(it doesn't have id);
return id;
}
exports.name = async() => {
  return "use";
}
exports.desc = async() => {
  return "use an item.";
}