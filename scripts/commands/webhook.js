const Discord = require('discord.js');
const webhookClient = new Discord.WebhookClient({ url:process.env["HOOK"] });

exports.run = async (client, message, args, clients) => {
  if(!args[0]) return;
if (message.author.id === process.env.OWNERID || message.author.id === "399457024368443392") {
		let msg = message.content.slice(10).trim().split('\n');
  webhookClient.send({
	content: msg[2],
	username: msg[0],
	avatarURL: msg[1]
});
  }
	return;
};
exports.slots = async() => {
// 1 = public
// 2 = developer only
// 3 = verifed member
// 4 = staff
// null = custom command(it doesn't have id);
return 3;
}
exports.name = async() => {
  return "say";
}
exports.desc = async() => {
  return "make the bot say somthing.";
}