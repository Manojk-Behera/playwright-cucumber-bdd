import { test, expect } from '@playwright/test';

async function login(page) {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.locator('#username').fill('rahulshettyacademy');
  await page.locator('#password').fill('learning');
  await page.locator('#signInBtn').click();
  await page.waitForSelector('.card-body a');
}

//test.describe.configure({ mode: 'serial' });
//test.describe.configure({ mode: 'Parallel' })

test.describe('Client App Login and Product Validation', () => {

  //test.describe.configure({ mode: 'serial' });

  test('TC1: should display correct login page title', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const title = await page.title();
    try {
      expect(title).toBe('LoginPage Practise | Rahul Shetty Academy');
      console.log('TC1 PASS: Login page title is correct');
    } catch (error) {
      //console.log('TC1 FAIL: Login page title is incorrect');
      console.log(`TC1 FAIL: Login page title is incorrect - ${error.message}`);
      throw error;
    }
  });

  test('TC2: should login successfully with valid credentials', async ({ page }) => {
    try {
      await login(page);
      await expect(page).toHaveURL(/shop/);
      console.log('TC2 PASS: Login successful and navigated to shop');
    } catch (error) {
      console.log('TC2 FAIL: Login unsuccessful or did not navigate to shop');
      throw error;
    }
  });

  test('TC3: should fetch product names and validate Nokia is present', async ({ page }) => {
    try {
      await login(page);
      const productNames = await page.locator('.card-body a').allTextContents();
      console.log('Product Names:', productNames);
      const isNokiaPresent = productNames.some(name => name.includes('Nokia'));
      expect(isNokiaPresent).toBeTruthy();
      console.log('TC3 PASS: Nokia is present in product names');
    } catch (error) {
      //console.log('TC3 FAIL: Nokia is not present in product names');
      console.log(`TC3 FAIL: Nokia is not present in product names - ${error.message}`);
      throw error;
    }
  });
  test('TC4: should select dropdown,Click on radio button and checkbox', async ({ page }) => {
        try {
        const username = page.locator('#username');
        const password = page.locator('#password');
        const signInBtn = page.locator('#signInBtn');
        const documentlink = page.locator("[href*='document']"); //s
        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        // Select the dropdown option
        const dropdown = page.locator("select.form-control")
        await dropdown.selectOption('Consultant'); // Select "Option 2"
        console.log('Dropdown option "Consultant" selected');
        // Click on the radio button
        await page.locator(".radiotextsty").last().click();
        //post clicking radio button handle the popup
        await page.locator("#okayBtn").click();
        //await page.pause();
        //validate radio button selected use tobechecked() assertion
        const radioButton = page.locator(".radiotextsty").last();
        await expect(radioButton).toBeChecked();
        console.log('Radio button clicked and validated');
        //select the checkbox
        const checkbox = page.locator("#terms");
        await checkbox.check();
        //validate checkbox selected robustly
        await expect(checkbox).toBeChecked();
        console.log('Checkbox clicked and validated');
        //uncheck the checkbox
        await checkbox.uncheck();
        //validate checkbox unchecked use ischecked() tobe false assertion
        await expect(checkbox).not.toBeChecked();
        console.log('Checkbox unchecked and validated');
        //validate the blinking link
        await expect(documentlink).toHaveAttribute('class', 'blinkingText');
        console.log('Blinking link validated');
        //login with valid credentials
        await username.fill('rahulshettyacademy');  
        await password.fill('learning');
        await signInBtn.click();
        console.log('TC4 PASS: All actions performed successfully');
        } catch (error) {
        console.log(`TC4 FAIL: All action not performed correctly - ${error.message}`);
        throw error;
        }
    });
  test('TC5: validate Child window', async ({ browser}) => {
        try {
            const context = await browser.newContext();
            const page = await context.newPage();
            const documentlink = page.locator("[href*='documents']");

            await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
            //handled child window
            const [newPage]= await Promise.all([
                context.waitForEvent('page'), // Wait for the page to open
                documentlink.click() // Click on the document link to open in a new page
            ]);
            // if 2 child windows are opened then use below code
            // const [newPage1, newPage2] = await Promise.all([
            //     context.waitForEvent('page'), // Wait for the first page to open
            //     context.waitForEvent('page'), // Wait for the second page to open  
            //     documentlink.click() // Click on the document link to open in a new page
            // ]);
            //interact with the 2nd page
            //const text1 = await newPage2.locator('.red').allTextContents();
            // Wait for the new page to load
            await newPage.waitForLoadState('load');
            const text = await newPage.locator('.red').allTextContents(); // fetch the text from child window
            console.log('Child Window Text:', text);
            //split the text to get the email
            const rawText = String(text);
            console.log('Raw Text:', rawText);
            const arraytext = rawText.split("@") // Extract the email part
            console.log('Array Text:', arraytext);
            const domain = arraytext[1].split('.')[0]; // Get the email part before the space
            // Log the extracted email  
            console.log('Extracted Email:', domain);
            //enter the email in the parent window mail field
            //await page.pause();
            await page.locator('#username').fill(domain);
            await page.locator('#password').fill('learning');
            await page.locator('#signInBtn').click();
            //take screenshot of the parent window full page
            await page.screenshot({ path: 'screenshot.png', fullPage: true });
          
          console.log('TC5 PASS: Child window validation successful');
            // Close the new page
            await newPage.close();
        } catch (error) {
            console.log(`TC5 FAIL: Child window validation failed - ${error.message}`);
            throw error;
        }
    });
});

