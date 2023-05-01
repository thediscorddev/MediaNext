const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
    let eachline = message.content.split('\n');
          let embed = new Discord.MessageEmbed()
.setTitle(`${message.author.username}'s poll`)
.setDescription(args.join(' '))
.setTimestamp();
  try {
let poll = client.channels.cache.get('808658148482220044').send({embeds:[embed]}); //Discord.js v12, 808658148482220044 is a channel id, use client.channels.get in Discord.js v11
    for(const line of eachline) {
      if(line.includes('-')) {
const split = line.split('-');
const emojis = split[0].trim();
(await poll).react(emojis);
      }
    }
  }catch(e) {
    message.reply(`${e} error happen :(`)
  }
    return;
  
  // anything goes here.
};
exports.slots = async() => {
// 1 = public
// 2 = developer only
// 3 = verifed member
// 4 = staff
// null = custom command(it doesn't have id);
return 1;
}
exports.name = async() => {
  return "name";
}
exports.desc = async() => {
  return "description";
}