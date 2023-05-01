exports.run = async(client, clients, prefix,message) => {
  console.log('i am ready to be online!');
  client.user.setActivity("running version 1.5beta build 2", { type:"WATCHING" });
}
