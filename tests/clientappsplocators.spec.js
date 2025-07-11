import{test, expect} from '@playwright/test';


test('TC1: Clientapp login from selecting order to place the order', async ({ page }) => {
    
    try {
        const products = page.locator('.card-body');
        const email = "testpractice@mailinator.com";
        const productName = "ADIDAS ORIGINAL";
        await page.goto('https://rahulshettyacademy.com/client/');
        await page.getByPlaceholder('email@example.com').fill(email);
        await page.getByPlaceholder('enter your passsword').fill('Kumar@123');
        await page.getByRole('button',{name:'Login'}).click();
        await page.waitForLoadState('networkidle');
        //fetch all the product names
        const productNames = await page.locator('.card-body').filter({ hasText: "ADIDAS ORIGINAL" }).getByRole('button', { name:'Add To Cart' }).click();
        //click on cart icon
        await page.getByRole("listitem").getByRole('button',{name:'Cart'}).click();
        //wait for cart page to load
        await page.locator('div li').first().waitFor();
        //validate the product name in cart using is visible assertion
        await page.getByRole('button',{name: 'Checkout'}).click();
        //wait for checkout page to load
        await page.locator('.form__cc div').first().waitFor();
        //click on the select country dropdown
        await page.getByPlaceholder("Select Country").pressSequentially('ind');
        //wait for the dropdown to appear
        const dropdown = page.locator('.ta-results')
        await dropdown.waitFor();
        await page.getByRole('button', { name: 'India' }).nth(1).click();
        //click on place order button
        await page.getByText('Place Order').click();
        //wait for order confirmation page to load
        await page.locator('.hero-primary').waitFor();
        //validate order confirmation message
        await expect (page.getByText('Thankyou for the order.')).toBeVisible();
       
        console.log('TC1 PASS: Order placed successfully');


    } catch (error) {
        console.log(`TC1 FAIL: Order not placed successfully- ${error.message}`);
        throw error;
    }
});
