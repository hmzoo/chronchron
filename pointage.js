const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

let driverBuilder = new Builder().forBrowser(Browser.CHROME);
let goChronos = (d)=> {return d.get('http://chronos.sarthe.fr/');}


driverBuilder.build().then( (driver) => {
    goChronos(driver).then(() =>{
    driver.wait(until.titleIs('Self Service'), 60000).then(() => {
        console.log("WINDOWS OPEN");
        setTimeout(function() {
          driver.executeScript("Pointage()").then(() => console.log("Pointage OK")).catch((err) => console.log("Pointage NOK",err)); 
        }, 3000);
    });

    } );
    
});


