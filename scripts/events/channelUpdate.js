let moment = require('moment');
let Discord = require('discord.js');
exports.run = async(client, clients, prefix,channel,newchannel) => {
    var log = channel.guild.channels.cache.get('795253328266919957')
    var sEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`:information_source: A channel was update!`)
                .setDescription(`**new Name**\n${channel.name} -> ${newchannel.name}`)
                .addField(`**Type**`,`${channel.type}`) 
      .addField(`**New topic**`,`${channel.topic || "no topic was setted"} -> ${newchannel.topic || "no topic was setted"}`)
                .setFooter(`ChannelID:${channel.id}`);
                log.send({embeds:[sEmbed]});
  
}