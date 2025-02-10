const { test, expect } = require('@playwright/test');

test('Google search works', async ({ page }) => {
  await page.goto('https://www.google.com');
  await page.fill('[name="q"]', 'Playwright Testing');
  await page.press('[name="q"]', 'Enter');
  await page.waitForSelector('#search');
  
  // Assertion
  const title = await page.title();
  expect(title).toContain('Playwright Testing');

  // Take a screenshot on failure
});
