//                 ______          __                     __    
//                / ____/___  ____/ /__  ____ _____  ____/ /___ 
//               / /   / __ \/ __  / _ \/ __ `/ __ \/ __  / __ \
//              / /___/ /_/ / /_/ /  __/ /_/ / / / / /_/ / /_/ /
//              \____/\____/\__,_/\___/\__,_/_/ /_/\__,_/\____/ 
//                                                              
//                                  ___    __                     
//             _________  ____     /   |  / /___  ____  _________ 
//            / ___/ __ \/ __ \   / /| | / / __ \/ __ \/ ___/ __ \
//           / /__/ /_/ / / / /  / ___ |/ / /_/ / / / (__  ) /_/ /
//           \___/\____/_/ /_/  /_/  |_/_/\____/_/ /_/____/\____/ 
//
//                       Glitch.com discord.js bot project
//    Subscribe to https://www.youtube.com/channel/UCe93CEbgpUkiYO3tjOspPJQ

//Imports
const http = require("http");
const express = require("express");
const app = express();
const Discord = require("discord.js");
const fs = require("fs");
const child_process = require("child_process");
const packageFile = require("./package.json");
const Database = require('better-sqlite3');
require("dotenv").config({ path:"./.env"}); //Not necessary if using glitch. Necessary if not on glitch.

//Express - Auto ping
app.listen(process.env.PORT);
app.get("/ping", (request, response) => {
  console.log(`[PING] ${(new Date()).toLocaleString().split("GMT")[0].trim()} ping received!`);
  response.sendStatus(200);
});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/ping`);
}, 240000);

//Create client
const client = new Discord.Client({
  fetchAllMembers: true, //If the bot is for one server only, set to true.
  messageCacheMaxSize: 200
});

//Create editable values for commands/events
client.prefixes = ["!","a!"] //Yes, you will be able to have different prefixes.
client.footer = `MyBot v${packageFile.version}`
client.developerid = "290640988677079041"; //Replace it with your ID!
client.developer;
client.mentions;

//Load handlers
["commands","events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

//Create necessary collections
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();

//Creating databases
//Set to true if you want to create the database
if(false){
  client.database = new Database('./data/membersdata.db');
  //The following line creates a table for basic bots. you MUST edit this if you want to add new columns before you create the database.
  //Otherwise you'll have to run statements to alter the current table to add new columns.
  //Uncomment the following line when you are 100% sure it has all you need to store in database.
  //The provided code should be (in most of the cases) enough for a basic private bot (For one server only)
  //If you want to create a public bot, you will probably need a database PER guild.
  /*
  client.database.prepare("CREATE TABLE IF NOT EXISTS membersinfo (userid TEXT PRIMARY KEY,usertag TEXT DEFAULT 'Unknown#0000',`+
                        `coins INTEGER DEFAULT 0,bank INTEGER DEFAULT 0,experience INTEGER DEFAULT 0,level INTEGER DEFAULT 1,`,
                        `registerdate BIGINT DEFAULT 0,dailyenddate BIGINT DEFAULT 0,robenddate BIGINT DEFAULT 0,`+
                        `robbedenddate BIGINT DEFAULT 0,streak INTEGER DEFAULT 0,messagescount INTEGER DEFAULT 0`)").run();
  */
}

//Create utils classes
client.utils = require("./functions/utils.js");

//Create additional variables to access inside commands/events
client.colors = { //Easy way to save colors and use them for embeds.
  main: "#7c3b96", //Replace this with your main color. Mine is purple!
  red:"#e6381e",
  green:"#28ba18",
  blue: "#0388fc",
  pink:"#ff40a6",
  yellow:"#fcd703",
  purple:"#912ebf",
  gold:"#f5af0c",
  darkred:"#a80303",
  darkpink:"#bf0468",
  darkgray:"#575757",
  darkblue:"#101140",
  darkyellow:"#917f09",
  darkgreen:"#069147",
  darkpurple:"#690580",
  lightred:"#f27777",
  lightpink:"#f774ba",
  lightpurple:"#b682c2",
  lightblue:"#77c7f2",
  lightgreen:"#98f277",
  lightyellow:"#f2de77",
  skyblue:"#57e9ff"
}
client.emoji = { //Easy way to save emojis and use them in messages and embeds.
  //Quick explanation: This will allow you to use "client.emoji.check" where you need the emoji.
  //What about "client.emoji.checkid"? This will allow you to use it ALSO in reactions. Example:
  // message.react(client.emoji.checkid).catch(e=>{});
  check:"",
  checkid:"",
  cross:"",
  crossid:"",
  verified:"",
  verifiedid:""
}

//Client login
client.login(process.env.DISCORD_TOKEN).catch(e=>{
  console.log(`🚫 An invalid token was provided. Make sure you update DISCORD_TOKEN in .env file after you import the project from Github!`)
});
