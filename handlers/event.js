const fs = require("fs");
const ascii = require("ascii-table");
module.exports = (client) => {
  let table = new ascii("Events");
  table.setHeading("Event", "Status");
  fs.readdir("./events/", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
      console.log("❌ No events to load...");
      table.addRow("There are no events to load...", '❌');
    }else{
      jsfile.forEach((f, i) => {
        delete require.cache[require.resolve(`../events/${f}`)]
        let event = require(`../events/${f}`);
        if(event.name && event.run){
          if(!event.disabled){
            client.events.set(event.name, event);
            table.addRow(f, '✅');
            if(event.once){
              client.once(eventName, event.run.bind(null, client));
            }else{
              client.on(eventName, event.run.bind(null, client));
            }
          }
         }
      });
      setTimeout(()=>console.log(table.toString()),1500);
    }
  })
}
