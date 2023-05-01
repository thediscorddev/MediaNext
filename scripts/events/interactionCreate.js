const Discord = require(`discord.js`);
const fs = require('fs');

exports.run = async(client, clients, prefix,interaction) => {
  if(!interaction.guild) return; // Returns as there is no guild
  
  if(interaction.isCommand()) {
    await interaction.deferReply()
           let collection = clients.db("Leveling").collection("customcommand");
   collection.find({"name":interaction.commandName}).toArray(function(err, docs) {
    if(docs.length == 1) {
      docs.forEach(async commando => {
        await interaction.editReply(commando.reply
        .replace('<member.tag>',`${interaction.user.tag}`)
.replace('<member.id>',`${interaction.user.id}`)
.replace('<member>',`${interaction.user}`))
return;
      })
      return;
    }
    return;
  });
  }
if (!interaction.isButton()) return;
  fs.readdir(`./scripts/interaction/help/customcmd`, (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    console.log(file);
    let eventFunction = require(`./../interaction/help/customcmd/${file}`);
    let eventName = file.split(".")[0];
    if(interaction.customId === eventName){ return eventFunction.run(client,interaction,clients,prefix);
                                          }else {
       fs.readdir(`./scripts/interaction/help/staff`, (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    console.log(interaction.customId);
    let eventFunction = require(`./../interaction/help/staff/${file}`);
    let eventName = file.split(".")[0];
    if(interaction.customId === eventName){ return eventFunction.run(client,interaction,clients,prefix);
                                          }else {
      fs.readdir(`./scripts/interaction/help/verified`, (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    console.log(interaction.customId);
    let eventFunction = require(`./../interaction/help/verified/${file}`);
    let eventName = file.split(".")[0];
    if(interaction.customId === eventName){ return eventFunction.run(client,interaction,clients,prefix);
                                          }else {
      fs.readdir(`./scripts/interaction/help/developer`, (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    console.log(interaction.customId);
    let eventFunction = require(`./../interaction/help/developer/${file}`);
    let eventName = file.split(".")[0];
    if(interaction.customId === eventName){ return eventFunction.run(client,interaction,clients,prefix);
                                          } else {
      fs.readdir(`./scripts/interaction/help/public`, (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    console.log(interaction.customId);
    let eventFunction = require(`./../interaction/help/public/${file}`);
    let eventName = file.split(".")[0];
    if(interaction.customId === eventName){ return eventFunction.run(client,interaction,clients,prefix);
                                          } else {
      fs.readdir(`./scripts/interaction/shop/`, (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    console.log(interaction.customId);
    let eventFunction = require(`./../interaction/shop/${file}`);
    let eventName = file.split(".")[0];
    if(interaction.customId === eventName){ return eventFunction.run(client,interaction,clients,prefix);
                                          } else {
      // the last affort for the unlimted chain
      return;
                                          }
});
  })
                                          }
});
  })
                                          }
});
  })
                                          }
});
  })
                                          }
});
  })
                                          }
});
  })

}
