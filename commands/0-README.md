# Commands section
Create new commands files here.\
Click "New File" and type: commands/yourcommand.js\
Press Enter and paste the following code in the new file:
```js
const Discord = require("discord.js");
module.exports = {
  name: "commandname",
  aliases: [],
  description: "Description",
  category: "CATEGORY",
  disabled: false,
  developer: true,
  owner: true,
  cooldown: 15000,
  cooldownCollection: new Discord.Collection(),
  deleteOnCooldown: true,
  run: async (client, message, args, prefix) => {
    message.delete({timeout:500}).catch(e=>{});
    
  }
}
```

# Sección de comandos
Crea los nuevos archivos para comandos aquí.\
Clic en "New File" y escribe: commands/tucomando.js\
Presiona enter y pega lo siguiente dentro del nuevo archivo:
```js
const Discord = require("discord.js");
module.exports = {
  name: "nombredelcomando",
  aliases: [],
  description: "Descripción del comando",
  category: "CATEGORIA",
  disabled: false,
  developer: true,
  owner: true,
  cooldown: 15000,
  cooldownCollection: new Discord.Collection(),
  deleteOnCooldown: true,
  run: async (client, message, args, prefix) => {
    message.delete({timeout:500}).catch(e=>{});
    
  }
}
```
