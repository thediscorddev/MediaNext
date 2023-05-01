let moment = require('moment');
let Discord = require('discord.js');
exports.run = async(client, clients, prefix,member) => {
  if(member.guild.id == "699994812517974057") {
    let embed = new Discord.MessageEmbed()
    .setTitle(`Welcome`)
    .setColor(`GREEN`)
    .setDescription(`${member.user.tag} to MPD!!! 😀`)
    .addField(`is user a bot?`,member.user.bot.toString(),true)
    .setThumbnail(member.user.displayAvatarURL())
    .addField(`user account's age`,`<t:${parseInt(parseInt(member.user.createdTimestamp) / 1000)}:R>`)
     let embeds = new Discord.MessageEmbed()
    .setTitle(`New Member Joined`)
    .setColor(`GREEN`)
    .setDescription(`${member.user.tag} has joined MPD.`)
    .addField(`is user a bot?`,member.user.bot.toString(),true)
    .setThumbnail(member.user.displayAvatarURL())
    .addField(`user account's age`,`<t:${parseInt(parseInt(member.user.createdTimestamp) / 1000)}:R>`)
     member.guild.channels.cache.get('699994813172416555').send({embeds:[embed]});
    member.guild.channels.cache.get('795253328266919957').send({embeds:[embeds]});
  }
}