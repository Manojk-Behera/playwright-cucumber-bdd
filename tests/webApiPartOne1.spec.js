import{test, expect, request} from '@playwright/test';
import {APiUtils} from '../Utils/APiUtils.js';
const loginPayload = {userEmail: "testpractice@mailinator.com",userPassword: "Kumar@123"};
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "67a8df1ac0d3e6622a297ccb"}]};
let response;

test.beforeAll( async () => {
    // This will run once before all tests
    //Login API call to get the token
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
    //Create Order API call to get the order ID
    
});


test('TC1: Clientapp login from selecting order to place the order', async ({ page }) => {

       
        page.addInitScript(value => {
            window.localStorage.setItem('token', value);
        }, response.token);
        
    
        //fetch all the product names
        await page.goto('https://rahulshettyacademy.com/client/');
        const productNames = await page.locator('.card-body b').allTextContents();
        console.log('Product Names:', productNames);
        //click on the orders button to view the order ID
        await page.locator('button[routerlink="/dashboard/myorders"]').click();
        //wait for orders page to load
        await page.locator('tbody').waitFor();
        //validate the order ID is present in the orders page
        const rows = page.locator('tbody tr')
        // Get the count of rows in the table
        for (let i = 0; i < await rows.count(); i++) {
            let roworderid = await rows.nth(i).locator("th").textContent();
            if(response.orderId.includes(roworderid)){
                // If the order ID matches, click on view button on that row
                await rows.nth(i).locator('button').first().click();
                break;
            }
        
        }

        
        //validate order id in view order details page
        const viewOrderId = await page.locator('.col-text').textContent();
        expect(response.orderId.includes(viewOrderId)).toBeTruthy();

        console.log('TC1 PASS: Order placed successfully and order ID is:', response.orderId);


     
});
