import{test, expect} from '@playwright/test';
import{POManager} from '../pageobjects/POManager.js';
//convert JSON --> String --> JS Object
const dataset = JSON.parse(JSON.stringify(require ('../Utils/POMclientappendtoendTestData.json')));
//below one also work
//const dataset = require ('../Utils/POMclientappendtoendTestData.json');
// if multiple set of data required so that we are using for loop to run the test with different set of data
for(const data of dataset){

test(`TC1: Clientapp login ${data.productName}`, async ({ page }) => {
    
    try {
        
        const poManager = new POManager(page);
        const loginpage = poManager.getLoginPage();
        await loginpage.gotoLoginPage();
        await loginpage.validLogin(data.username,data.password);
        //fetch all the product and search the product and click on the cart
        const dashboardpage = poManager.getDashboardPage();
        await dashboardpage.searchProductandAddtoCart(data.productName);
        await dashboardpage.navigateToCart();
        //cart page operation
        const cartpage = poManager.getCartPage();
        await cartpage.verifyProductisDisplayed(data.productName);
        await cartpage.Checkout();

        
        //wait for order confirmation page to load
        const ordersreviewpage = poManager.getOrdersReviewPage();
        await ordersreviewpage.searchCountryAndSelect("ind","India");
        await ordersreviewpage.VerifyEmailId(data.username);
        const orderid = await ordersreviewpage.SubmitAndGetOrderId();
        console.log("Orderid:",orderid)

        await dashboardpage.navigateToOrder();
        const orderhistorypage = poManager.getOrdersHistoryPage();
        await orderhistorypage.searchOrderAndSelect(orderid);
        expect(orderid.includes(await orderhistorypage.getOrderId())).toBeTruthy();
    
        console.log('TC1 PASS: Order placed successfully and order ID is:', orderid);


    } catch (error) {
        console.log(`TC1 FAIL: Login page title is incorrect - ${error.message}`);
        throw error;
    }
});

}
