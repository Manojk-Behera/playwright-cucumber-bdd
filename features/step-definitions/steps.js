import { Given, When, Then } from "@cucumber/cucumber";
import { POManager } from "../../pageobjects/POManager.js";
import { expect } from "@playwright/test";
import { chromium, firefox, webkit } from 'playwright';

Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {

    // const browser = await chromium.launch({
    //     headless : false
    // });
    // const context = await browser.newContext();
    this.username = username;
    // const page = await context.newPage();
    // this.poManager = new POManager(page);       //using world constructor so intitialise with this.poManager and we can pass this variable through out all
    const loginpage = this.poManager.getLoginPage();
    await loginpage.gotoLoginPage();
    await loginpage.validLogin(username, password);
});

When('Add {string} to Cart', async function (productName) {
    this.dashboardpage = this.poManager.getDashboardPage();
    await this.dashboardpage.searchProductandAddtoCart(productName);
    await this.dashboardpage.navigateToCart();
});
Then('Verify {string} is displayed in the Cart', async function (productName) {
    const cartpage = this.poManager.getCartPage();
    await cartpage.verifyProductisDisplayed(productName);
    await cartpage.Checkout();
});
When('Enter valid details and Place the Order', async function () {
    const ordersreviewpage = this.poManager.getOrdersReviewPage();
    await ordersreviewpage.searchCountryAndSelect("ind", "India");
    await ordersreviewpage.VerifyEmailId(this.username);
    this.orderid = await ordersreviewpage.SubmitAndGetOrderId();
    console.log("Orderid:", this.orderid);
});
Then('Verify Order is presesnt in the OrderHistory', async function () {
    await this.dashboardpage.navigateToOrder();
    const orderhistorypage = this.poManager.getOrdersHistoryPage();
    await orderhistorypage.searchOrderAndSelect(this.orderid);
    expect(this.orderid.includes(await orderhistorypage.getOrderId())).toBeTruthy();
});

Given('a login to Ecommerce2 application with {string} and {string}', async function (username1, password1) {
    const username = this.page.locator('#username');
    const password = this.page.locator('#password');
    const signInBtn = this.page.locator('#signInBtn');
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    let title = await this.page.title();
    console.log(title);
    await username.fill(username1);
    await password.fill(password1);
    await signInBtn.click();
});
Then('Verify Error message is displayed in the Login page', async function () {
    console.log(await this.page.locator("[style*='block']").textContent())
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect username');
});


