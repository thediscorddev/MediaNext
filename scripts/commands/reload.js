const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
  // anything goes here.
  if(message.author.id == process.env.OWNERID) {
    try {
      delete require.cache[require.resolve(`./${args[0]}`)];
      message.reply(`done`)
    }catch (e) {
      message.reply(`no command with that name, please note you **DON'T** need to reload custom command.`)
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
