let getip = require('./getip');
let getbadges = require('./getbadges');
let badgeuse = require('./badgeuse');

let interface = "vEthernet (ExtSwitch (Ethernet))";
let validip ="172.19.46.82";
let usercode ="009515";

let stopAll = ( msg ) => {
  console.log ("CANCELED : ",msg);
  process.exit(1);
}

let checkTime = (data) => {
  if (!('tolimit' in data)) { stopAll("NO BADGE DATA");}
  if ((data.tolimit < 0 )) { stopAll("BADGE NOT AUTHORIZED (COUNT:"+data.count+" MIN:"+data.tolimit+" )");}

}

// Check IP
let myip = getip.ip(interface);
if (myip != validip ) {
  stopAll("WRONG IP");
}

getbadges.info(usercode).then( (resp) => {
  console.log("BADGES :",resp);
  checkTime(resp);
  badgeuse.badge().then( () => console.log("BADGE OK")).catch( (err) => console.log("ERR : ",err));
});




