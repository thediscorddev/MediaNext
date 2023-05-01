const Discord = require('discord.js');
const path = require('path');
const fs = require('fs');
exports.run = async(client, message, args, clients) => {
  return message.reply(`sorry ${message.author}, no help for now :(`)

    
  
  const row = new Discord.MessageActionRow();
  const b1 =	new Discord.MessageButton()
					.setCustomId('helppub')
					.setLabel('public')
					.setStyle('PRIMARY');
			
       const b2 = new Discord.MessageButton()
					.setCustomId('helpowner')
					.setLabel('Owner only')
					.setStyle('PRIMARY');
      const b3 =	new Discord.MessageButton()
					.setCustomId('helpstaff')
					.setLabel('staff')
					.setStyle('PRIMARY');
			
       const b4 = 	new Discord.MessageButton()
					.setCustomId('helpverifiedmem')
					.setLabel('verified member')
					.setStyle('PRIMARY');
           const b5 = 	new Discord.MessageButton()
					.setCustomId('helpcuscmd')
					.setLabel('custom command')
					.setStyle('PRIMARY');
		row.addComponents(b1);
    		row.addComponents(b2);
            	row.addComponents(b3);
              	row.addComponents(b4);
                	row.addComponents(b5);
let embed = new Discord.MessageEmbed()
.setTitle(`MediaNext's command`)
.addField(`please`, `click one of the button below: (it's may take few seconds - min to load, so please wait)`, true);
let msg2 = await message.channel.send({embeds :[embed], components: [row]});
  fs.writeFile("latestmsg.txt", `{"customint":0,"staffint":0,"pubint":0,"verfiedint":0,"devint":0}`, function(err) {
    if (err) throw err;
    console.log('complete3');
    });
return;
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
  return "help";
}
exports.desc = async() => {
  return "show this message";
}