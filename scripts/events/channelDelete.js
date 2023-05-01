let moment = require('moment');
let Discord = require('discord.js');
exports.run = async(client, clients, prefix,channel) => {
    var log = channel.guild.channels.cache.get('795253328266919957')
    var sEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`:information_source: A channel Was Deleted!`)
                .setDescription(`**Name**\n${channel.name}`)
                .addField(`**Type**`,`${channel.type}`) 
                .setFooter(`ChannelID:${channel.id}`);
                log.send({embeds:[sEmbed]});
  
}