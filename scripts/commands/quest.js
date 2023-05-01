const Discord = require('discord.js');
const quick = require('quick.db');
let ms = require('ms');
exports.run = async(client, message, args, clients) => {
  console.log(message.member.roles.cache.some(role => role.id === '700008737401864192'))
  console.log(message.member.roles.cache.some(role => role.id === '700008737401864192'))
  console.log(message.member.roles.cache.some(role => role.id === '734407660304334868'))
  if(message.member.roles.cache.some(role => role.id === '700008737401864192') || message.member.roles.cache.some(role => role.id === '700008737401864192') || message.member.roles.cache.some(role => role.id === '734407660304334868')) {
  let formerjson = {
    "missiontitle":`${message.author.tag} quests`,
"doingwork":Math.floor(Math.random() * 5),
    "doingearn":[{"id":"mpd","anount":Math.floor(Math.random() * 500)},{"id":"shard","anount":Math.floor(Math.random() * 750)},{"id":"crystal","anount":Math.floor(Math.random() * 50)}],
    "reward":[{"type":"mpd","amount":350 + Math.floor(Math.random() * 150)},{"type":"shard","amount":400 + Math.floor(Math.random() * 200)},{"type":"crystal","amount":50 + Math.floor(Math.random() * 110)}],
    "timeout":Date.now(),
    "done":"false"
      }
  let data = await quick.fetch(`_quest_${message.author.id}`)
  let embed = new Discord.MessageEmbed()
    
    .setThumbnail(`https://cdn.discordapp.com/avatars/${message.author.id}/${client.users.cache.find(u => u.id === message.author.id).avatar}.webp`);
  if(data !== null && 86400000 - (Date.now() - parseInt(data.timeout)) > 0 && data.done !== "false") {
    let remaintime = ms(86400000 - (Date.now() - parseInt(data.timeout)))
    embed.setTitle(`⚠️hold on`)
    embed.setDescription(`you have to wait more ${remaintime} before next quest!`)
    message.reply({embeds:[embed]})
  } else if(data == null) {
    //when user is new
    quick.set(`_quest_${message.author.id}`,formerjson);
    embed.setTitle(`${formerjson.missiontitle}`)
    embed.setDescription(`you have 1 day to do so!`)
    embed.addField(`work:`,`${formerjson.doingwork} more time`,true)
embed.addField(`earn more mpd:`,`${formerjson.doingearn.find(x => x.id == "mpd").anount}`)
    embed.addField(`earn more shard:`,`${formerjson.doingearn.find(x => x.id == "shard").anount}`)
embed.addField(`earn more crystal:`,`${formerjson.doingearn.find(x => x.id == "crystal").anount}`)
    
    message.reply({embeds:[embed]})
  }else {
    console.log(`e`)
    
    let remaintime = ms(86400000 - (Date.now() - parseInt(data.timeout)))
     embed.setTitle(`${data.missiontitle}`)
    embed.setDescription(`${remaintime} remain`)
    embed.addField(`work:`,`${data.doingwork} more time`,true)
embed.addField(`earn more mpd:`,`${data.doingearn.find(x => x.id = "mpd").anount}`)
    embed.addField(`earn more shard:`,`${data.doingearn.find(x => x.id = "shard").anount}`)
embed.addField(`earn more crystal:`,`${data.doingearn.find(x => x.id = "crystal").anount}`)

    message.reply({embeds:[embed]})
  }
  // anything goes here.
  }
};
exports.slots = async() => {
// 1 = public
// 2 = developer only
// 3 = verifed member
// 4 = staff
// null = custom command(it doesn't have id);
return id;
}
exports.name = async() => {
  return "name";
}
exports.desc = async() => {
  return "description";
}