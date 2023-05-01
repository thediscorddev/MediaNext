const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
  let emojiname = args[0];
  try {
    let emoji = await client.emojis.cache.find(emoji => emoji.name === emojiname);
    console.log(emoji)
    let embed = new Discord.MessageEmbed()
    .setTitle(`emoji info`)
    .setDescription(`requested by ${message.author.tag}`)
    .setThumbnail(`https://cdn.discordapp.com/emojis/${emoji.id}`)
    .addField(`id:`,`${emoji.id}`)
    .addField(`url:`,`https://cdn.discordapp.com/emojis/${emoji.id}`)
    message.channel.send({embeds:[embed]})
  }catch(e) {
    message.reply(`no emoji founded`);
    console.log(e)
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