const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
  
if(message.author.id == process.env['OWNERID']) {
 client.guilds.cache.get(args[0]).leave();
}else message.reply('you cannot use this command');
};
exports.slots = async() => {
// 1 = public
// 2 = developer only
// 3 = verifed member
// 4 = staff
// null = custom command(it doesn't have id);
  return 2;
}
exports.name = async() => {
  return "";
}
exports.desc = async() => {
  return "";
}