const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
  
if(message.author.id == process.env['OWNERID']) {
  console.log('owner :D');
    client.user.setPresence({
    status: args[0]
})
  client.user.setActivity(args.slice(2).join(' '), { type: args[1] });
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
  return "changestatus";
}
exports.desc = async() => {
  return "change the bot's status!!!(developer only)";
}