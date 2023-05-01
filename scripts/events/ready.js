exports.run = async(client, clients, prefix,message) => {
  console.log('i am ready to running! UWU');
  client.user.setActivity("running version 1.5beta", { type:"WATCHING" });
 client.guilds.cache.map(guild => console.log(`${guild.name} - ${guild.id}`));
}