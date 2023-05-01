const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
  
  try {
    
   const collection = clients.db("Leveling").collection('balance');
  let d = 0;
  let lengths = 0;
    
  message.channel.send(`getting data`).then(async (messag) => {
  let user = null;
    find(collection).then(docs => {
  console.log(docs)
    if(docs.length != 0) {
      
      console.log("reachable")
      var embed = new Discord.MessageEmbed() 
    .setTitle(`MPD Bank Leaderboard`)
      .setThumbnail(`https://media.discordapp.net/attachments/718144080982442055/893464257952374874/New_Inspect_Tech_pfp.png`)
      .setColor("#42f5e9")
      .setFooter(`request by ${message.author.tag}`)
    
      
      docs.forEach(async i => {
       d += 1
      await client.users.fetch(i.id).then(ppl => 
      {  
        if(i.id == message.author.id) embed.setDescription(`you goten to the top! you are at top ${parseInt(docs.indexOf(i)) + 1}`)
         embed.addField(`${parseInt(docs.indexOf(i)) + 1}.  ${ ppl.username}`,`${i.mpd} $mpd, ${i.shard} Shards, ${i.crystal} crystals, ${i.premium} premium coin & ${i.seasons} Seasonal items`,false)
        
      })
      
       messag.edit({ embeds: [embed] })           
      })
      
    
    }

  
    //if (d == lengths) send(embed,messag)
  })
  })
}catch(e) {
    message.reply(e)
}
  
  
};
async function find(collection) {
  return new Promise((resolve,reject) => { 
    collection.find({"mpd":{$gt:0},"shard":{$gt:-1},"crystal":{$gt:-1}}).skip(0).limit(25).sort({"mpd":-1,"shard":-1,"crystal":-1,"premium":-1}).toArray(async  (err, docs) => {
    resolve(docs)
     
   })
  })

}

function send(embed,msg) {
      msg.edit("here is the leaderboard:", { embeds: [embed] })
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
  return "balance";
}
exports.desc = async() => {
  return "view ur wallet (outdated)";
}