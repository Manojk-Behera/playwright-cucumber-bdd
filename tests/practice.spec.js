import { test, expect } from '@playwright/test';


test('has title', async ({ page }) => {
  await page.goto('https://www.google.com/');

 let title = await page.title()
  console.log(title)

  // Expect a title "to contain" a 
  // substring.
  await expect(page).toHaveTitle("Google");
});