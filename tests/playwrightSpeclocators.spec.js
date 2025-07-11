import{test,expect}from'@playwright/test';

test('@Web Playwright specific locators',async({page})=>{
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    // Using Playwright specific locators getByLabel
    const checkbox = await page.getByLabel('Check me out if you Love IceCreams!').check();
    await page.getByLabel('Employed').check();
    await page.getByLabel('Gender').selectOption('Male');
    await page.getByPlaceholder('Password').fill('abc123');
    await page.getByRole('button', { name: 'Submit' }).click();
    // Validate the success message
    const successMessage = await page.getByText('Success!').textContent();
    console.log('Success Message:', successMessage);
    expect(successMessage).toBe('Success!');
    await page.getByRole('link', { name: 'Shop' }).click();
    //Only One button is present so i am using only 'button' in getByRole and not using { name: 'Add to cart' }
    await page.locator('app-card').filter({ hasText: 'Nokia Edge' }).getByRole('button').click();
    

});
