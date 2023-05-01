const Discord = require('discord.js');
const ms = require('ms')
exports.run = async(client, message, args, clients) => {
  // anything goes here.
  	if(message.member.permissions.has('MODERATE_MEMBERS')) {
      timeout(message,args,client,clients)
    }
  else if(message.author.id == process.env.OWNERID) {
      timeout(message,args,client,clients)
    } else return;

			
};
async function timeout(message,args,client,clients) {
  console.log('e')
  let member = message.mentions.members.first() ||  await message.guild.members.cache.get(args[0]);
			if (!member)
				return message.reply('Please mention a valid member of this server');
			
let timems = args[1]
  let dur = args[2]
  let timem = 0
 
  if(!parseInt(timems)) return
  if(dur.toLowerCase() == "s")
          {
            timem = timems * 1000
          }else if(dur.toLowerCase() == "m") 
          {   
            timem = timems * 60000
          }else
  if(dur.toLowerCase() == "h")
  {
    timem = timems * 3600000
  }
  if(dur.toLowerCase() == "d") {
    timem = timems * 86400000
  }
			let reason = args.slice(3).join(' ');
			if (!reason) reason = 'no reason '
try {
			await member
				.timeout(timem,reason)
				
					
            
					
            message.reply(
				`${member.user.tag} has been timeouted for ${ms(timem)} by ${
					message.author.tag
				} because: ${reason}`
			);  
        
          } catch( error) {
			message.reply(
						`Sorry ${message.author} I couldn't timeout ${member.user.tag} because of : ${error}`)
}
}
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