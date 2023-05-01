const Discord = require(`discord.js`);
const fs = require('fs');

exports.run = async(client, interaction, clients, prefix) => {
  const collection = clients.db("Leveling").collection('documents');
 const row = new Discord.MessageActionRow();
 const b5 = 	new Discord.MessageButton()
					.setCustomId('devback')
					.setLabel('back')
					.setStyle('PRIMARY');
          const b1 =	new Discord.MessageButton()
					.setCustomId('devnext')
					.setLabel('next')
					.setStyle('PRIMARY');
                  row.addComponents(b5);
                  row.addComponents(b1);

collection.find({"id": "helpcmdworker"}).toArray().then(async i => {
  i.forEach(amount => {
        var pages = [];
                  let tempnum = amount.var3.length;
  console.log(tempnum)
                  let pagesd = 0
                  let minstart = 0
                  while(tempnum > 25){
                    pagesd +=1;
                    var newpages = {"page":pagesd,"start":minstart,"end":minstart+25}
                    minstart += 25;
                    pages.push(newpages);
                    tempnum -= 25;
                    if(tempnum < 25) {
                    var newpages ={"page":pagesd+1,"start":minstart,"end":amount}
                    pages.push(newpages);
                    }
                  }
                console.log(pages);
    fs.open('latestmsg.txt', 'r', function (err, f) {
   if (err) {
      return console.error(err);
   }
   console.log("File opened!!");   
      console.log(f.devint)
    let numberic = pages[f.devint];
      console.log(numberic)
  let embed = new Discord.MessageEmbed()
                // verified embed



.setTitle(`MediaNext's command`)
.setDescription(`slots by: custom command / premium command, visit the follow page to view all the command: (pages: ${numberic.page} of ${pages[pages.length - 1].page}). if u are using old help cmd. Please reload it.`)
.setColor(`#33ccff`)
.setTimestamp();
        const row2 = new Discord.MessageActionRow();
 const a1 = 	new Discord.MessageButton()
					.setCustomId('helpcuscmdback')
					.setLabel('back')
					.setStyle('PRIMARY');
 const a2 = 	new Discord.MessageButton()
					.setCustomId('helpcuscmdnext')
					.setLabel('next page')
					.setStyle('PRIMARY');
           const a3 = 	new Discord.MessageButton()
					.setCustomId('helpcuscmdexit')
					.setLabel('exit custom command')
					.setStyle('PRIMARY');
                row2.addComponents(a1);
                row2.addComponents(a2);
                row2.addComponents(a3);
      collection.find({},{$slice:[numberic.start,numberic.end]}).toArray(async function(err, docs) {
                
   docs.forEach(raw => embed.addField('```' + raw.name + '```',raw.description,true));
await interaction.update({embeds :[embed], components: [row2]});
                  })
    })
  })
  })

}
process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});