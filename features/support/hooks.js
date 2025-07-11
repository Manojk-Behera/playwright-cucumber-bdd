import { Before, BeforeAll, After, AfterAll, Status,AfterStep,BeforeStep } from "@cucumber/cucumber";
import { POManager } from "../../pageobjects/POManager.js";
import { chromium, firefox, webkit } from 'playwright';


Before(async function () {

    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    this.page = await context.newPage(); // the page is not attaching to the world constructor so we need to initialize so that we can use this in steps.js or entire scenario
    this.poManager = new POManager(this.page); //This PO manager is initialized in world constructor so no issue it will accessible in entire scenario
});

BeforeStep( function () {
  // This hook will be executed before all steps in a scenario with tag @foo
});

AfterStep(async function ({result}) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
        await this.page.screenshot({path:'screenshot1.png'});
  }
});

// Asynchronous Promise
After(function () {
  
console.log("This is the last line execution")
  
});