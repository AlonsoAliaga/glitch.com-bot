const fs = require("fs");
const ascii = require("ascii-table");
module.exports = (client) => {
  let table = new ascii("Commands");
  table.setHeading("Command", "Load status");
  fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("❌ No commands to load...");
        table.addRow("There are no commands to load...", '❌');
    }else{
      jsfile.forEach((f, i) => {
        delete require.cache[require.resolve(`../commands/${f}`)]
        let command = require(`../commands/${f}`);
        if(command.name && command.run){
          let name = `${command.developer?"🔒":""}${f}`
          if(!command.disabled){
            console.log(`Command ${name} loaded!`);
            client.commands.set(command.name, command);
            if(command.aliases) command.aliases.forEach(alias => client.aliases.set(alias,command.name));
            table.addRow(name, `✅`);
          }
        }
      });
      setTimeout(()=>console.log(table.toString()),1500);
    }
  })
  
}
