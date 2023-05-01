const Discord = require('discord.js');
const fs = require('fs');
exports.run = async(client, message, args, clients) => {
if(message.author.id == process.env['OWNERID']) {
  console.log("reachable");
const collection = clients.db("Leveling").collection('documents');
collection.find({"id":"helpcmdworker"}).count().then(async data => {
  await fs.readdir(`./scripts/commands`, (async (err,fil) => {
fil.forEach(f => {
  let file = require(`./${f}`);
  file.slots().then(result => {
    file.name().then(name => {
      file.desc().then(desc => {
  if(result == 2) {
    collection.find({"id":"helpcmdworker","var2":[{"name": file.name()}]}).count().then(async i => {
      if(i ==0) {
        collection.updateOne({id:"helpcmdworker"},{$push:{"var2":{"name":name,"desc":desc}}})
      }else console.log("cmd already exsit");
    
  

    })

  }
  if(result == 1) {
    collection.find({"id":"helpcmdworker","var1":[{"name": file.name()}]}).count().then(async i => {
      if(i ==0) {
        collection.updateOne({id:"helpcmdworker"},{$push:{"var1":{"name":name,"desc":desc}}})
      }else console.log("cmd already exsit");
    
  

    })

  }
      if(result == 4) {
    collection.find({"id":"helpcmdworker","var4":{"name": file.name()}}).count().then(async i => {
      if(i ==0) {
        collection.updateOne({id:"helpcmdworker"},{$push:{"var4":{"name":name,"desc":desc}}})
      }else console.log("cmd already exsit");
    
  

    })

  }
      if(result == 3) {
    collection.find({"id":"helpcmdworker","var3":[{"name": file.name()}]}).count().then(async i => {
      if(i ==0) {
        collection.updateOne({id:"helpcmdworker"},{$push:{"var3":{"name":name,"desc":desc}}})
      }else console.log("cmd already exsit");
    
  

    })

  }
    })
  })
    //k
  })
  
})   
}));
})
}else message.reply('you cannot use this command');
};
exports.slots = async() => {
// 1 = public
// 2 = developer only
// 3 = verifed member
// 4 = staff
// null = custom command(it doesn't have id);
  return 2;
}
exports.name = async() => {
  return "reinithelp";
}
exports.desc = async() => {
  return "reload the help command!(developer only)";
}
