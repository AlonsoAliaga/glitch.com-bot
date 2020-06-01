const Discord = require("discord.js");
const prettyMs = require("pretty-ms");
module.exports = {
  name: "message",
  disabled: false,
  run: async (client,message) => {
    if (message.channel.type !== "text") {
      return;
    }
    if (message.type !== "DEFAULT") {
      return;
    }
    if (message.author.bot) {
      return;
    }
    if (message.webhookID) {
      return;
    }
    //Why this? If "fetchAllMembers" is set to false in the Client constructor
    //This code will fetch the member and set it as "member" property in the messasge sent.
    //If this code is missing, "message.member" will return undefined if "fetchAllMembers"
    //is set to false. Recommended to keep it.
    if (!message.member) message.member = await message.guild.members.fetch(message);
    
    //Make your bot reply when someone mention the bot.
    if (client.mentions.includes(message.content)){
      //message.react(client.emoji.checkid).catch(e=>{})
      let description = [
        `${message.author}, **do you need help?** Use #support or contact a staff member!`
      ]
      message.channel.send(description.join("\n")).then(m=>m.delete({timeout:15000}).catch(e=>{})).catch(e=>{})
    }
    
    //This is the command handler.
    if (message.content && client.prefixes.some(p=>message.content.toLowerCase().startsWith(p))) {
      let prefixUsed = client.prefixes.find(p=>message.content.toLowerCase().startsWith(p));
      let args = message.content.slice(prefixUsed.length).trim().split(' ');
      let cmd = args.shift().toLowerCase();
      let command;
      if (client.commands.has(cmd)) {
        command = client.commands.get(cmd);
      } else if (client.aliases.has(cmd)) {
        command = client.commands.get(client.aliases.get(cmd));
      } else return;
      if (command.owner && message.author.id !== message.guild.ownerID) return; //Only for guild's owner.
      if (command.developer && message.author.id !== client.developerid) return; //Only for bot's developer.
      if (command.cooldown && command.cooldownCollection) { //Cooldown.
        if (command.cooldownCollection.has(message.author.id)) {
          if (command.deleteOnCooldown) message.delete({timeout:5000}).catch(e=>{})
          return message.channel.send(`${client.emoji.cross} You are running commands too quickly. **Chill out a bit and try in ${prettyMs(command.cooldownCollection.get(message.author.id) - Date.now())}!**`).then(m=>{
              if (command.deleteOnCooldown) m.delete({timeout:5000}).catch(e=>{})
            }).catch(e=>{})
        }
        command.cooldownCollection.set(message.author.id,Date.now() + command.cooldown)
        setTimeout(() => {
          command.cooldownCollection.delete(message.author.id)
        },command.cooldown);
      }
      command.run(client, message, args, prefixUsed);
    }
  }
}
