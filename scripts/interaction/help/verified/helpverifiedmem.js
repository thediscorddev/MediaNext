const Discord = require(`discord.js`);
const fs = require('fs');

exports.run = async(client, interaction, clients, prefix) => {
  
  let data = []
 const row = new Discord.MessageActionRow();
 const b5 = 	new Discord.MessageButton()
					.setCustomId('verifiedback')
					.setLabel('back')
					.setStyle('PRIMARY');
          const b1 =	new Discord.MessageButton()
					.setCustomId('verifiednext')
					.setLabel('next')
					.setStyle('PRIMARY');
                  row.addComponents(b5);
                  row.addComponents(b1);

       await interaction.deferReply();


dget().then(async h => {
  fs.readFile('input5.json','utf8',async function(err,data) {
    embed = new Discord.MessageEmbed()
.setTitle(`MediaNext's command`)
.setDescription(`slots by: verified member command / protected command (working on back/next button)`)
.setColor(`#33ccff`)
.setTimestamp();
    JSON.parse(data).forEach(data => embed.addField(`${data.name}`,`${data.desc}`))   

    await interaction.followUp({embeds :[embed], components: [row]}); 

    
  })
})
  return;

}

async function dget(){
  let data = []
await fs.readdir(`./scripts/commands`, (async (err,fil) => {
fil.forEach(f => {
  let file = require(`./../../../commands/${f}`);
  file.slots().then(result => {
  if(result == 3) {
    file.name().then(name => {
      file.desc().then(desc => {
            data.push({"name":name,"desc":desc});
     fs.writeFile("input5.json",JSON.stringify(data), function(err,r) {})
      })
    })

  }
  })
  
})   
}));
}
process.on('uncaughtException', function (err) {
  console.error(err);
});
