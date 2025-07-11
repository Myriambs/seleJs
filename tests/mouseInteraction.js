const {Browse,Builder,By,Key,until} = require('selenium-webdriver');

(async function interaction(){

let driver = await new Builder().forBrowser('chrome').build();
try{
await driver.get("https://www.selenium.dev/selenium/web/mouse_interaction")
console.log('in the page done')
const ele = await driver.findElement(By.id('clickable'))
await driver.wait(until.elementIsVisible(ele), 5000);
await driver.actions().sendKeys(ele,"Hello World!").perform();
await driver.wait(until.elementIsEnabled(ele), 5000);
console.log('Element clicked successfully!');

}finally {
    await driver.quit();
  }




})()