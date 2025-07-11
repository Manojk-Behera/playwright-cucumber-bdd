import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    // Get the title of the page.
    let title = await page.title();
    console.log(title);
    // Expect the title to be "LoginPage Practise".
    // This is a simple string comparison.
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    // Validate error messge when username or password is incorrect.
    await page.fill('#username', 'incorrectUser');
    await page.fill('#password', 'incorrectPass');
    await page.click('#signInBtn');
    // Expect the error message to be visible.
    const errorMessage = page.locator('.alert-danger');  
    await expect(errorMessage).toBeVisible();
    // Expect the error message to contain specific text.
    await expect(errorMessage).toContainText('Incorrect username/password.');
    // Expect the error message to have a specific class.
    await expect(errorMessage).toHaveClass(/alert-danger/);
    // Expect the error message to have a specific attribute.
    await expect(errorMessage).toHaveAttribute('class', /alert/);
    //login with valid credentials
    await page.fill('#username', 'rahulshettyacademy');
    await page.fill('#password', 'learning');   
    await page.click('#signInBtn');
    //it should navigate to the home page after successful login
    //await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
    await expect(page).toHaveURL(/shop/);
    
    // Expect the title to be "ProtoCommerce".
    await expect(page).toHaveTitle(/ProtoCommerce/);
    // Expect the URL to contain "angularpractice".
    await expect(page).toHaveURL(/.*angularpractice/);

});