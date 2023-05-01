const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
  // anything goes here.
  let totalSeconds = (client.uptime / 1000);
  let days = Math.floor(totalSeconds / 86400); 
  totalSeconds %= 86400; 
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds % 60);
  message.channel.send(`bot have running for ${days} days,${hours} hours, ${minutes} minutes & ${seconds} seconds`)
};
exports.slots = async() => {
// 1 = public
// 2 = developer only
// 3 = verifed member
// 4 = staff
// null = custom command(it doesn't have id);
return 1;
}
exports.name = async() => {
  return "name";
}
exports.desc = async() => {
  return "description";
}