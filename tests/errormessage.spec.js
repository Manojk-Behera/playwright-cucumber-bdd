import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signInBtn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-title a');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    // Get the title of the page.
    let title = await page.title();
    console.log(title);
    // Expect the title to be "LoginPage Practise".
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

    // Validate error message when username or password is incorrect.
    await page.fill('#username', 'incorrectUser');
    await page.fill('#password', 'incorrectPass');
    await page.locator('#signInBtn').click();
    console.log(await page.locator("[style*='block']").textContent())
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username');

    //login with valid credentials
    await username.fill('rahulshettyacademy');
    await password.fill('learning');
    await signInBtn.click();
    await expect(page).toHaveURL(/shop/);
    //fetch the 1st product name
    const firstProduct = await cardTitles.first().textContent();
    console.log('First Product:', firstProduct);
    //fetch the 2nd product name
    const secondProduct = await cardTitles.nth(1).textContent();
    console.log('Second Product:', secondProduct);
    // fetch all product names
    const allProducts = await cardTitles.allTextContents();
    console.log('All Products:', allProducts);

});
