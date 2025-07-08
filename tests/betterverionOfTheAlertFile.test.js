const { describe, it, before, after, afterEach } = require('mocha');
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const addContext = require('mochawesome/addContext');
const fs = require('fs');
const path = require('path');

describe('Amazon Page Test alert pop up', function () {
  this.timeout(10000); // Applies to all tests in this block

  let driver;

  before(async () => {
    // Create screenshots folder if it doesn't exist
    const dir = './screenshots';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    driver = await new Builder().forBrowser('chrome').build();
    console.log('Chrome driver initialized successfully!');
  });

  after(async () => {
    if (driver) {
      await driver.quit();
      console.log('Driver quit successfully!');
    }
  });

  afterEach(async function () {
    // On test failure, capture screenshot
    if (this.currentTest.state === 'failed' && driver) {
      const filename = `./screenshots/${this.currentTest.title.replace(/\s+/g, '_')}.png`;
      const screenshot = await driver.takeScreenshot();
      fs.writeFileSync(filename, screenshot, 'base64');
      console.log('Failure screenshot saved:', filename);

      addContext(this, {
        title: 'Screenshot on failure',
        value: filename,
      });
    }
  });

  // Skipped test blocks (for learning/testing purposes)
  it.skip('should show a pop up to the web site', async () => {
    await driver.get('https://demoqa.com/alerts');
    await driver.findElement(By.id('promtButton')).click();
    await driver.wait(until.alertIsPresent(), 5000);
    const alertConntent = await driver.switchTo().alert();
    const textAlert = await alertConntent.getText();
    console.log(`Alert text: ${textAlert}`);
    await alertConntent.sendKeys("Hello world");
    await alertConntent.accept();
    const result = await driver.findElement(By.id("promptResult")).getText();
    assert.ok(result.includes("Hello world"), "The alert result does not contain the expected text");
  });

  it.skip('should switch to frame and back', async () => {
    await driver.get('https://demoqa.com/frames');
    const frame = await driver.findElement(By.id('frame1'));
    await driver.wait(until.ableToSwitchToFrame(frame), 5000);
    await driver.switchTo().frame(frame);

    const heading = await driver.findElement(By.id('sampleHeading')).getText();
    assert.strictEqual(heading, 'This is a sample page', "The frame heading text does not match");

    await driver.switchTo().defaultContent();
  });

  it.skip('should upload a file', async () => {
    await driver.get('https://demoqa.com/upload-download');
    const fileInput = await driver.findElement(By.id('uploadFile'));
    const filePath = '/home/meriam/Downloads/36 - CERT W 670-2032.pdf';
    await fileInput.sendKeys(filePath);
    const uploadedFileName = await driver.findElement(By.id('uploadedFilePath')).getText();
    assert.ok(uploadedFileName.includes('36 - CERT W 670-2032.pdf'), "Uploaded file name mismatch");
  });

  it.skip('should open a new window and switch to it', async () => {
    await driver.get('https://demoqa.com/browser-windows');
    await driver.findElement(By.id('windowButton')).click();
    await driver.wait(async () => (await driver.getAllWindowHandles()).length > 1, 5000);
    const handles = await driver.getAllWindowHandles();
    await driver.switchTo().window(handles[1]);

    const heading = await driver.findElement(By.id('sampleHeading')).getText();
    assert.strictEqual(heading, 'This is a sample page', "Heading mismatch in new window");

    await driver.close();
    await driver.switchTo().window(handles[0]);
  });

  it.skip('should open a new tab and switch to it', async () => {
    await driver.get('https://demoqa.com/browser-windows');
    await driver.findElement(By.id('tabButton')).click();
    await driver.wait(async () => (await driver.getAllWindowHandles()).length > 1, 5000);
    const handles = await driver.getAllWindowHandles();
    await driver.switchTo().window(handles[1]);

    const heading = await driver.findElement(By.id('sampleHeading')).getText();
    assert.strictEqual(heading, 'This is a sample page', "Heading mismatch in new tab");

    await driver.close();
    await driver.switchTo().window(handles[0]);
  });

  it.skip('should position the window at the top left corner', async () => {
    await driver.get('https://demoqa.com/browser-windows');
    await driver.manage().window().setRect({ x: 0, y: 0, width: 800, height: 600 });
    const rect = await driver.manage().window().getRect();
    assert.strictEqual(rect.x, 0);
    assert.strictEqual(rect.y, 0);
  });

  it.skip('should resize the window to 800x600', async () => {
    await driver.get('https://demoqa.com/browser-windows');
    await driver.manage().window().setRect({ width: 800, height: 600 });
    const rect = await driver.manage().window().getRect();
    assert.strictEqual(rect.width, 800);
    assert.strictEqual(rect.height, 600);
  });

  it.skip('should show an alert and accept it', async () => {
    await driver.get('https://demoqa.com/alerts');
    await driver.findElement(By.id('alertButton')).click();
    await driver.wait(until.alertIsPresent(), 5000);
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    console.log(`Alert text: ${alertText}`);
    await alert.accept();
  });

  // ✅ ✅ ✅ ACTIVE TEST: Screenshot + addContext
  it('should take a screenshot after clicking a button', async function () {
    await driver.get('https://demoqa.com/buttons');
    const button = await driver.findElement(By.id('doubleClickBtn'));
    await button.click();
    console.log('Button clicked!');

    const screenshot = await driver.takeScreenshot();
    const screenshotPath = path.resolve('./screenshots/doubleclick.png');
    fs.writeFileSync(screenshotPath, screenshot, 'base64');
    console.log('Screenshot saved at:', screenshotPath);

    // Attach to Mochawesome report
    addContext(this, {
      title: 'Screenshot after clicking the button',
      value: screenshotPath,
    });

    console.log('Screenshot test completed successfully!');
  });

});
