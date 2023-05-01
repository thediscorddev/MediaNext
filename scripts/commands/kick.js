const Discord = require('discord.js');
exports.run = async (client, message, args, clients) => {
if (message.author.id === process.env.OWNERID || message.member.permissions.has("KICK_MEMBERS")) {

			 let member = message.mentions.members.first() ||  await message.guild.members.cache.get(args[0]);
			if (!member) return message.reply('Please mention a valid member of this server');
				
			if (!member.kickable)
				return message.reply(
					'I cannot kick this user! Do they have a higher role? Do I have kick permissions?'
				);
		
		let reason = args.slice(1).join(' ');
		if (!reason) reason = "No reasons provided";
try {
   const collection = clients.db("Leveling").collection('warnings');
  await member
			.kick(reason);

	
   collection.find({"id":member.user.id}).toArray(function(err, docs) {
    if(docs.length == 1) {
     collection.updateOne({"id":member.user.id},{$push:{kick:{"id":Math.floor(Math.random() * 999999999),"time":parseInt(Date.now() / 1000),"reason":reason,"by":message.author.id}}},function(err, result) {
       client.users.cache.get(member.user.id).send(`you have been kicked in ${message.guild.name} because ${reason}`)
    message.reply(
			`${member.user.tag} has been kicked by ${
				message.author.tag
			} because: ${reason}`
		);
     })
    }
    if(docs.length == 0) {
       collection.insertMany([{"id":member.user.id,"warn":[],"ban":[],"kick":[{"id":Math.floor(Math.random() * 999999999),"time":parseInt(Date.now() / 1000),"reason":reason,"by":message.author.id}],"mute":[]}], function(err, result) {
          client.users.cache.get(member.user.id).send(`you have been kicked in ${message.guild.name} because ${reason}`)
    message.reply(
			`${member.user.tag} has been kicked by ${
				message.author.tag
			} because: ${reason}`
		);
  });
    }
  })
}
  catch(e) {
    message.reply(
					`Sorry ${message.author} I couldn't kick because of : ${e}`
				);
  }
		
		

		return;
};
}
exports.slots = async() => {
// 1 = public
// 2 = developer only
// 3 = verifed member
// 4 = staff
// null = custom command(it doesn't have id);
return 4;
}
exports.name = async() => {
  return "kick";
}
exports.desc = async() => {
  return "kick a member";
}