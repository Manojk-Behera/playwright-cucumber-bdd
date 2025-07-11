import { test, expect } from "@playwright/test";

test("Calendar validation", async ({ page }) => {

    const monthnumber = "6"; // June
    const date = "15"; // Date to select
    const year = "2027"; // Year to select

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    //click on the date text box
    await page.locator(".react-date-picker__inputGroup").click();
    //Click on the year
    await page.locator(".react-calendar__navigation__label__labelText").click();
    //Click on the year
    await page.locator(".react-calendar__navigation__label__labelText").click();
    //select the year
    await page.getByText(year).click();
    //Click on the month
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthnumber-1)).click();
    //Click on the date
    await page.locator("//abbr[text()='"+date+"']").click();
    //Validate the selected date month and year
    const inputs = await page.locator(".react-date-picker__inputGroup input");
    const inputCount = await inputs.count();
    const actualValues = [];
    for (let index = 0; index < inputCount; index++) {
        const inputValue = await inputs.nth(index).getAttribute("value");
        actualValues.push(inputValue);
        console.log(`Input ${index + 1} value:`, inputValue);
    }
    // Log the actual order to help you set expectedList correctly
    console.log('Actual input values:', actualValues);

    // Now set expectedList to match the actual order, for example:
    const paddedMonth = monthnumber.padStart(2, '0');
    const paddedDate = date.padStart(2, '0');
    const expectedValue = `${year}-${paddedMonth}-${paddedDate}`;

    const inputValue = await inputs.nth(0).getAttribute("value");
    console.log('Actual input value:', inputValue);
    expect(inputValue).toEqual(expectedValue);
});