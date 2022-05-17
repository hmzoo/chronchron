
var xml2js = require('xml2js');
var axios = require('axios');
 var moment = require('moment');

 
parser = new xml2js.Parser();
let objmin = 470;
let limit_matin=moment('08:00', 'hh:mm');
let limit_pmidi=moment('11:30', 'hh:mm');
let limit_rmidi=moment('14:00', 'hh:mm');
let limit_soir=moment('16:30', 'hh:mm');



let usrcode = "009515"
let urlxmlbadges ="http://chronos.sarthe.fr/chronos.wsc/asselfptg.html?typ=brut&usr=";




exports.info = (usr)=> {
    let url = urlxmlbadges+usr;
    return axios.get(url).then( (resp) => {
        //console.log("RAW", resp.data);
         return parser.parseStringPromise(resp.data).then((resp) => {
             var p = []
             resp.ptg.ptgRow.forEach(obj => { p.push(moment(obj.d+" "+obj.hrb,"YYYY-MM-DD hh.mm"));});
             return buildAnswer(p);
         }).catch(err => console.log(err));;
        }).catch(err => console.log(err));
}


buildAnswer = (data) => {
    data.sort((date1, date2) => date1 - date2);
    var now = moment(new Date());
    var totalduration =0;
    var tolimit =0;
    switch (data.length) {
      case 1 :
        totalduration =  hdiff(data[0],now);
        tolimit = hdiff(limit_pmidi,now);
        break;
      case 2 :
        totalduration =  hdiff(data[0],data[1]);
        var tolimit = 0;
        break;
      case 3 :
        totalduration =  hdiff(data[0],data[1])+hdiff(data[2],now);
        tolimit = hdiff(limit_soir,now);
        break;
      case 4 :
        totalduration =  hdiff(data[0],data[1])+hdiff(data[2],data[3]);
        tolimit = -1
        break;
      default :
      totalduration = 0
      var tolimit =0;
    }

    return {
        count : data.length,
        badges : data,
        totalduration : totalduration,
        infotd: minToHM(totalduration),
        tolimit : tolimit,
        toobj : totalduration - objmin
    };
 
       
}



let hdiff = (start,end) => { 
    //console.log(start,end);
    return Math.floor(moment.duration(end.diff(start)).asMinutes()); }

let minToHM = (m)=> {return Math.floor(m / 60) + ':' + m % 60;}


//getpointages(usrcode).then( resp => console.log(resp));