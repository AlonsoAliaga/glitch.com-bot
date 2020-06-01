const Discord = require("discord.js");
const prettyMs = require("pretty-ms");
module.exports = {
  name: "ready",
  run: async (client) => {
    console.log(`✔️ Bot successfully logged as ${client.user.tag} (${client.user.id})`)
    //Code here
  }
}
