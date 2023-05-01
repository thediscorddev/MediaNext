const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
if(message.guild.id == 809722018953166858) return;
     
  
      
    if(message.author.id === process.env.OWNERID) {
     
    warn(client,message,args,clients);  
      
    } else if(message.member.permissions.has('MANAGE_GUILD')) {
      warn(client,message,args,clients)
}else return
};
async function warn(client, message, args, clients) {
  let member = message.mentions.members.first() ||  await message.guild.members.cache.get(args[0]);
  const collection = clients.db("Leveling").collection('warnings');
  if(!member) return message.reply(`\`m!actions + <user ping / id>\``)
  let embed = new Discord.MessageEmbed()
  .setTitle(`latest MediaNext's moderation actions`)
  .setColor(`#0073ff`)
  .setThumbnail(`https://media.discordapp.net/attachments/718144080982442055/885845551759896587/Techy_NVO-18_Countdown_3_pfp.png?width=629&height=629`)
  .setFooter(`request by ${message.author.tag}`)
message.channel.send(`getting data`).then(async msg => {
   await fetchs(collection,member).then(docs => {
     if(docs.length == 0) {
        embed.addField(`404 error`,`The Request you are looking for is not found`)
       msg.edit({embeds:[embed]})
     } else {
     docs.forEach(async users => {
       if( users.warn.length == 0 && users.ban.length == 0 && users.kick.length == 0 && users.mute.length == 0) {
        embed.addField(`404 error`,`The Request you are looking for is not found`)
       msg.edit({embeds:[embed]})
     }
       await client.users.fetch(users.id).then(uid => {
         if(users.warn.length != 0 || users.ban.length != 0 || users.kick.length != 0 || users.mute.length != 0) {
         embed.addField(`user: ${uid.tag}`,`\`total warns:\`${users.warn.length} \n \`total kicks:\`${users.kick.length} \n \`total bans:\`${users.ban.length} \n \`mutes:\`${users.mute.length}`)
          if(users.warn.length != 0) embed.addField(`latest warn:`,`id: ${users.warn[users.warn.length-1].id} \n at <t:${users.warn[users.warn.length-1].time}>, by moderator with id of ${users.warn[users.warn.length-1].by},\n because ${users.warn[users.warn.length-1].reason}`)
            if(users.kick.length != 0) embed.addField(`latest kick:`,`id: ${users.kick[users.kick.length-1].id} \n at <t:${users.kick[users.kick.length-1].time}>, by moderator with id of ${users.kick[users.kick.length-1].by}\n because ${users.kick[users.kick.length-1].reason}`)
             if(users.ban.length != 0) embed.addField(`latest ban:`,`id: ${users.ban[users.ban.length-1].id} \n at <t:${users.ban[users.ban.length-1].time}>, by moderator with id of ${users.ban[users.ban.length-1].by} \n because ${users.ban[users.ban.length-1].reason}`)
             if(users.mute.length != 0) embed.addField(`latest mute:`,`id: ${users.mute[users.mute.length-1].id} \n at <t:${users.mute[users.mute.length-1].time}>, by moderator with id of ${users.mute[users.mute.length-1].by} \n because ${users.mute[users.mute.length-1].reason}`)
         }
       })
       msg.edit({embeds:[embed]})
     })
     }
   })
})
   
  
  return;
     
}
async function fetchs(collection,user) {  
  return new Promise((resolve,reject) => {
     collection.find({id:user.user.id}).sort({datefield: -1}).skip(0).limit(25).toArray(function(err, docs) {
    resolve(docs)
  })
  })
}
exports.slots = async() => {
// 1 = public
// 2 = developer only
// 3 = verifed member
// 4 = staff
// null = custom command(it doesn't have id);
return 4;
}
exports.name = async() => {
  return "add-command";
}
exports.desc = async() => {
  return "add custom to the mediaNext's database";
}