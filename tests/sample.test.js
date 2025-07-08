// const { describe, it, afterEach } = require('mocha');
// const { Builder, By, until } = require('selenium-webdriver');

// describe('Amazon Page Test', () => {
//   let driver;

//   afterEach(async () => {
//     if (driver) {
//       await driver.quit();
//       console.log('Driver quit successfully!');
//     }
//   });

//   it.skip('should navigate to Amazon and click on About Amazon link', async () => {
//     driver = await new Builder().forBrowser('chrome').build();

//     try {
//       await driver.get('https://www.amazon.in/');
//       console.log("Navigated to Amazon");

// ////////////****start of explication */
// // When you set an implicit timeout, you're telling the WebDriver: 
// // "If you can't find an element immediately, keep trying for X seconds
// //  before throwing a 'NoSuchElementException'."
// // If the element is found immediately: The code continues right away (no 5-second wait)
// // If the element is NOT found immediately: Selenium will:

// // Keep trying to find it for up to 5 seconds
// // Poll the DOM every ~500ms (default interval)
// // Return the element as soon as it's found (could be after 1 second, 3 seconds, etc.)
// // Only throw an error if it's still not found after the full 5 seconds
// ////---------------------------------end of explication----------------------------------//

//       await driver.manage().setTimeouts({ implicit: 5000 });

//       const element = await driver.wait(
//         until.elementLocated(By.xpath("//a[normalize-space()='About Amazon']")),
//         5000
//       );
//       await driver.wait(until.elementIsEnabled(element), 5000);
//       await element.click();
//       console.log('Clicked on About Amazon link successfully!');
//     } catch (error) {
//       console.error('Error during test execution:', error);
//     }
//   });

//   it.only('should skip this test', async () => { // ⚠️ misleading name, but test will run
//     driver = await new Builder().forBrowser('chrome').build();

//     try {
//       await driver.get('https://www.amazon.in/');
//       console.log("Navigated to Amazon");
// const element = await driver.wait(until.elementLocated(By.xpath("//div[@id='desktop-7']//li[4]/a")), 11000);
// await driver.wait(until.elementIsNotVisible(element), 11000);

//     } catch (error) {
//       console.error('Error during test execution:', error);
//     }

//     console.log('This test is skipped'); // ⚠️ misleading message, test is actually running
//   });
// });

// ///****************compare playwright and selerium  */
// // Playwright: The test runner itself provides .skip() and .only()
// // Selenium + Mocha: Pure Selenium is just a browser automation library, so you need a test framework like Mocha to get the .skip() and .only() functionality
// //________________________end of explanation__________________________//
