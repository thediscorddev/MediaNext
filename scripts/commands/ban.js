const Discord = require('discord.js');
exports.run = async (client, message, args, clients) => {
if (message.author.id === process.env.OWNERID || message.member.permissions.has("BAN_MEMBERS")) {

			 let member = message.mentions.members.first() ||  await message.guild.members.cache.get(args[0]);
			if (!member) return message.reply('Please mention a valid member of this server');
				
			if (!member.banable)
				return message.reply(
					'I cannot ban this user! Do they have a higher role? Do I have ban permissions?'
				);
		
		let reason = args.slice(1).join(' ');
		if (!reason) reason = "No reasons provided";
try {
   const collection = clients.db("Leveling").collection('warnings');
  await member
			.ban(reason);

	
   collection.find({"id":member.user.id}).toArray(function(err, docs) {
    if(docs.length == 1) {
     collection.updateOne({"id":member.user.id},{$push:{ban:{"id":Math.floor(Math.random() * 999999999),"time":parseInt(Date.now() / 1000),"reason":reason,"by":message.author.id}}},function(err, result) {
       client.users.cache.get(member.user.id).send(`you have been banned in ${message.guild.name} because ${reason}`)
    message.reply(
			`${member.user.tag} has been banned by ${
				message.author.tag
			} because: ${reason}`
		);
     })
    }
    if(docs.length == 0) {
       collection.insertMany([{"id":member.user.id,"warn":[],"kick":[],"ban":[{"id":Math.floor(Math.random() * 999999999),"time":parseInt(Date.now() / 1000),"reason":reason,"by":message.author.id}],"mute":[]}], function(err, result) {
          client.users.cache.get(member.user.id).send(`you have been banned in ${message.guild.name} because ${reason}`)
    message.reply(
			`${member.user.tag} has been banned by ${
				message.author.tag
			} because: ${reason}`
		);
  });
    }
  })
}
  catch(e) {
    message.reply(
					`Sorry ${message.author} I couldn't ban because of : ${e}`
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
  return "ban";
}
exports.desc = async() => {
  return "ban a member";
}