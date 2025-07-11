import{test, expect} from '@playwright/test';
import { Console } from 'console';

test('TC1: Clientapp login from selecting order to place the order', async ({ page }) => {
    
    try {
        const products = page.locator('.card-body');
        const email = "testpractice@mailinator.com";
        const productName = "ADIDAS ORIGINAL";
        await page.goto('https://rahulshettyacademy.com/client/');
        await page.locator('#userEmail').fill(email);
        await page.locator('#userPassword').fill('Kumar@123');
        await page.locator('#login').click();
        await page.waitForLoadState('networkidle');
        //fetch all the product names
        const productNames = await page.locator('.card-body b').allTextContents();
        console.log('Product Names:', productNames);
        console.log(productNames.length);
        //fetch all the product one by one if prduct matches with adidas original then click on add to cart
        for (let i = 0; i < productNames.length; i++) {
            if (productNames[i].toLowerCase().includes(productName.toLowerCase())) {
                //above condtion or this if(products.nth(i).locator('b').textContent() === productName){
                await products.nth(i).locator('text=Add To Cart').click();
                break;
            }
        }
        //click on cart icon
        await page.locator('[routerlink="/dashboard/cart"]').click();
        //wait for cart page to load
        await page.locator('div li').first().waitFor();
        //validate the product name in cart using is visible assertion
        const isProductVisible = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
        expect(isProductVisible).toBeTruthy();
        console.log('TC1 PASS: Product is visible in the cart');
        await page.locator('text=Checkout').click();
        //wait for checkout page to load
        await page.locator('.form__cc div').first().waitFor();
        //click on the select country dropdown
        await page.locator("[placeholder*='Country']").pressSequentially('ind');
        //wait for the dropdown to appear
        const dropdown = page.locator('.ta-results')
        await dropdown.waitFor();
        const optioncount = await dropdown.locator('button').count();
        //select the country from the dropdown
        for (let i = 0; i < optioncount; i++) {
            //before 'India' there is a space so using ' India' to match the text
            if (await dropdown.locator('button').nth(i).textContent() === ' India') {
                await dropdown.locator('button').nth(i).click();
                break;
            }
        }
        //validate mailid is same as entered in login page
        await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
        //click on place order button
        await page.locator('.action__submit').click();
        //wait for order confirmation page to load
        await page.locator('.hero-primary').waitFor();
        //validate order confirmation message
        const orderConfirmationMessage = await page.locator('.hero-primary').textContent();
        console.log('Order Confirmation Message:', orderConfirmationMessage);
        expect(orderConfirmationMessage).toContain(' Thankyou for the order. ');
        //fetch the order id from the confirmation message
        const orderid = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log('Order ID:', orderid);
        //click on the orders button to view the order ID
        await page.locator('button[routerlink="/dashboard/myorders"]').click();
        //wait for orders page to load
        await page.locator('tbody').waitFor();
        //validate the order ID is present in the orders page
        const rows = page.locator('tbody tr')
        // Get the count of rows in the table
        for (let i = 0; i < await rows.count(); i++) {
            let roworderid = await rows.nth(i).locator("th").textContent(); 
            if(orderid.includes(roworderid)){
                // If the order ID matches, click on view button on that row
                await rows.nth(i).locator('button').first().click();
                break;
            }
        
        }

        
        //validate order id in view order details page
        const viewOrderId = await page.locator('.col-text').textContent();
        expect(orderid.includes(viewOrderId)).toBeTruthy();
    
        console.log('TC1 PASS: Order placed successfully and order ID is:', orderid);


    } catch (error) {
        console.log(`TC1 FAIL: Login page title is incorrect - ${error.message}`);
        throw error;
    }
});
