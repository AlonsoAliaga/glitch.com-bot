//You can create "global" functions here. They will be available wherever you can access to "client"
//Simply call " client.utils.yourMethod(parameters); "
//There are some useful examples below that will help you with your bot. (Recommended to keep them)
module.exports.capitalize = (string = "",allWords = false) => {
  if(string.length === 0) return "";
  return !allWords?`${string.substring(0,1).toUpperCase()}${string.slice(1).toLowerCase()}`:string.split(" ").map(w=>w.length === 0?
    w:`${w.substring(0,1).toUpperCase()}${w.slice(1).toLowerCase()}`).join(" ")
}
module.exports.registerMember = (client,member) => {
  client.database.prepare("INSERT INTO membersinfo (userid,usertag,registerdate) VALUES (?,?,?)").run(member.id,member.user.tag,Date.now());
}
module.exports.getMemberInfo = (client,member) => {
  return client.database.prepare("SELECT * FROM membersinfo WHERE userid=?").get(member.id);
}
module.exports.getMemberData = (client,member) => {
  let memberData = this.getMemberInfo(client,member);
  if(!memberData){
    this.registerMember(client,member);
    console.log(`📚 Auto registering ${member.user.tag} (${member.id}) in guild '${member.guild.name}' (${member.guild.id})`)
    memberData = this.getMemberInfo(client,member);
  }
  return memberData;
}
const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24
const WEEK = DAY * 7
const YEAR = DAY * 365.25
const PERIOD = {
  ms: 1,
  s: SECOND,
  m: MINUTE,
  h: HOUR,
  d: DAY,
  w: WEEK,
  y: YEAR
}
module.exports.toMs = (duration = "") => {
  let matchs = duration.match(/[0-9]+([smhdwy])/g);
  if(!matchs || matchs.length === 0) return undefined;
  return matchs.reduce((acc, value) => acc += value.replace(/(ms|[smhdwy])/g,'') * PERIOD[value.slice(-1)],0,)
}
module.exports.getMember = async (message, toCheck, defaultAuthor = false, includeNames = false) => {
  if (!toCheck) return defaultAuthor ? message.member : undefined
  let possibleId = toCheck.replace(/[^0-9]/g,"")
  let member = message.guild.members.cache.get(possibleId);
  if (!member) {
    if(possibleId.length === 18){
      try {
        return await message.guild.members.fetch(possibleId);
      } catch(e) {}
    }
    if (!member && includeNames) {
      toCheck = toCheck.toLowerCase();
      member = message.guild.members.cache.find(m => m.user.tag.toLowerCase() === toCheck || m.user.username.toLowerCase() === toCheck || (m.nickname && m.nickname.toLowerCase() === toCheck));
    }
  }
  return member || (defaultAuthor ? message.member : member);
}
module.exports.parseDate = (toParse) => {
  let date = new Date();
  if (!toParse) toParse = date;
  if (!isNaN(toParse)) {
    date = new Date(toParse)
  } else if (toParse instanceof Date) {
    date = toParse;
  } else return undefined;
  return date.toLocaleString().split("GMT")[0].trim();
}
