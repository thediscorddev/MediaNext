const Discord = require(`discord.js`);
const fs = require('fs');
const Database = require("@replit/database")
const db = new Database()

exports.run = async(client, interaction, clients, prefix) => {
  let rawdata = fs.readFileSync('latestmsg.txt');
let f = JSON.parse(rawdata);
const collection = clients.db("Leveling").collection('customcommand');
collection.find({}).count().then(async amount => {
            console.log(amount);
        var pages = [];
                  let tempnum = amount;
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
  fs.open('latestmsg.txt', 'r', function (err, k) {
   if (err) {
      return console.error(err);
   }
    db.get("__custom").then(value => {
  if(!value) db.set("__custom", 0).then(() => {});
    let numberic = 0
    if(parseInt(value) - 1 == -1) {
      return
    } else numberic = pages[value-1];
    console.log(numberic);
   console.log("File opened!!");    

    
  let embeds = new Discord.MessageEmbed()
                // verified embed



.setTitle(`MediaNext's command`)
.setDescription(`slots by: custom command / premium command, visit the follow page to view all the command: (pages: ${numberic.page} of ${pages[pages.length - 1].page}). It's recommend to reload the cmd's position by send m!send again if u using old help cmd.`)
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
    console.log(numberic.start);
    console.log(numberic.end);
      collection.find({}).skip(numberic.start).limit(numberic.end).toArray(async function(err, docs) {
        console.log(docs);
   docs.forEach(raw => embeds.addField('```' + raw.name + '```',raw.description,true));
await interaction.update({embeds :[embeds], components: [row2]});
                  })
  })  
  });
  })
}
process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});