const Discord = require('discord.js');
const fs = require('fs');
const { REST } = require('@discordjs/rest'); 
const { Routes } = require('discord-api-types/v9');
exports.run = async(client, message, args,clients) => {
if(message.author.id == process.env['OWNERID']) {
 const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
  const clientId = '734411577020907622'; 
const guildId = '699994812517974057';

  await check().then(async (docs, reject) => {
  try { 	
    console.log('Started refreshing application (/) commands.'); 
    await rest.put( 			Routes.applicationGuildCommands(clientId, guildId), 	
                   { body: docs }, 	
                  ); 		console.log('Successfully reloaded application (/) commands.'); 
  } catch (error) { 	
    console.error(error); 	
  }
  })
}else return;
  async function check() {
  return new Promise(async (resolve, reject) => {
           let collection = clients.db("Leveling").collection("customcommand");
   collection.find().toArray(function(err, docs) {
    resolve(docs)
    return;
  });
  })
}
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
