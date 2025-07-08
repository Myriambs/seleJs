# Selenium WebDriver Test Automation Project

A comprehensive Selenium WebDriver project demonstrating various web automation techniques using JavaScript, Node.js, and Mocha testing framework.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Examples](#test-examples)
- [Screenshots](#screenshots)
- [Reporting](#reporting)
- [Key Learning Points](#key-learning-points)

## 🎯 Overview

This project serves as a learning resource for Selenium WebDriver automation testing. It includes practical examples of:
- Basic web navigation and element interaction
- Alert handling and frame switching
- File upload automation
- Window and tab management
- Screenshot capturing
- Test reporting with Mochawesome

## ✨ Features

- **Multi-browser support** (Chrome configured)
- **Comprehensive test examples** covering common web automation scenarios
- **Screenshot capture** on test failures and success
- **HTML test reports** with Mochawesome
- **Proper error handling** and cleanup
- **Timeout management** and waits
- **Element interaction** techniques

## 🔧 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **Chrome Browser** installed
- **ChromeDriver** (automatically managed by selenium-webdriver)

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd selenium-project
2.Install dependencies:

npm install


3.Install required packages:

npm install selenium-webdriver mocha mochawesome assert

📁 Project Structure
selenium-project/
├── .mocharc.js          # Mocha configuration
├── tests/
│   ├── amazon-test.js   # Amazon page navigation tests
│   ├── interaction.js   # Mouse interaction examples
│   └── main-test.js     # Comprehensive test suite
├── screenshots/         # Auto-generated screenshots
├── mochawesome-report/  # Test reports (generated)
└── package.json

⚙️ Configuration
Mocha Configuration (.mocharc.js)
module.exports = {
  reporter: 'mochawesome',
  ui: 'bdd',
  timeout: 10000,
  recursive: true,
  spec: ['tests/**/*.js'],
};

Required Dependencies
{
  "selenium-webdriver": "^4.x.x",
  "mocha": "^10.x.x", 
  "mochawesome": "^7.x.x",
  "assert": "^2.x.x"
}

🚀 Running Tests
Run all tests:
npm test

Run specific test file:

bash
Copy
Edit

npx mocha tests/main-test.js

Run with specific reporter:

bash
Copy
Edit

npx mocha --reporter mochawesome tests/**/*.js

Run only active tests (skip .skip() tests):

bash
Copy
Edit

npx mocha tests/**/*.js

📝 Test Examples
1. Basic Navigation & Element Interaction
// Amazon page navigation test
await driver.get('https://www.amazon.in/');
const element = await driver.wait(
  until.elementLocated(By.xpath("//a[normalize-space()='About Amazon']")),
  5000
);
await element.click();

2. Alert Handling
// Handle JavaScript alerts with user input
await driver.findElement(By.id('promtButton')).click();
await driver.wait(until.alertIsPresent(), 5000);
const alert = await driver.switchTo().alert();
const alertText = await alert.getText();
await alert.sendKeys("Hello world");
await alert.accept();

3. Frame Switching
// Switch to iframe and back
const frame = await driver.findElement(By.id('frame1'));
await driver.wait(until.ableToSwitchToFrame(frame), 5000);
await driver.switchTo().frame(frame);
// Perform actions in frame
await driver.switchTo().defaultContent(); // Switch back

4. File Upload


// Upload file to web form
const fileInput = await driver.findElement(By.id('uploadFile'));
const filePath = '/path/to/your/file.pdf';
await fileInput.sendKeys(filePath);
5. Window & Tab Management
// Open new window and switch to it
await driver.findElement(By.id('windowButton')).click();
await driver.wait(async () => (await driver.getAllWindowHandles()).length > 1, 5000);
const handles = await driver.getAllWindowHandles();
await driver.switchTo().window(handles[1]);
// Work in new window
await driver.close();
await driver.switchTo().window(handles[0]); // Switch back

6. Window Positioning & Resizing
// Position window at top-left corner
await driver.manage().window().setRect({ x: 0, y: 0, width: 800, height: 600 });

// Resize window
await driver.manage().window().setRect({ width: 800, height: 600 });

7. Mouse Interactions
// Send keys to element using actions
const element = await driver.findElement(By.id('clickable'));
await driver.actions().sendKeys(element, "Hello World!").perform();

📸 Screenshots
The project automatically captures screenshots in two scenarios:

1. On Test Failure
afterEach(async function () {
  if (this.currentTest.state === 'failed') {
    const screenshot = await driver.takeScreenshot();
    const filename = `./screenshots/${this.currentTest.title.replace(/\s+/g, '_')}.png`;
    fs.writeFileSync(filename, screenshot, 'base64');
    
    // Attach to mochawesome report
    addContext(this, {
      title: 'Screenshot on failure',
      value: filename,
    });
  }
});

2. Manual Screenshot Capture
// Take screenshot manually
const screenshot = await driver.takeScreenshot();
const screenshotPath = path.resolve('./screenshots/test-result.png');
fs.writeFileSync(screenshotPath, screenshot, 'base64');

Screenshots are saved to ./screenshots/ directory and automatically attached to HTML reports.

📊 Reporting
This project uses Mochawesome for beautiful HTML test reports:

Reports are generated in mochawesome-report/ directory

Include screenshots for failed tests

Show test execution time and details

Provide pass/fail statistics

View Reports
After running tests, open:
mochawesome-report/mochawesome.html
🔧 Key Learning Points
1. Implicit vs Explicit Waits
// Implicit wait - applies to all element searches
await driver.manage().setTimeouts({ implicit: 5000 });

// Explicit wait - for specific conditions
await driver.wait(until.elementLocated(By.id('element')), 5000);

2. Test Control with Mocha
it.skip('test name', async () => {}); // Skip this test
it.only('test name', async () => {}); // Run only this test

3. Proper Driver Management
try {
  // Test code here
} finally {
  await driver.quit();
}
4. Element Location Strategies
By.id('element-id')
By.xpath("//a[normalize-space()='About Amazon']")
By.css('selector')
By.className('class-name')

5. Window Handle Management
const handles = await driver.getAllWindowHandles();
await driver.switchTo().window(handles[1]); // Switch to new window
await driver.close(); // Close current window
await driver.switchTo().window(handles[0]); // Switch back

📁 File Structure Details
selenium-project/
├── .mocharc.js              # Mocha test configuration
├── tests/
│   ├── amazon-test.js       # Amazon navigation tests (commented examples)
│   ├── interaction.js       # Mouse interaction examples (commented)
│   └── main-test.js         # Main test suite with all examples
├── screenshots/             # Auto-generated screenshots
│   ├── doubleclick.png      # Success screenshots
│   └── failed_test_*.png    # Failure screenshots
├── mochawesome-report/      # HTML test reports
└── package.json             # Project dependencies

🐛 Common Issues & Solutions
1. ChromeDriver Issues
Ensure Chrome browser is installed

selenium-webdriver automatically manages ChromeDriver

Check Chrome version compatibility

2. Element Not Found
Use proper waits (explicit waits recommended)

Verify element selectors in browser DevTools

Check if element is in iframe

3. Timeout Issues
Increase timeout values for slow-loading pages

Use appropriate wait conditions

Check network connectivity

4. Screenshot Directory
The project automatically creates screenshots/ folder

Ensure write permissions in project directory

🔄 Test Execution Flow
Before Hook: Initialize Chrome driver

Test Execution: Run individual test cases

After Each: Capture screenshot if test fails

After Hook: Quit driver and cleanup

Report Generation: Create HTML report with screenshots

📋 Best Practices Demonstrated
✅ Proper error handling with try/catch blocks
✅ Driver cleanup in finally blocks
✅ Screenshot capture for debugging
✅ Explicit waits over implicit waits
✅ Meaningful test descriptions and assertions
✅ Organized test structure with hooks
✅ Integration with reporting tools

🎯 Learning Objectives Covered
This project demonstrates:

Basic Selenium WebDriver setup and configuration

Element interaction and manipulation

Alert, frame, and window handling

File upload automation

Screenshot capture and reporting

Test organization with Mocha framework

Error handling and debugging techniques



