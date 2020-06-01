//You can create "global" functions here. They will be available wherever you can access to "client"
//Simply call " client.utils.yourMethod(parameters); "
//There is an example below
module.exports.capitalize = (string = "",onlyFirst = true) => {
  if(string.length === 0) return "";
  return onlyFirst?`${string.substring(0,1).toUpperCase()}${string.slice(1).toLowerCase()}`:string.split(" ").map(w=>w.length === 0?
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
