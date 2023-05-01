const moment = require('moment');
const Discord = require('discord.js');
	function checkDays(date) {
			let now = new Date();
			let diff = now.getTime() - date.getTime();
			let days = Math.floor(diff / 86400000);
			return days + (days == 1 ? ' day' : ' days') + ' ago';
		}
exports.run = async (client, message, args, clients) => {
  console.log(`reachable`)
		let region = {
			'eu-central': ':flag_eu: Central Europe',
			'singapore': ':flag_sg: Singapore',
			'us-central': ':flag_us: U.S. Central',
			'sydney': ':flag_au: Sydney',
			'us-east': ':flag_us: U.S. East',
			'us-south': ':flag_us: U.S. South',
			'us-west': ':flag_us: U.S. West',
			'eu-west': ':flag_eu: Western Europe',
			'vip-us-east': ':flag_us: VIP U.S. East',
			'london': ':flag_gb: London',
			'amsterdam': ':flag_nl: Amsterdam',
			'hongkong': ':flag_hk: Hong Kong',
			'russia': ':flag_ru: Russia',
			'southafrica': ':flag_za:  South Africa'
		};
		let embed = new Discord.MessageEmbed()
			.setAuthor(message.guild.name, message.guild.iconURL)
			.setColor('#09FFFF')
			.addField('Name', message.guild.name, true)
			.addField('ID', message.guild.id, true)
			.addField(
				'Owner',
				`${message.guild.fetchOwner}#${
					message.guild.owner.user.discriminator
				}`,
				true
			)
			.addField('Region', region[message.guild.region], true)
			.addField(
				'Total members',
				`${message.guild.members.cache.size}`,
				true
			)
			.addField(
				'Total humans',
				`${await message.guild.members.cache.filter(member => !member.user.bot)
					.size}`,
				true
			)
			.addField(
				'Total bots',
				` ${await message.guild.members.cache.filter(member => member.user.bot)
					.size}`,
				true
			)
			.addField(
				'verifiaction Level',
				await message.guild.verificationLevel,
				true
			)
			.addField(
				'Online Members',
				await message.guild.members.cache.filter(
					member => member.presence.status == 'online'
				).size,
				true
			)
			.addField(
				'Offline Members',
				await message.guild.members.cache.filter(
					member => member.presence.status == 'offline'
				).size,
				true
			)
			.addField(
				'Idle Members',
				await message.guild.members.cache.filter(
					member => member.presence.status == 'idle'
				).size,
				true
			)
			.addField(
				'Do not disturb Members',
				await message.guild.members.cache.filter(
					member => member.presence.status == 'dnd'
				).size,
				true
			)
			.addField('Channels', message.guild.channels.cache.size, true)
			.addField('Roles', message.guild.roles.cache.size, true)
			.addField(
				'Creation Date',
				`${message.channel.guild.createdAt
					.toUTCString()
					.substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`,
				true
			)
			.setThumbnail(message.guild.iconURL());
		await message.channel.send({embed:[ embed ]});
		return;
};