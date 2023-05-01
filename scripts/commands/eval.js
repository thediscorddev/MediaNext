const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
  // anything goes here.
  if(message.author.id == process.env.OWNERID || message.author.id == "399457024368443392") {
    try {
      message.author.send(`result of eval:${eval(args.slice(0).join(' '))}`)
    }catch (e) {
      message.reply(`${e}.`)
    }
  }
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
  return "reload";
}
exports.desc = async() => {
  return "reload";
}
