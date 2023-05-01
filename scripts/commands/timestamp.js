const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
  var embed = new Discord.MessageEmbed() 
    .setTitle(`Result of time converter (second)`)
      .setThumbnail(`https://media.discordapp.net/attachments/718144080982442055/893464257952374874/New_Inspect_Tech_pfp.png`)
      .setColor("#42f5e9")
      .setFooter(`request by ${message.author.tag}`)
  var type = args[0]
  var time = args[1]
if(type == "add") {
  embed.addField(`Result of add:`,`${parseInt((Date.now() + time * 1000) / 1000)} \n discord's time: \`<t:${parseInt((Date.now() + time * 1000) / 1000)}>\` `)
  message.channel.send({embeds:[embed]})
}else if(type == "minus") {
  embed.addField(`Result of minus:`,`${parseInt((Date.now() - time * 1000) / 1000)} \n discord's time: \`<t:${parseInt((Date.now() - time * 1000) / 1000)}>\` `)
  message.channel.send({embeds:[embed]})
} else return message.reply(`invaild syntax: \`m!timestamp + (add or minus) + second\``)
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