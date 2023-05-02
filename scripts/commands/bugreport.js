const Discord = require('discord.js');
exports.run = async (client, message, args, clients) => {
  if(!args[0]) return message.reply('m!bugreport + bug');
  		let content = args[0]; 
  let embed = new Discord.MessageEmbed()
  .setTitle(`Bug report.`)
  .setDescription(`By ${message.author.id} \n > ${content}`)
  .setColor('#468bfa')
  .setThumbnail(message. user.displayAvatarURL());
  message.reply('Your suggestion had been send');
client.channels.cache.get('1102940758182481930').send('New Bug report/Suggestion:',{ embeds: [embed] })
}
exports.slots = async() => {
// 1 = public
// 2 = developer only
// 3 = verifed member
// 4 = staff
// null = custom command(it doesn't have id);
return 3;
}
exports.name = async() => {
  return "bugreport";
}
exports.desc = async() => {
  return "Report a bug.";
}
