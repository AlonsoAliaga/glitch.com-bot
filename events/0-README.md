# Events section
Create new events files here.\
Click "New File" and type: events/eventname.js\
Press Enter and paste the following code in the new file:
```js
const Discord = require("discord.js");
module.exports = {
  name: "eventname",
  disabled: false,
  once: false, //If event should be fired once, set to true.
  run: async (client,parms) => {
    //Code here
  }
}
```

# Sección de eventos
Crea los nuevos archivos para eventos aquí.\
Clic en "New File" y escribe: events/nombredelevento.js\
Presiona enter y pega lo siguiente dentro del nuevo archivo:
```js
const Discord = require("discord.js");
module.exports = {
  name: "nombredelevento",
  disabled: false,
  once: false, //Si el evento solo se debe correr una vez, pones true.
  run: async (client,parametros) => {
    //Code here
  }
}
```
