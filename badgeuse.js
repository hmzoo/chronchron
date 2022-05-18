const { Builder, Browser, By, Key, until } = require('selenium-webdriver');

 let scriptBadge= "Pointage()";
 //let scriptBadge= "genPopup('test')";



exports.badge = () => { 
  let driver = new Builder().forBrowser(Browser.CHROME).build();
console.log("OPEN WINDOW")
return driver.get('http://chronos.sarthe.fr/')
  .then( () => {console.log("WAIT TITLE"); return driver.wait(until.titleIs('Self Service'), 60000);})
  .then( () => { console.log("WAIT 3s"); return new Promise( (resolve) => {setTimeout(()=>{return resolve()}, 3000);});})
  .then( () => { console.log("EXEC SCRIPT"); return driver.executeScript(scriptBadge);})
  .then( () => { console.log("WAIT 2s"); return new Promise( (resolve) => {setTimeout(()=>{return resolve()}, 2000);});})
  .then( () => { console.log("CLOSE WINDOW"); return driver.close(); })
}



      //         driver.executeScript("Pointage()").then(() => console.log("Pointage OK")).catch((err) => console.log("Pointage NOK",err)); 
    

