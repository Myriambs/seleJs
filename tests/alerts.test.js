const { describe, it, before, afterEach } = require('mocha');
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const addContext = require('mochawesome/addContext');
const fs = require('fs');
const path = require('path');
describe('Amazon Page Test alert pop up', function () {
  this.timeout(10000); // Applique à TOUS les hooks + it()

  let driver;

 before  (async () => {
    driver = await new Builder().forBrowser('chrome').build();
    console.log('Chrome driver initialized successfully!');
  });

  after(async () => {
    if (driver) {
      await driver.quit();
      console.log('Driver quit successfully!');
    }
  });

//  it('should show a pop up to the web site', async () => {
//   await driver.get('https://demoqa.com/alerts');

//   await driver.findElement(By.id('promtButton')).click(); // ✅ pas de #

//   await driver.wait(until.alertIsPresent(), 5000);
//   console.log('Alert button clicked!');

//   let alertConntent = await driver.switchTo().alert();

//   let textAlert = await alertConntent.getText(); // ✅ ici, get le texte AVANT accept()
//   console.log(`Alert text: ${textAlert}`);

//   await alertConntent.sendKeys("Hello world"); // ✅ envoie le texte
//   await alertConntent.accept(); // ✅ confirme le prompt

//   console.log('Alert accepted!');

//   let result = await driver.findElement(By.id("promptResult")).getText();
//   assert.ok(result.toString().includes("Hello world"), "The alert result does not contain the expected text");
//   console.log(`Result text: ${result}`);
//   console.log('Test completed successfully!');
// });
// the url is https://demoqa.com/frames and im ointing at frame1

// it ('should switch to frame and back', async () => {
//     await driver.get('https://demoqa.com/frames');
    

    
//     // Perform actions inside the frame
//     let frameText = await driver.findElement(By.id('frame1'));
//     await driver.wait(until.ableToSwitchToFrame(frameText), 5000);
//     console.log('Switched to frame successfully!');
//   let samleHeading = await driver.findElement(By.id('sampleHeading')).getText();
//   assert.ok(samleHeading.toString()= 'This is a sample page', "The frame heading text does not match the expected value");
//   console.log(`Frame heading text: ${samleHeading}`);
//     // Switch back to the default content
//     console.log('Frame switch test completed successfully!');
//  } )
//file up^load 
// it('should upload a file', async () => {
//     await driver.get('https://demoqa.com/upload-download');
//     // Locate the file input element and send the file path
//     const fileInput = await driver.findElement(By.id('uploadFile'));
//     const filePath = '/home/meriam/Downloads/36 - CERT W 670-2032.pdf'; 
//     //if u have the file in the test folder , juste put ' process.cwd()+path.join(foldername/file"// Replace with your actual file path
//     await fileInput.sendKeys(filePath);
//     console.log('File uploaded successfully!');
//     // Verify the uploaded file name is displayed
//     const uploadedFileName = await driver.findElement(By.id('uploadedFilePath')).getText();
//     assert.ok(uploadedFileName.includes('36 - CERT W 670-2032.pdf'), "The uploaded file name does not match the expected value");
//     console.log(`Uploaded file name: ${uploadedFileName}`);
//     await driver.sleep(5000); // Wait for 2 seconds to see the result
//   });
  // how to open new window 
//  it('should open a new window and switch to it', async () => {
//   await driver.get('https://demoqa.com/browser-windows');
  
//   // Click the button to open a new window
//   await driver.findElement(By.id('windowButton')).click();
//   console.log('New window button clicked!');
  
//   // Wait for the new window to open
//   await driver.wait(async () => {
//     const handles = await driver.getAllWindowHandles();
//     return handles.length > 1;
//   }, 5000);
  
//   const handles = await driver.getAllWindowHandles();
  
//   // Switch to the new window
//   await driver.switchTo().window(handles[1]);
//   console.log('Switched to new window successfully!');
  
//   // ✅ Lire le contenu de <h1 id="sampleHeading">
//   const heading = await driver.findElement(By.id('sampleHeading')).getText();
//   assert.strictEqual(heading, 'This is a sample page', "The new window heading does not match expected value");
//   console.log(`New window heading: ${heading}`);
  
//   // Fermer la nouvelle fenêtre et revenir à l’originale
//   await driver.close();
//   await driver.switchTo().window(handles[0]);

//   console.log('New window test completed successfully!');
// });

  // how to open new tab
//   it('should open a new tab and switch to it', async () => {
//     await driver.get('https://demoqa.com/browser-windows');
//     // Click the button to open a new tab
//     await driver.findElement(By.id('tabButton')).click();
//     console.log('New tab button clicked!');
//     // Wait for the new tab to open
//     await driver.wait(async () => {
//       const handles = await driver.getAllWindowHandles();
//       return handles.length > 1;
//     }, 5000);
//     // Get all window handles
//     const handles = await driver.getAllWindowHandles();
//     // Switch to the new tab
//     await driver.switchTo().window(handles[1]);
//     console.log('Switched to new tab successfully!');
//     // Verify the title of the new tab
// const heading = await driver.findElement(By.id('sampleHeading')).getText();
// assert.strictEqual(heading, 'This is a sample page', "The new window heading does not match expected value");
//     console.log(`New tab title: ${heading}`);
//     // Close the new tab and switch back to the original window
//     await driver.close();
//     await driver.switchTo().window(handles[0]);
//   });
//   console.log('New tab test completed successfully!');

//how to position window 
//     it('should position the window at the top left corner', async () => {
//         await driver.get('https://demoqa.com/browser-windows');
        
//         // Set the window position to the top left corner (0, 0)
//         await driver.manage().window().setRect({ x: 0, y: 0, width: 800, height: 600 });
//         console.log('Window positioned at the top left corner successfully!');
        
//         // Verify the window position
//         const rect = await driver.manage().window().getRect();
//         assert.strictEqual(rect.x, 0, "The window x position is not at the top left corner");
//         assert.strictEqual(rect.y, 0, "The window y position is not at the top left corner");
//         console.log(`Window position: x=${rect.x}, y=${rect.y}`);
        
//         console.log('Window positioning test completed successfully!');
//     });


//     //how to resice the page 
//     it('should resize the window to 800x600', async () => {
//         await driver.get('https://demoqa.com/browser-windows');
        
//         // Set the window size to 800x600
//         await driver.manage().window().setRect({ width: 800, height: 600 });
//         console.log('Window resized to 800x600 successfully!');
        
//         // Verify the window size
//         const rect = await driver.manage().window().getRect();
//         assert.strictEqual(rect.width, 800, "The window width is not 800");
//         assert.strictEqual(rect.height, 600, "The window height is not 600");
//         console.log(`Window size: width=${rect.width}, height=${rect.height}`);
        
//         console.log('Window resizing test completed successfully!');
//     }
//   );

//alert test
//   it('should show an alert and accept it', async () => {
//     await driver.get('https://demoqa.com/alerts');
    
//     // Click the button to trigger the alert
//     await driver.findElement(By.id('alertButton')).click();
//     console.log('Alert button clicked!');
    
//     // Wait for the alert to be present
//     await driver.wait(until.alertIsPresent(), 5000);
    
//     // Switch to the alert and get its text
//     const alert = await driver.switchTo().alert();
//     const alertText = await alert.getText();
//     console.log(`Alert text: ${alertText}`);
    
//     // Accept the alert
//     await alert.accept();
//     console.log('Alert accepted successfully!');
    
//     console.log('Alert test completed successfully!');
//   });
// take screenshot of simùple button click 
it('should take a screenshot after clicking a button', async function () {
  await driver.get('https://demoqa.com/buttons');

  // ✅ Click the stable button
  const button = await driver.findElement(By.id('doubleClickBtn'));
  await button.click();
  console.log('Button clicked!');

  // ✅ Optional delay (not required)
  await driver.sleep(1000);

  // ✅ Take screenshot and save it
  const screenshot = await driver.takeScreenshot();
  const screenshotPath = path.resolve('./screenshots/doubleclick.png');
  fs.writeFileSync(screenshotPath, screenshot, 'base64');
  console.log('Screenshot saved at:', screenshotPath);

  // ✅ Attach screenshot to Mochawesome report
  addContext(this, {
    title: 'Screenshot after clicking the button',
    value: screenshotPath,
  });

  console.log('Screenshot test completed successfully!');
});
  
afterEach(async function () {
  if (this.currentTest.state === 'failed') {
    const screenshot = await driver.takeScreenshot();
    const filename = `./screenshots/${this.currentTest.title.replace(/\s+/g, '_')}.png`;
    fs.writeFileSync(filename, screenshot, 'base64');
    console.log('Failure screenshot saved:', filename);

    // Attach to mochawesome
    addContext(this, {
      title: 'Screenshot on failure',
      value: filename,
    });
  }
});

});
