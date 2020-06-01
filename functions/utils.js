#You can create "global" functions here. They will be available wherever you can access to "client"
#Simply call " client.utils.yourMethod(parameters); "
#There is an example below

module.exports.capitalize = (string = "",onlyFirst = true) => {
  if(string.length === 0) return "";
  return onlyFirst?`${string.substring(0,1).toUpperCase()}${string.slice(1).toLowerCase()}`:string.split(" ").map(w=>w.length === 0?
    w:`${w.substring(0,1).toUpperCase()}${w.slice(1).toLowerCase()}`).join(" ")
}
