let moment = require('moment');
let Discord = require('discord.js');
exports.run = async(client, clients, prefix,member) => {
  if(member.guild.id == "699994812517974057") {
    let embed = new Discord.MessageEmbed()
    .setTitle(`Sadly`)
    .setColor(`RED`)
    .setDescription(`${member.user.tag} has left MPD 😭`)
    .setThumbnail(member.user.displayAvatarURL())
     let embeds = new Discord.MessageEmbed()
    .setTitle(`Member lefted`)
    .setColor(`RED`)
    .setDescription(`${member.user.tag} has left MPD.`)
    .setThumbnail(member.user.displayAvatarURL())
    member.guild.channels.cache.get('795253328266919957').send({embeds:[embeds]});
  }
}
