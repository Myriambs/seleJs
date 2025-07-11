// Import des modules nécessaires
const { describe, it, before, afterEach } = require('mocha');
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const addContext = require('mochawesome/addContext');
const fs = require('fs');
const path = require('path');

// Description du test global pour la page Amazon (mais en fait on teste demoqa.com)
describe('Amazon Page Test alert pop up', function () {
  // Augmente le timeout par défaut pour tous les tests
  this.timeout(10000);

  let driver; // Variable pour stocker l'instance du driver Selenium

  // Hook qui s'exécute avant tous les tests
  before(async () => {
    // Initialise le driver Chrome
    driver = await new Builder().forBrowser('chrome').build();
    console.log('Chrome driver initialized successfully!');
  });

  // Hook qui s'exécute après tous les tests
  after(async () => {
    // Ferme le driver s'il existe
    if (driver) {
      await driver.quit();
      console.log('Driver quit successfully!');
    }
  });

  // Test 1: Interaction avec une alerte (pop-up)
  it('should show a pop up to the web site', async () => {
    await driver.get('https://demoqa.com/alerts');

    // Clique sur le bouton qui déclenche l'alerte
    await driver.findElement(By.id('promtButton')).click();
    await driver.wait(until.alertIsPresent(), 5000);
    console.log('Alert button clicked!');

    // Récupère l'alerte et son texte
    let alertConntent = await driver.switchTo().alert();
    let textAlert = await alertConntent.getText();
    console.log(`Alert text: ${textAlert}`);

    // Envoie du texte et acceptation de l'alerte
    await alertConntent.sendKeys("Hello world");
    await alertConntent.accept();
    console.log('Alert accepted!');

    // Vérification que le texte saisi apparaît dans la page
    let result = await driver.findElement(By.id("promptResult")).getText();
    assert.ok(result.toString().includes("Hello world"), "The alert result does not contain the expected text");
    console.log(`Result text: ${result}`);
    console.log('Test completed successfully!');
  });

  // Test 2: Interaction avec un iframe
  it('should switch to frame and back', async () => {
    await driver.get('https://demoqa.com/frames');
    
    // Trouve l'iframe et bascule dessus
    let frameText = await driver.findElement(By.id('frame1'));
    await driver.wait(until.ableToSwitchToFrame(frameText), 5000);
    console.log('Switched to frame successfully!');
    
    // Vérifie le texte dans l'iframe
    let samleHeading = await driver.findElement(By.id('sampleHeading')).getText();
    assert.ok(samleHeading.toString() == 'This is a sample page', "The frame heading text does not match the expected value");
    console.log(`Frame heading text: ${samleHeading}`);
    console.log('Frame switch test completed successfully!');
  });

  // Test 3: Upload de fichier
  it('should upload a file', async () => {
    await driver.get('https://demoqa.com/upload-download');
    // Sélectionne le champ d'upload et envoie le chemin du fichier
    const fileInput = await driver.findElement(By.id('uploadFile'));
    const filePath = '/home/meriam/Downloads/36 - CERT W 670-2032.pdf';
    await fileInput.sendKeys(filePath);
    console.log('File uploaded successfully!');
    
    // Vérifie que le nom du fichier uploadé s'affiche
    const uploadedFileName = await driver.findElement(By.id('uploadedFilePath')).getText();
    assert.ok(uploadedFileName.includes('36 - CERT W 670-2032.pdf'), "The uploaded file name does not match the expected value");
    console.log(`Uploaded file name: ${uploadedFileName}`);
    await driver.sleep(5000); // Pause pour voir le résultat
  });

  // Test 4: Ouverture d'une nouvelle fenêtre
  it('should open a new window and switch to it', async () => {
    await driver.get('https://demoqa.com/browser-windows');
    await driver.findElement(By.id('windowButton')).click();
    console.log('New window button clicked!');
    
    // Attend que la nouvelle fenêtre s'ouvre
    await driver.wait(async () => {
      const handles = await driver.getAllWindowHandles();
      return handles.length > 1;
    }, 5000);
    
    // Bascule sur la nouvelle fenêtre
    const handles = await driver.getAllWindowHandles();
    await driver.switchTo().window(handles[1]);
    console.log('Switched to new window successfully!');
    
    // Vérifie le contenu de la nouvelle fenêtre
    const heading = await driver.findElement(By.id('sampleHeading')).getText();
    assert.strictEqual(heading, 'This is a sample page', "The new window heading does not match expected value");
    console.log(`New window heading: ${heading}`);
    
    // Ferme la nouvelle fenêtre et revient à l'originale
    await driver.close();
    await driver.switchTo().window(handles[0]);
    console.log('New window test completed successfully!');
  });

  // Test 5: Ouverture d'un nouvel onglet
  it('should open a new tab and switch to it', async () => {
    await driver.get('https://demoqa.com/browser-windows');
    await driver.findElement(By.id('tabButton')).click();
    console.log('New tab button clicked!');
    
    // Attend que le nouvel onglet s'ouvre
    await driver.wait(async () => {
      const handles = await driver.getAllWindowHandles();
      return handles.length > 1;
    }, 5000);
    
    // Bascule sur le nouvel onglet
    const handles = await driver.getAllWindowHandles();
    await driver.switchTo().window(handles[1]);
    console.log('Switched to new tab successfully!');
    
    // Vérifie le contenu du nouvel onglet
    const heading = await driver.findElement(By.id('sampleHeading')).getText();
    assert.strictEqual(heading, 'This is a sample page', "The new window heading does not match expected value");
    console.log(`New tab title: ${heading}`);
    
    // Ferme le nouvel onglet et revient à l'original
    await driver.close();
    await driver.switchTo().window(handles[0]);
    console.log('New tab test completed successfully!');
  });

  // Test 6: Positionnement de la fenêtre
  it('should position the window at the top left corner', async () => {
    await driver.get('https://demoqa.com/browser-windows');
    // Positionne la fenêtre en haut à gauche
    await driver.manage().window().setRect({ x: 0, y: 0, width: 800, height: 600 });
    console.log('Window positioned at the top left corner successfully!');
    
    // Vérifie la position
    const rect = await driver.manage().window().getRect();
    assert.strictEqual(rect.x, 0, "The window x position is not at the top left corner");
    assert.strictEqual(rect.y, 0, "The window y position is not at the top left corner");
    console.log(`Window position: x=${rect.x}, y=${rect.y}`);
    console.log('Window positioning test completed successfully!');
  });

  // Test 7: Redimensionnement de la fenêtre
  it('should resize the window to 800x600', async () => {
    await driver.get('https://demoqa.com/browser-windows');
    // Redimensionne la fenêtre
    await driver.manage().window().setRect({ width: 800, height: 600 });
    console.log('Window resized to 800x600 successfully!');
    
    // Vérifie les dimensions
    const rect = await driver.manage().window().getRect();
    assert.strictEqual(rect.width, 800, "The window width is not 800");
    assert.strictEqual(rect.height, 600, "The window height is not 600");
    console.log(`Window size: width=${rect.width}, height=${rect.height}`);
    console.log('Window resizing test completed successfully!');
  });

  // Test 8: Interaction avec une alerte simple
  it('should show an alert and accept it', async () => {
    await driver.get('https://demoqa.com/alerts');
    await driver.findElement(By.id('alertButton')).click();
    console.log('Alert button clicked!');
    
    // Attend et récupère l'alerte
    await driver.wait(until.alertIsPresent(), 5000);
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    console.log(`Alert text: ${alertText}`);
    
    // Accepte l'alerte
    await alert.accept();
    console.log('Alert accepted successfully!');
    console.log('Alert test completed successfully!');
  });

  // Test 9: Capture d'écran après un clic
  it('should take a screenshot after clicking a button', async function () {
    await driver.get('https://demoqa.com/buttons');
    const button = await driver.findElement(By.id('doubleClickBtn'));
    await button.click();
    console.log('Button clicked!');
    
    // Prend une capture d'écran et la sauvegarde
    const screenshot = await driver.takeScreenshot();
    const screenshotPath = path.resolve('./screenshots/doubleclick.png');
    fs.writeFileSync(screenshotPath, screenshot, 'base64');
    console.log('Screenshot saved at:', screenshotPath);
    
    // Ajoute la capture au rapport Mochawesome
    addContext(this, {
      title: 'Screenshot after clicking the button',
      value: screenshotPath,
    });
    console.log('Screenshot test completed successfully!');
  });
  
  // Hook qui s'exécute après chaque test (en cas d'échec)
  afterEach(async function () {
    if (this.currentTest.state === 'failed') {
      // Prend une capture d'écran en cas d'échec
      const screenshot = await driver.takeScreenshot();
      const filename = `./screenshots/${this.currentTest.title.replace(/\s+/g, '_')}.png`;
      fs.writeFileSync(filename, screenshot, 'base64');
      console.log('Failure screenshot saved:', filename);

      // Ajoute la capture au rapport Mochawesome
      addContext(this, {
        title: 'Screenshot on failure',
        value: filename,
      });
    }
  });
});