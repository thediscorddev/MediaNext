const Discord = require('discord.js');
exports.run = async(client, message, args, clients) => {
  return
  const settings = clients.db('Leveling').collection('leveling')
  // define database
  settings.find({})
  // anything goes here.
};
exports.slots = async() => {
// 1 = public
// 2 = developer only
// 3 = verifed member
// 4 = staff
// null = custom command(it doesn't have id);
return 4;
}
exports.name = async() => {
  return "levelmodify";
}
exports.desc = async() => {
  return "for staff";
}