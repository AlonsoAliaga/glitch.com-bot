const Discord = require("discord.js");
const prettyMs = require("pretty-ms");
module.exports = {
  name: "ready",
  run: async (client) => {
    console.log(`✔️ Bot successfully logged as ${client.user.tag} (${client.user.id})`)
    runDefaults(client);
    //Code here
    
  }
}
function runDefaults(client){
  client.prefixes.push(`<@${client.user.id}>`);
  client.prefixes.push(`<@!${client.user.id}>`);
  client.mentions = [`<@${client.user.id}>`,`<@!${client.user.id}>`]
  client.users.fetch(client.developerid).then(u=>{
    client.developer = u;
  }).catch(e=>{});
}
