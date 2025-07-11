import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');
  await page.getByRole('link', { name: 'Grocery', exact: true }).click();
  await page.getByRole('button', { name: '✕' }).click();
  await page.getByLabel('Mobiles').click();
  await page.getByText('Home Top Deals').click();
  await page.getByRole('link', { name: 'Image Lighting Essentials' }).click();
  await page.getByRole('link', { name: 'Monsoon Essentials' }).click();
  await page.goto('https://www.flipkart.com/');
});