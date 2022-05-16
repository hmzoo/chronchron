const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get('http://chronos.sarthe.fr/');
    //await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    
  } finally {
    console.log("OK")
  }
})();