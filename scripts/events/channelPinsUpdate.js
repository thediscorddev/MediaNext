let moment = require('moment');
let Discord = require('discord.js');
exports.run = async(client, clients, prefix,channel) => {
    var log = channel.guild.channels.cache.get('795253328266919957')
    var sEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`:information_source: A channel pin was update!  | pinned at:<t:${channel.lastPinTimestamp / 1000}:R>`)
                .setDescription(`**Name**\n${channel}`)
                .addField(`**Type**`,`${channel.type}`) 
                .setFooter(`ChannelID:${channel.id}`);
                log.send({embeds:[sEmbed]});
  
}