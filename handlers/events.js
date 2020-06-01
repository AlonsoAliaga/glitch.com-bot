const fs = require("fs");
const ascii = require("ascii-table");
module.exports = (client) => {
  let table = new ascii("Events");
  table.setHeading("Event", "Status");
  fs.readdir("./events/", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
      //console.log("❌ No events to load...");
      table.addRow("No events to load...", '❌');
    }else{
      jsfile.forEach((f, i) => {
        delete require.cache[require.resolve(`../events/${f}`)]
        let event = require(`../events/${f}`);
        if(event.name && event.run){
          if(!event.disabled){
            client.events.set(event.name, event);
            table.addRow(f, '✅');
            if(event.once){
              client.once(event.name, event.run.bind(null, client));
            }else{
              client.on(event.name, event.run.bind(null, client));
            }
          }
         }
      });
      if(client.events.size === 0)table.addRow("No events to load...", '❌');
    }
    setTimeout(()=>console.log(table.toString()),1000);
  })
}
