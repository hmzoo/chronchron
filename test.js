let getip = require('./getip');
let getbadges = require('./getbadges');

let interface = "vEthernet (ExtSwitch (Ethernet))";
let validip ="172.19.46.82";
let usercode ="009515";

let stopAll = ( msg ) => {
  console.log ("Stop App : ",msg);
  process.exit(1);
}


let myip = getip.ip(interface);

if (myip != validip ) {
  stopAll("WRONG IP");
}

getbadges.info(usercode).then( (resp) => {
  console.log(resp)
});


