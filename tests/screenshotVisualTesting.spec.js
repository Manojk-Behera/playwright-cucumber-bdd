import{test,expect}from'@playwright/test';

test('Screenshot Test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    //validate displayed-text is visible
    await expect(page.locator('#displayed-text')).toBeVisible();
    //take a screenshot of the displayed-text element
    await page.locator('#displayed-text').screenshot({ path: 'element-screenshot.png' });
    //click on the hide CTA to hide the element
    await page.locator("#hide-textbox").click();
    // Take a screenshot of the entire page
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
    // take screenshot of visible viewport
    await page.screenshot({ path: 'view-screenshot.png'});
    // Validate that the displayed-text element is not visible after clicking hide
    await expect(page.locator('#displayed-text')).not.toBeVisible();
});

test('Visual Test', async ({ page }) => {
    await page.goto('https://www.google.com/');

    expect(await page.screenshot()).toMatchSnapshot('google-screenshot.png');
});
// test.only('Visual Test Playwright', async ({ page }) => {
//     await page.goto('https://www.flightaware.com/');
//     //search text field has animated text exclude it for comaparison
//     await page.locator('.inline-block.text-nowrap').evaluate((el) => el.style.animation = 'none');
//     //wait for the page to load completely      
//     await page.waitForLoadState('networkidle');
//     expect(await page.screenshot()).toMatchSnapshot('flightaware-screenshot.png',{threshold: 0.2});

// });

//marked with test.only
test('Visual Test Playwright', async ({ page }) => {
  await page.goto('https://www.flightaware.com/');

  // Wait for all content to load
  await page.locator('.inline-block.text-nowrap').waitFor();

  // Select the animated text span
  const animatedText = page.locator('div[data-testid="wordRotate"] span.inline-block.text-nowrap');

  // Take screenshot, masking the animated span
  expect(await page.screenshot({
    mask: [animatedText],         // 🔹 Ignore this area from comparison
    path: 'masked-flightaware.png'
  })).toMatchSnapshot('flightaware-screenshot.png', {
    threshold: 0.2 // 🔹 Adjust threshold as needed for visual differences
  });
});

