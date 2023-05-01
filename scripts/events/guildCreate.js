exports.run = async(client, clients, prefix,guild) => {
  client.channels.cache.get(`941892504549228674`).send(`new guild:${guild.name} - ${guild.id}`);
}