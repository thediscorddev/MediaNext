const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {

  const collection = clients.db("Leveling").collection('store');
  const row = new Discord.MessageActionRow();
  const b1 =	new Discord.MessageButton()
					.setCustomId('shopback')
					.setLabel('next')
					.setStyle('PRIMARY');
			
       const b2 = new Discord.MessageButton()
					.setCustomId('shopnext')
					.setLabel('back')
					.setStyle('PRIMARY');
     
              	row.addComponents(b2);
                	row.addComponents(b1);

  await collection.find({}).toArray(function(err, docs)  {

    let embed = new Discord.MessageEmbed()
    .setTitle(`**MediaPlay Discord Store**`)
    .setDescription(`Here's all the Items you can buy, sell, use and manage in the server.
\`Normal Items\` (the button doesn't work at the moment, limit 12 item will be showed for now)`)
    
    if(docs.length == 0) embed.addField(`ouch snap`,`we don't sell anything at this moment, but we will soon!`, true)
    docs.forEach(items => embed.addField(`> ${items.firstintro} - \`${items.displayname}\`\n Cost: ${items.mpd} $MPD, ${items.shard} shards, ${items.crystal} crystals, ${items.premium} premium coins, ${items.seasons} seasonal items `, ` \n > ${items.description}  \n > item id: \`${items.id}\``))
    
    message.channel.send({embeds:[embed],components:[row]})
  })
};
exports.slots = function() {
// 1 = public
// 2 = developer only
// 3 = verifed member
// 4 = staff
// null = custom command(it doesn't have id);
return 1;
}
exports.name = async() => {
  return "store";
}
exports.desc = async() => {
  return "what do we offer today? Who knows?";
}